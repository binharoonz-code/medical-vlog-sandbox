"""Build a REVIEW preview: still presenter (segment A) + motion graphics (segment B)
timed to an actual narration take. The hook slot is left out until the clip is local.

Usage: python3 preview.py TOPIC TAKE.mp3 A_WORDS TOTAL_WORDS
"""
import copy, re, subprocess, sys
from pathlib import Path
from PIL import Image
import render

ROOT = Path(__file__).resolve().parent
topic, take, a_words, n_words = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])


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
subprocess.run([
    "ffmpeg", "-y", "-loglevel", "error",
    "-loop", "1", "-framerate", "30", "-t", f"{a_end:.3f}", "-i", str(still),
    "-i", str(mg), "-i", take,
    "-filter_complex",
    "[0:v]format=yuv420p,setsar=1[a];[1:v]format=yuv420p,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v];"
    "[2:a]apad[aud]",
    "-map", "[v]", "-map", "[aud]", "-t", f"{a_end + probe(str(mg)):.3f}", "-c:v", "libx264", "-crf", "19", "-preset", "medium",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(final)], check=True)
print(f"{final.name}: presenter 0-{a_end:.2f}s, graphics {a_end:.2f}-{dur:.2f}s + end card, total {probe(str(final)):.2f}s")
