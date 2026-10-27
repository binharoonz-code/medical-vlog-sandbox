"""Pace a voice note to a target words-per-minute.

usage: pace_165.py in.m4a out.wav word_count [target_wpm=165]

1. Pauses: every silence (< -35 dB, >= 0.25 s) is shortened to PAUSE seconds, keeping equal
   room on both sides of the speech. Speech samples are never cut.
2. Tempo: the remaining gap to the target is closed with rubberband (pitch preserved,
   formant-preserving, high-quality "smooth" window for voice).
3. Loudness: two-pass EBU R128 to -16 LUFS / -1.5 dBTP in linear mode (a plain gain change,
   no compression) so every episode plays at the same level.
"""
import json, re, subprocess, sys

src, dst, words = sys.argv[1], sys.argv[2], int(sys.argv[3])
target = float(sys.argv[4]) if len(sys.argv) > 4 else 165.0
import os
# LOCKED VOICE METHOD (AG, Oct 2026): shorten silences only. Speed-up and loudness change degrade
# the cloned voice, so both are off unless explicitly enabled with ALLOW_STRETCH=1 / NORM=1.
PAUSE, EDGE, FADE = float(os.environ.get("PAUSE", "0.08")), 0.12, 0.008

def run(args):
    return subprocess.run(args, capture_output=True, text=True)

dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).stdout)
log = run(["ffmpeg", "-hide_banner", "-i", src, "-af", "silencedetect=noise=-35dB:d=0.25", "-f", "null", "-"]).stderr
st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
sil = list(zip(st, en + [dur] * (len(st) - len(en))))

# keep-segments: speech plus a short margin; lead-in/tail EDGE, inner pauses PAUSE
keep, cur = [], 0.0
for i, (a, b) in enumerate(sil):
    if a <= 0.02:                      # leading silence
        cur = max(0.0, b - EDGE); continue
    if b >= dur - 0.02:                # trailing silence
        keep.append((cur, min(dur, a + EDGE))); cur = None; break
    keep.append((cur, a + PAUSE / 2)); cur = b - PAUSE / 2
if cur is not None:
    keep.append((cur, dur))
keep = [(round(a, 4), round(b, 4)) for a, b in keep if b - a > 0.02]
trimmed = sum(b - a for a, b in keep)
want = words / target * 60
factor = trimmed / want
if not os.environ.get("ALLOW_STRETCH"): factor = min(factor, 1.0)
if os.environ.get("MAXTEMPO"): factor = min(factor, float(os.environ["MAXTEMPO"]))   # cap the stretch

parts = "".join(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS,afade=t=in:d={FADE},afade=t=out:st={b - a - FADE:.4f}:d={FADE}[p{i}];" for i, (a, b) in enumerate(keep))
concat = "".join(f"[p{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=0:a=1[c]"
tempo = f";[c]rubberband=tempo={factor:.5f}:pitch=1:pitchq=quality:window=standard:formant=preserved:transients=smooth[t]" if factor > 1.005 else ";[c]anull[t]"
pre = dst + ".pre.wav"
r = run(["ffmpeg", "-hide_banner", "-y", "-i", src, "-filter_complex", parts + concat + tempo, "-map", "[t]", "-ar", "48000", "-ac", "1", pre])
if r.returncode: sys.exit(r.stderr[-2000:])

NONORM = not os.environ.get("NORM")   # keep the voice's own level: no loudness change at all
m = run(["ffmpeg", "-hide_banner", "-i", pre, "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"]).stderr
j = json.loads(m[m.rindex("{"):m.rindex("}") + 1])
ln = (f"loudnorm=I=-16:TP=-1.5:LRA=11:linear=true:measured_I={j['input_i']}:measured_TP={j['input_tp']}:"
      f"measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}")
r = run(["ffmpeg", "-hide_banner", "-y", "-i", pre] + ([] if NONORM else ["-af", ln]) + [ "-ar", "48000", "-ac", "1", dst])
if r.returncode: sys.exit(r.stderr[-2000:])
subprocess.run(["rm", "-f", pre])

final_ = None
final = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst]).stdout)
json.dump({"keep": keep, "factor": factor, "out_s": final}, open(dst + ".map.json", "w"))
print(json.dumps({"in_s": round(dur, 2), "in_wpm": round(words / dur * 60), "pauses_shortened": len(keep) - 1,
                  "after_pauses_s": round(trimmed, 2), "tempo": round(factor, 3), "out_s": round(final, 2),
                  "out_wpm": round(words / final * 60), "loudness_in_LUFS": j["input_i"]}))
