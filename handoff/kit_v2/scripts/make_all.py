"""Cross-platform (Windows / Mac / Linux) version of make_all.sh.
Rebuild agreed videos from the kit with the LOCKED H1 voice method.

usage:
  python make_all.py --kit <handoff/kit_v2> --engine <video-ad-editor/video-ad-editor/motion> --out <out dir> [names...]
  (set env CHROME to the Chrome/Chromium executable; needs python3, node + engine npm deps, ffmpeg/ffprobe on PATH)
  per-video overrides: --voice <mp3> --align <align.json> --story <story.json> when building a single new/rewritten video
"""
import argparse, os, shutil, subprocess, sys

ALL = ["T2_three", "T3_free", "T4_quiz", "M1_stop", "M2_exam", "M3_pov", "M4_trend", "MRI5_twist",
       "MRI6_doctor", "PEP4_three", "Kill_Testosterone", "Magnesium_montage", "T6_fitness"]

def run(cmd, log=None, cwd=None, env=None):
    with open(log, "w", encoding="utf-8") if log else open(os.devnull, "w") as f:
        return subprocess.run(cmd, stdin=subprocess.DEVNULL, stdout=f, stderr=subprocess.STDOUT, cwd=cwd, env=env).returncode

def dur(p):
    return subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p],
                          capture_output=True, text=True).stdout.strip()

ap = argparse.ArgumentParser()
ap.add_argument("--kit", required=True); ap.add_argument("--engine", required=True)
ap.add_argument("--out", default="out"); ap.add_argument("--work", default="work")
ap.add_argument("--voice"); ap.add_argument("--align"); ap.add_argument("--story")
ap.add_argument("--scale", default="1", help="2 = 4K final (only when AG says final)")
ap.add_argument("names", nargs="*")
a = ap.parse_args()
# Windows: the kit scripts read/write UTF-8 JSON and Arabic text; force UTF-8 so the system code page (cp1252) is never used.
os.environ["PYTHONUTF8"] = "1"
kit, eng, out, work = (os.path.abspath(x) for x in (a.kit, a.engine, a.out, a.work))
os.makedirs(out, exist_ok=True); os.makedirs(work, exist_ok=True)
py = sys.executable
for k in a.names or ALL:
    mp3 = a.voice or os.path.join(kit, "voice", k + ".mp3")
    al = a.align or os.path.join(kit, "voice", k + ".align.json")
    st = a.story or os.path.join(kit, "stories", k + ".json")
    W = os.path.join(work, k + ".wav"); P = os.path.join(work, "proj_" + k)
    # 1) LOCKED voice method: shorten silences to 0.08 s only. No speed change, no loudness change.
    if run([py, os.path.join(kit, "scripts", "pace_165.py"), mp3, W, "1", "1"], os.path.join(work, k + ".pace.json")):
        print("FAIL pace", k); continue
    # 2) build the engine project with exact word timing
    env = dict(os.environ, ALIGN=al)
    blog = os.path.join(work, k + ".build.txt")
    if run([py, os.path.join(kit, "scripts", "build_note.py"), st, W, P, os.path.join(kit, "motion_src"), W + ".map.json"], blog, env=env):
        print("FAIL build", k); print(open(blog, encoding="utf-8").read()[-600:]); continue
    for line in open(blog, encoding="utf-8"):
        if "WARNING" in line: print(k, line.strip())
    # 3) render frames -> video
    cmd = ["node", "render.js", P, "all", "--fresh"] + (["--scale", a.scale] if a.scale != "1" else [])
    if run(cmd, os.path.join(work, k + ".render.log"), cwd=eng):
        print("FAIL render", k, "- see", os.path.join(work, k + ".render.log")); continue
    # 4) mux with the voice; hold the last frame 0.3 s so the video never cuts the voice
    o = os.path.join(out, k + ".mp4")
    run(["ffmpeg", "-nostdin", "-loglevel", "error", "-y", "-i", os.path.join(P, "renders", "video.mp4"), "-i", W,
         "-map", "0:v", "-map", "1:a", "-vf", "tpad=stop_mode=clone:stop_duration=0.3", "-c:v", "libx264", "-crf", "16",
         "-preset", "medium", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-shortest",
         "-movflags", "+faststart", o])
    shutil.rmtree(os.path.join(P, "renders", "frames"), ignore_errors=True)
    print("DONE", k, "video", dur(o), "audio", dur(W))
