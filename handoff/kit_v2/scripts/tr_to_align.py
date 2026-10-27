"""Turn an ElevenLabs transcript word list into the character-alignment format build_note.py reads,
using the SCRIPT's words (so counts match) and the transcript's timings.
usage: tr_to_align.py words.json voice_text out.align.json"""
import json, sys
_d = json.load(open(sys.argv[1])); words = _d["words"] if isinstance(_d, dict) else _d; voice = open(sys.argv[2]).read().split()
alpha = lambda w: any(c.isalpha() for c in w)
spoken = [w for w in voice if alpha(w)]
tw = [w for w in words if w.get("type", "word") == "word"]
# merge/expand transcript tokens so they line up with the script
fixed = []; i = 0
while i < len(tw):
    t = tw[i]
    if t["text"] in ("الـ", "ال") and i + 1 < len(tw):            # "الـ Semaglutide" -> one word
        fixed.append({"s": t["start"], "e": tw[i + 1]["end"]}); i += 2; continue
    if t["text"] == "BBC" and i + 1 < len(tw) and tw[i + 1]["text"].startswith("157"):   # BPC-157 spoken as 6 words
        s, e = t["start"], tw[i + 1]["end"]
        fixed += [{"s": s + (e - s) * k / 6, "e": s + (e - s) * (k + 1) / 6} for k in range(6)]; i += 2; continue
    fixed.append({"s": t["start"], "e": t["end"]}); i += 1
assert len(fixed) == len(spoken), (len(fixed), len(spoken))
chars, st, en = [], [], []
for w, t in zip(spoken, fixed):
    n = len(w)
    for k, ch in enumerate(w):
        chars.append(ch); st.append(t["s"] + (t["e"] - t["s"]) * k / n); en.append(t["s"] + (t["e"] - t["s"]) * (k + 1) / n)
    chars.append(" "); st.append(t["e"]); en.append(t["e"])
json.dump({"characters": chars, "character_start_times_seconds": st, "character_end_times_seconds": en}, open(sys.argv[3], "w"), ensure_ascii=False)
print("ok", len(spoken), "words")
