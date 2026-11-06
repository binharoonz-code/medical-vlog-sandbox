"""Exact word timing for a voice take, in the ElevenLabs character-alignment format build_note.py reads.
Uses local faster-whisper word timestamps, then maps the SCRIPT's letters onto the transcript's letters
(difflib alignment), so the word list is always the script's own words (counts match) even where whisper mishears.
usage: python whisper_align.py voice.mp3 "spoken script text (no audio tags)" out.align.json
"""
import sys, json, re, subprocess, difflib, numpy as np
from faster_whisper import WhisperModel
FF = r"C:\Users\LENOVO\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
mp3, text, out = sys.argv[1], sys.argv[2], sys.argv[3]
raw = subprocess.run([FF, "-v", "quiet", "-i", mp3, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True).stdout
a = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
segs, _ = WhisperModel("small", device="cpu", compute_type="int8").transcribe(a, language="ar", word_timestamps=True, vad_filter=False)
tw = [w for s in segs for w in s.words]
NORM = str.maketrans({"أ": "ا", "إ": "ا", "آ": "ا", "ة": "ه", "ى": "ي", "ج": "ق", "ئ": "ي", "ؤ": "و"})
L = lambda s: re.sub(r"[^\u0621-\u064A0-9a-zA-Z]", "", s).translate(NORM)
# transcript letters with times
tl, tt = [], []
for w in tw:
    ls = L(w.word)
    for i, c in enumerate(ls):
        tl.append(c); tt.append((w.start + (w.end - w.start) * i / len(ls), w.start + (w.end - w.start) * (i + 1) / len(ls)))
words = text.split()
sl, owner = [], []
for wi, w in enumerate(words):
    for c in L(w): sl.append(c); owner.append(wi)
m = difflib.SequenceMatcher(None, "".join(sl), "".join(tl), autojunk=False)
st = [None] * len(sl); en = [None] * len(sl)
for b in m.get_matching_blocks():
    for k in range(b.size): st[b.a + k], en[b.a + k] = tt[b.b + k]
# interpolate letters with no match
t0, t1 = tw[0].start, tw[-1].end
known = [i for i in range(len(sl)) if st[i] is not None]
for i in range(len(sl)):
    if st[i] is None:
        p = max([k for k in known if k < i], default=None); n = min([k for k in known if k > i], default=None)
        ps = en[p] if p is not None else t0; ns = st[n] if n is not None else t1
        pi = p if p is not None else -1; ni = n if n is not None else len(sl)
        f0, f1 = (i - pi) / (ni - pi), (i + 1 - pi) / (ni - pi)
        st[i], en[i] = ps + (ns - ps) * f0 - 0, ps + (ns - ps) * f1
chars, cs, ce = [], [], []
for wi, w in enumerate(words):
    idx = [i for i, o in enumerate(owner) if o == wi]
    if idx: s0, e0 = st[idx[0]], en[idx[-1]]
    else: s0 = e0 = (ce[-1] if ce else t0)
    e0 = max(e0, s0 + 0.02)
    for k, ch in enumerate(w):
        chars.append(ch); cs.append(round(s0 + (e0 - s0) * k / len(w), 3)); ce.append(round(s0 + (e0 - s0) * (k + 1) / len(w), 3))
    chars.append(" "); cs.append(round(e0, 3)); ce.append(round(e0, 3))
json.dump({"characters": chars, "character_start_times_seconds": cs, "character_end_times_seconds": ce}, open(out, "w", encoding="utf-8"), ensure_ascii=False)
print("ok", len(words), "words, matched letters", sum(b.size for b in m.get_matching_blocks()), "of", len(sl))
