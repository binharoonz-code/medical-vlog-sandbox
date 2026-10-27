"""Build a motion-engine project from a storyboard JSON + a voice note.

usage: build_note.py story.json voice.m4a out_dir src_dir

Timing (no speech model available): pauses come from ffmpeg silencedetect; each caption line
gets a share of speaking time proportional to its length, edges snapped to nearby pauses;
words inside a line are spread the same way. Cue references [line, word] resolve to the
estimated start of that word (word = index, or a substring of the word).
"""
import json, os, re, subprocess, sys

story_p, audio, out, src = sys.argv[1:5]
MAP = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else None

def tmap(t):
    """original-audio time -> paced-audio time"""
    if not MAP: return t
    acc = 0.0
    for a, b in MAP["keep"]:
        if t <= a: break
        acc += min(t, b) - a
    return acc / (MAP["factor"] if MAP["factor"] > 1.005 else 1.0)   # no tempo applied below 1.005

S = json.load(open(story_p, encoding="utf-8"))

dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio],
                           capture_output=True, text=True).stdout)
log = subprocess.run(["ffmpeg", "-hide_banner", "-i", audio, "-af", "silencedetect=noise=-30dB:d=0.18", "-f", "null", "-"],
                     capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
SIL = list(zip(st, en + [dur] * (len(st) - len(en))))
speech_start = SIL[0][1] if SIL and SIL[0][0] < 0.05 else 0.0
speech_end = SIL[-1][0] if SIL and SIL[-1][1] >= dur - 0.05 else dur

def speech(a, b):
    o, cur = [], a
    for s, e in SIL:
        if e <= cur or s >= b: continue
        if s > cur: o.append((cur, s))
        cur = max(cur, e)
    if cur < b: o.append((cur, b))
    return o or [(a, b)]

def at_speech(iv, x):
    for s, e in iv:
        if x <= e - s: return s + x
        x -= e - s
    return iv[-1][1]

lines = [l.replace("..", "").split() for l in S["lines"]]
w = [sum(len(x) for x in l) + 2 for l in lines]
iv_all = speech(speech_start, speech_end)
tot = sum(e - s for s, e in iv_all)
mids = [(a + b) / 2 for a, b in SIL if b - a >= 0.25]
edges, acc = [speech_start], 0
for x in w[:-1]:
    acc += x
    t = at_speech(iv_all, tot * acc / sum(w))
    m = min(mids, key=lambda v: abs(v - t)) if mids else t
    edges.append(m if abs(m - t) <= 0.8 and m > edges[-1] + 0.7 else t)
edges.append(speech_end)

vo = []
for n, (ws, a, b) in enumerate(zip(lines, edges[:-1], edges[1:]), 1):
    iv = speech(a, b); T = sum(e - s for s, e in iv); W = [len(x) + 1 for x in ws]; c, words = 0, []
    for x, k in zip(ws, W):
        s = at_speech(iv, T * c / sum(W)); c += k
        words.append({"w": x, "s": round(s, 3), "e": round(at_speech(iv, T * c / sum(W)), 3)})
    vo.append({"id": f"l{n}", "text": " ".join(ws), "start": round(a, 3), "end": round(b, 3), "words": words})

# ALIGN=<elevenlabs alignment.json>: replace estimates with the exact spoken-word times.
# Caption lines are matched to the spoken words in order; a line's spoken form applies the same
# number-to-words substitutions used for the TTS script, so word counts line up.
if os.environ.get("ALIGN"):
    NUM = [("٣ دقايق", "ثلاث دقايق"), ("من 7 لـ 9 ساعات", "من سبع لتسع ساعات"), ("الساعة 10", "الساعة عشر"),
           ("الساعة 6", "الساعة ست"), ("الساعة 2", "الساعة ثنتين"), ("4 ساعات", "أربع ساعات"),
           ("والـ NAD", "وال إن إيه دي"), ("بنزويل بيروكسايد 2.5%", "بنزويل بيروكسايد اثنين ونص بالمية"),
           ("ارقد 5 ساعات", "ارقد خمس ساعات"), ("لين 15%", "لين خمسطعش بالمية"), ("ينزل 1%", "ينزل واحد بالمية"),
           ("عمرك 20", "عمرك عشرين"), ("عمره 50", "عمره خمسين")]
    al = json.load(open(os.environ["ALIGN"]))
    spoken, cur = [], None
    for ch, s, e in zip(al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]):
        if ch.isspace():
            cur = None; continue
        if cur is None:
            cur = {"w": "", "s": s, "e": e}; spoken.append(cur)
        cur["w"] += ch; cur["e"] = e
    spoken = [x for x in spoken if any(c.isalpha() for c in x["w"])]
    k = 0
    for v, src_line in zip(vo, S["lines"]):
        say = src_line.replace("..", " ")
        for a_, b_ in NUM + [tuple(x) for x in S.get("say", [])]: say = say.replace(a_, b_)
        n_say = len([x for x in say.split() if any(c.isalpha() for c in x)])
        seg = spoken[k:k + n_say]; k += n_say
        if not seg: continue
        v["start"], v["end"] = round(seg[0]["s"], 3), round(seg[-1]["e"], 3)
        disp = v["words"]
        if len(disp) == len(seg):
            for d_, s_ in zip(disp, seg): d_["s"], d_["e"] = round(s_["s"], 3), round(s_["e"], 3)
        elif any(not re.search(r"[\u0600-\u06FF]", d_["w"]) for d_ in disp) and len(seg) > len(disp):
            # numbers spoken as several words ("1%" = "واحد بالمية"): letters map 1:1, each number takes the extra spoken words
            nums = [i_ for i_, d_ in enumerate(disp) if not re.search(r"[\u0600-\u06FF]", d_["w"])]
            extra = len(seg) - len(disp); j = 0
            for i_, d_ in enumerate(disp):
                n_ = 1 + (extra // len(nums) + (1 if nums.index(i_) < extra % len(nums) else 0) if i_ in nums else 0)
                d_["s"], d_["e"] = round(seg[j]["s"], 3), round(seg[j + n_ - 1]["e"], 3); j += n_
        else:   # different count (e.g. numbers): spread display words over the line's real span
            a_, b_ = v["start"], v["end"]
            for i_, d_ in enumerate(disp):
                d_["s"] = round(a_ + (b_ - a_) * i_ / len(disp), 3); d_["e"] = round(a_ + (b_ - a_) * (i_ + 1) / len(disp), 3)
    if k != len(spoken): print(f"WARNING: matched {k} of {len(spoken)} spoken words")
    for i_ in range(len(vo) - 1):           # each line holds until the next one starts
        vo[i_]["end"] = vo[i_ + 1]["start"]

if MAP:
    for v in vo:
        v["start"], v["end"] = round(tmap(v["start"]), 3), round(tmap(v["end"]), 3)
        for x in v["words"]: x["s"], x["e"] = round(tmap(x["s"]), 3), round(tmap(x["e"]), 3)
    dur = MAP["out_s"]

def ref(r):
    L, k = r
    ws = vo[L - 1]["words"]
    if isinstance(k, int): return ws[k]["s"]
    for x in ws:
        if k in x["w"]: return x["s"]
    raise SystemExit(f"cue word {k!r} not in line {L}: {vo[L-1]['text']}")

def resolve(o):
    if isinstance(o, dict):
        return {k: (ref(v) if (k.startswith("at") or k in ("until", "markAt", "zoneAt", "crossAt", "fallAt")) and isinstance(v, list) else resolve(v)) for k, v in o.items()}
    if isinstance(o, list):
        return [resolve(x) for x in o]
    return o

scenes, tl_sc = [], []
for i, sc in enumerate(S["scenes"]):
    sid = f"s{i+1}"
    start = 0.0 if i == 0 else vo[S["scenes"][i]["lines"][0] - 1]["start"]
    end = dur if i == len(S["scenes"]) - 1 else vo[S["scenes"][i + 1]["lines"][0] - 1]["start"]
    fx = resolve(sc.get("fx", []))
    for f in fx:  # gauge keys: [[ref, level], ...]
        if f["t"] == "gauge":
            f["keys"] = [[ref(k) if isinstance(k, list) else k, v] for k, v in f["keys"]]
    hot = {f"l{k}": v for k, v in sc.get("hot", {}).items()}
    hc = {f"l{k}": v for k, v in sc.get("hotColor", {}).items()}
    scenes.append({"id": sid, "lines": [f"l{n}" for n in sc["lines"]], "fx": fx, "hot": hot, "hotColor": hc})
    t = {"id": sid, "file": "scenes/all.js", "start": round(start, 3), "end": round(end, 3), "lines": [f"l{n}" for n in sc["lines"]]}
    if i: t["transition"] = {"type": sc.get("tr", "push"), "dur": 0.35, **({"dir": "up"} if sc.get("tr", "push") == "push" else {"dir": "rtl"} if sc.get("tr") == "wipe" else {})}
    tl_sc.append(t)

os.makedirs(f"{out}/scenes", exist_ok=True)
json.dump({"duration": dur, "bpm": 120, "beatsPerBar": 4, "scenes": tl_sc, "vo": vo}, open(f"{out}/timeline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump({"name": S["title"], "fps": 30, "width": 1080, "height": 1920, "bpm": 120,
           "palette": {"bg": "#0B1626", "ink": "#F7F9FC", "acc": "#2EC4B6", "clay": "#FF4D5A", "hi": "#FFD23F", "mut": "#8DA2BC"},
           "fonts": {"display": "Lalezar", "body": "Tajawal", "num": "Inter"}, "post": {"grain": 0.03, "vignette": 0.3},
           "scenes": [{k: s[k] for k in ("id", "file", "lines")} for s in tl_sc]},
          open(f"{out}/project.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
# THEME=<name>: append motion_src/theme_<name>.js after lib (it overrides bg/line and sets THEME colours).
# Its first line may be `// POST: {"grain":..,"vignette":..}` to replace the post settings.
theme_js = ""
if os.environ.get("THEME"):
    theme_js = open(f"{src}/theme_{os.environ['THEME']}.js", encoding="utf-8").read()
    m = re.match(r"// POST: (\{.*\})", theme_js)
    if m:
        pj = json.load(open(f"{out}/project.json", encoding="utf-8")); pj["post"] = json.loads(m.group(1))
        json.dump(pj, open(f"{out}/project.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
js = open(f"{src}/lib.js", encoding="utf-8").read() + "\n" + theme_js + "\nconst DATA = " + json.dumps({"scenes": scenes}, ensure_ascii=False) + ";\n" + open(f"{src}/kit.js", encoding="utf-8").read()
open(f"{out}/scenes/all.js", "w", encoding="utf-8").write(js)
json.dump([{"line": v["id"], "start": v["start"], "end": v["end"], "text": v["text"], "flag": S.get("flags", {}).get(v["id"][1:], "")} for v in vo],
          open(f"{out}/captions.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{S['title']}: {dur:.1f}s, {len(vo)} lines, {len(scenes)} scenes; speech {speech_start:.2f}-{speech_end:.2f}")
for v in vo: print(f"  {v['id']:>4} {v['start']:6.2f}-{v['end']:6.2f} {v['text']}")
