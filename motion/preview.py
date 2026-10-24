"""Build a REVIEW preview: still presenter (segment A) + motion graphics (segment B)
timed to an actual narration take. The hook slot is left out until the clip is local.

Usage: python3 preview.py TOPIC TAKE.mp3 A_WORDS TOTAL_WORDS [--hook CLIP.mp4 --hook-text "MRI = PAIN?"]
With --hook, the clip opens the video with its own audio, the screen text and an
"AI dramatization" tag, then the narration starts.
"""
import copy, re, subprocess, sys
from pathlib import Path
from PIL import Image
import render

ROOT = Path(__file__).resolve().parent
topic, take, a_words, n_words = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
opt = dict(zip(sys.argv[5::2], sys.argv[6::2]))
hook, hook_text = opt.get("--hook"), opt.get("--hook-text", "")


def probe(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))


def pauses(f):
    log = subprocess.run(["ffmpeg", "-i", f, "-af", "silencedetect=noise=-40dB:d=0.15", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    s = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
    e = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
    return [(a + b) / 2 for a, b in zip(s, e)]


def snap(t, marks, win):
    near = [m for m in marks if abs(m - t) <= win]
    return min(near, key=lambda m: abs(m - t)) if near else t


dur = probe(take)
marks = pauses(take)
a_end = snap(dur * a_words / n_words, marks, 1.5)
b_len = dur - a_end

scenes = copy.deepcopy(render.VIDEOS[topic])
body, end = scenes[:-1], scenes[-1]
scale = b_len / sum(s["dur"] for s in body)
t, prev = a_end, a_end
for s in body:
    t += s["dur"] * scale
    cut = snap(t, marks, 0.7)
    s["dur"], prev = cut - prev, cut
body[-1]["dur"] += dur - prev  # last scene runs to the end of speech
render.VIDEOS[topic] = body + [end]

out_dir = ROOT / "out"
mg = out_dir / f"{topic}_mg_timed.mp4"
sys.argv = ["render.py", topic, "--out", str(mg)]
render.main()

still = ROOT.parent / "assets" / "images" / "AG_still.png"
if not still.exists():
    im = Image.open(ROOT.parent / "assets" / "images" / "AG_still_src.png").convert("RGB")
    im = im.resize((1440, 1920), Image.LANCZOS).crop((180, 0, 1260, 1920))
    im.save(still)

final = out_dir / f"{topic}_preview_REVIEW.mp4"
inputs = ["-loop", "1", "-framerate", "30", "-t", f"{a_end:.3f}", "-i", str(still), "-i", str(mg), "-i", take]
body_len = a_end + probe(str(mg))
if hook:
    from PIL import Image as _I
    ov = _I.new("RGBA", (render.W, render.H), (0, 0, 0, 0))
    render.place(ov, render.text_sprite(hook_text, 110, render.NAVY, render.BLACK, render.TEAL, render.NAVY, 940, -4), render.W / 2, 420)
    render.place(ov, render.text_sprite("AI dramatization", 30, render.WHITE, render.BOLD, (0, 0, 0), render.WHITE), 870, 105, 0.8)
    ov_path = out_dir / f"{topic}_hook_overlay.png"
    ov.save(ov_path)
    has_audio = "audio" in subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type", "-of", "csv=p=0", hook],
                                          capture_output=True, text=True).stdout
    h_len = probe(hook)
    inputs += ["-i", hook, "-loop", "1", "-i", str(ov_path)]
    if not has_audio:
        inputs += ["-f", "lavfi", "-t", f"{h_len:.3f}", "-i", "anullsrc=r=44100:cl=stereo"]
    h_aud = "[3:a]" if has_audio else "[5:a]"
    graph = (
        "[3:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,format=yuv420p[hv];"
        "[4:v]format=rgba[ov];[hv][ov]overlay=0:0:enable='gte(t,0.25)':shortest=1,format=yuv420p[h];"
        "[0:v]format=yuv420p,setsar=1[a];[1:v]format=yuv420p,setsar=1[b];[h][a][b]concat=n=3:v=1:a=0[v];"
        f"{h_aud}aresample=44100,aformat=channel_layouts=stereo[ha];[2:a]aresample=44100,aformat=channel_layouts=stereo,apad[na];"
        "[ha][na]concat=n=2:v=0:a=1[aud]")
    total = h_len + body_len
else:
    graph = ("[0:v]format=yuv420p,setsar=1[a];[1:v]format=yuv420p,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v];"
             "[2:a]apad[aud]")
    total = body_len
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *inputs, "-filter_complex", graph,
                "-map", "[v]", "-map", "[aud]", "-t", f"{total:.3f}", "-c:v", "libx264", "-crf", "19", "-preset", "medium",
                "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(final)], check=True)
print(f"{final.name}: {'hook ' + format(probe(hook), '.2f') + 's + ' if hook else ''}presenter {a_end:.2f}s, "
      f"graphics to {dur:.2f}s + end card, total {probe(str(final)):.2f}s")
