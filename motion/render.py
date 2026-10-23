"""Motion-graphics renderer for the vlog finales (Part 3).

Usage:  python3 render.py disc|meniscus|gallstones [--stills]
Scene durations are placeholders from word count; re-time to the HeyGen audio.
"""
import math, subprocess, sys
from functools import lru_cache
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H, FPS = 1080, 1920, 30
ROOT = Path(__file__).resolve().parent
IMG = ROOT.parent / "assets" / "images"
FONT_DIR = Path("/usr/share/fonts/opentype/inter")
BLACK = str(FONT_DIR / "InterDisplay-Black.otf")
BOLD = str(FONT_DIR / "InterDisplay-Bold.otf")

WHITE = (255, 255, 255)
TEAL = (0, 214, 180)
RED = (255, 59, 48)
NAVY = (8, 14, 28)
GREY = (170, 180, 195)


# ---------- easing ----------
def clamp(x, a=0.0, b=1.0):
    return max(a, min(b, x))

def ease_out_cubic(p):
    return 1 - (1 - p) ** 3

def ease_out_back(p, s=1.7):
    p -= 1
    return 1 + (s + 1) * p ** 3 + s * p ** 2


# ---------- sprites ----------
@lru_cache(maxsize=None)
def font(path, size):
    return ImageFont.truetype(path, size)

def wrap(text, f, maxw):
    out = []
    for para in text.split("\n"):
        line = ""
        for word in para.split(" "):
            test = (line + " " + word).strip()
            if f.getlength(test) <= maxw or not line:
                line = test
            else:
                out.append(line)
                line = word
        out.append(line)
    return out

@lru_cache(maxsize=None)
def text_sprite(text, size, color=WHITE, fpath=BLACK, pill=None, pill_text=None, maxw=940, rot=0, outline=None):
    f = font(fpath, size)
    lines = wrap(text, f, maxw - (60 if pill or outline else 0))
    lh = int(size * 1.08)
    tw = int(max(f.getlength(l) for l in lines))
    th = lh * len(lines)
    padx, pady = (34, 18) if (pill or outline) else (0, 0)
    m = 40
    cw, ch = tw + 2 * padx + 2 * m, th + 2 * pady + 2 * m
    shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    layer = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    ds, dl = ImageDraw.Draw(shadow), ImageDraw.Draw(layer)
    box = (m, m, m + tw + 2 * padx, m + th + 2 * pady)
    r = int(min(28, (box[3] - box[1]) / 2))
    if pill:
        ds.rounded_rectangle(box, r, fill=(0, 0, 0, 150))
        dl.rounded_rectangle(box, r, fill=pill + (255,))
    if outline:
        dl.rounded_rectangle(box, r, fill=(8, 14, 28, 170), outline=outline + (255,), width=5)
    tc = (pill_text or color) if pill else color
    for i, l in enumerate(lines):
        x = m + padx + (tw - f.getlength(l)) / 2
        y = m + pady + i * lh - int(size * 0.06)
        if not pill:
            ds.text((x, y + 4), l, font=f, fill=(0, 0, 0, 200))
        dl.text((x, y), l, font=f, fill=tc + (255,))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    out = Image.alpha_composite(shadow, layer)
    if rot:
        out = out.rotate(rot, resample=Image.BICUBIC, expand=True)
    return out

def with_alpha(img, a):
    if a >= 0.999:
        return img
    r, g, b, al = img.split()
    al = al.point(lambda v: int(v * a))
    return Image.merge("RGBA", (r, g, b, al))

def place(canvas, spr, cx, cy, alpha=1.0, scale=1.0):
    if alpha <= 0.01 or scale <= 0.01:
        return
    if abs(scale - 1) > 0.01:
        spr = spr.resize((max(1, int(spr.width * scale)), max(1, int(spr.height * scale))), Image.BILINEAR)
    spr = with_alpha(spr, alpha)
    canvas.alpha_composite(spr, (int(cx - spr.width / 2), int(cy - spr.height / 2)))


# ---------- animation ----------
def anim(kind, t, t0):
    """Return (alpha, dy, scale) for an element at scene time t."""
    if t < t0:
        return 0, 0, 1
    if kind == "up":
        p = ease_out_cubic(clamp((t - t0) / 0.4))
        return p, (1 - p) * 70, 1
    if kind == "pop":
        p = clamp((t - t0) / 0.35)
        return min(1, p * 2.5), 0, 0.6 + 0.4 * ease_out_back(p)
    if kind == "stamp":
        p = clamp((t - t0) / 0.22)
        return p, 0, 1.9 - 0.9 * ease_out_cubic(p)
    p = clamp((t - t0) / 0.4)
    return p, 0, 1


# ---------- backgrounds ----------
@lru_cache(maxsize=None)
def bg_source(name, blur=0):
    im = Image.open(IMG / f"{name}.png").convert("RGB")
    s = max(W * 1.12 / im.width, H * 1.12 / im.height)
    im = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(blur))
    return im

@lru_cache(maxsize=None)
def plate():
    im = Image.new("RGB", (W, H), NAVY)
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    ImageDraw.Draw(glow).ellipse((-300, 300, W + 300, H - 300), fill=(0, 70, 80))
    return Image.blend(im, glow.filter(ImageFilter.GaussianBlur(220)), 0.55)

@lru_cache(maxsize=None)
def vignette():
    v = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(v)
    for y in range(H):
        top = clamp(1 - y / 420) * 150
        bot = clamp((y - (H - 700)) / 700) * 190
        d.line([(0, y), (W, y)], fill=(0, 0, 0, int(max(top, bot))))
    return v

def background(sc, t):
    dur = sc["dur"]
    if sc.get("bg") is None:
        base = plate().copy()
    else:
        src = bg_source(sc["bg"], sc.get("blur", 0))
        p = t / dur
        kb = sc.get("kb", "in")
        z = {"in": 1 + 0.07 * p, "out": 1.07 - 0.07 * p}.get(kb, 1.04)
        cw, ch = W * 1.12 / z, H * 1.12 / z
        ox = (src.width - cw) / 2
        oy = (src.height - ch) / 2
        if kb == "right":
            ox = (src.width - cw) * (0.25 + 0.5 * p)
        if kb == "left":
            ox = (src.width - cw) * (0.75 - 0.5 * p)
        base = src.crop((int(ox), int(oy), int(ox + cw), int(oy + ch))).resize((W, H), Image.BILINEAR)
    base = base.convert("RGBA")
    if sc.get("dim"):
        base.alpha_composite(Image.new("RGBA", (W, H), (0, 0, 0, int(255 * sc["dim"]))))
    if sc.get("tint"):
        base.alpha_composite(Image.new("RGBA", (W, H), RED + (int(255 * sc["tint"]),)))
    if sc.get("siren"):
        col = RED if int(t * 6) % 2 == 0 else (30, 90, 255)
        base.alpha_composite(Image.new("RGBA", (W, H), col + (55,)))
    base.alpha_composite(vignette())
    return base


# ---------- elements ----------
def draw_counter(canvas, e, t):
    a, dy, s = anim("pop", t, e["t"])
    if a <= 0:
        return
    p = ease_out_cubic(clamp((t - e["t"]) / e.get("cdur", 1.0)))
    val = e["value"] * p
    txt = e.get("prefix", "") + (f"{int(round(val)):,}") + e.get("suffix", "")
    spr = text_sprite(txt, e["size"], e.get("color", WHITE))
    place(canvas, spr, W / 2, e["y"] + dy, a, s)

def draw_bars(canvas, e, t):
    if t < e["t"]:
        return
    d = ImageDraw.Draw(canvas)
    x0, track = 250, 640
    for i, (label, pct, col) in enumerate(e["bars"]):
        y = e["y"] + i * 120
        p = ease_out_cubic(clamp((t - e["t"] - i * 0.15) / 0.7))
        lab = text_sprite(label, 46, WHITE, BOLD)
        place(canvas, lab, 165, y + 34, min(1, p * 3))
        d.rounded_rectangle((x0, y, x0 + track, y + 68), 34, fill=(255, 255, 255, 50))
        fw = max(68, int(track * pct / 100 * p))
        d.rounded_rectangle((x0, y, x0 + fw, y + 68), 34, fill=col + (255,))
        num = text_sprite(f"{int(round(pct * p))}%", 44, NAVY if pct > 25 else WHITE, BLACK)
        place(canvas, num, x0 + fw - 70, y + 34, min(1, p * 3))

def icon(good, r=66):
    im = Image.new("RGBA", (2 * r + 20, 2 * r + 20), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    c = r + 10
    d.ellipse((10, 10, 10 + 2 * r, 10 + 2 * r), fill=(TEAL if good else RED) + (255,))
    if good:
        d.line([(c - r * .42, c + r * .02), (c - r * .1, c + r * .34), (c + r * .45, c - r * .3)], fill=NAVY, width=int(r * .22), joint="curve")
    else:
        d.rounded_rectangle((c - r * .1, c - r * .55, c + r * .1, c + r * .15), 6, fill=WHITE)
        d.ellipse((c - r * .12, c + r * .3, c + r * .12, c + r * .54), fill=WHITE)
    return im

ICONS = {}

def draw_grid(canvas, e, t):
    n, good = e["n"], e["good"]
    cols, gap = 5, 175
    for i in range(n):
        g = i < good
        key = g
        if key not in ICONS:
            ICONS[key] = icon(g)
        a, _, s = anim("pop", t, e["t"] + i * 0.12)
        cx = W / 2 + (i % cols - 2) * gap
        cy = e["y"] + (i // cols) * gap
        place(canvas, ICONS[key], cx, cy, a, s)

def draw_element(canvas, e, t):
    k = e["k"]
    if k == "counter":
        return draw_counter(canvas, e, t)
    if k == "bars":
        return draw_bars(canvas, e, t)
    if k == "grid":
        return draw_grid(canvas, e, t)
    spr = text_sprite(e["text"], e["size"], e.get("color", WHITE), e.get("font", BLACK),
                      e.get("pill"), e.get("pill_text"), e.get("maxw", 940), e.get("rot", 0), e.get("outline"))
    a, dy, s = anim(e.get("anim", "up"), t, e["t"])
    place(canvas, spr, e.get("x", W / 2), e["y"] + dy, a, s)


# ---------- chrome ----------
def chrome(canvas, gt, total, tag):
    d = ImageDraw.Draw(canvas)
    d.rectangle((0, 0, W, 10), fill=(255, 255, 255, 40))
    d.rectangle((0, 0, int(W * gt / total), 10), fill=TEAL + (255,))
    if tag:
        place(canvas, text_sprite(tag, 34, WHITE, BOLD, (0, 0, 0), WHITE), 250, 105, 0.85)


# ---------- scene helpers ----------
def T(text, y, t=0.0, size=70, color=WHITE, anim="up", **kw):
    return dict(k="text", text=text, y=y, t=t, size=size, color=color, anim=anim, **kw)

def PILL(text, y, t=0.0, size=64, bg=TEAL, fg=NAVY, anim="pop", **kw):
    return T(text, y, t, size, fg, anim, pill=bg, pill_text=fg, **kw)

def STAMP(text, y, t=0.0, size=110, bg=TEAL, fg=NAVY, **kw):
    return PILL(text, y, t, size, bg, fg, anim="stamp", rot=-4, **kw)

def COUNT(value, y, t=0.0, size=240, color=WHITE, **kw):
    return dict(k="counter", value=value, y=y, t=t, size=size, color=color, **kw)

def FLAG(img, n, total, text, dur):
    return dict(bg=img, dur=dur, dim=0.42, tint=0.16, kb="in", els=[
        PILL(f"RED FLAG {n}/{total}", 330, 0.0, 50, RED, WHITE),
        T(text, 540, 0.15, 96)])

def END(cta):
    return dict(bg=None, dur=2.6, els=[
        T("NORMAL", 640, 0.0, 130, TEAL, "pop"),
        T("OR NOT?", 790, 0.12, 130, WHITE, "pop"),
        T(cta, 980, 0.45, 52, WHITE, "up", font=BOLD, maxw=1020),
        T("Follow for the next one", 1090, 0.8, 46, GREY, "up", font=BOLD)])


VIDEOS = {
    "disc": [
        dict(bg="D3", dur=5.5, dim=0.45, kb="in", els=[
            T("MRI SCANS OF", 420, 0.1, 66),
            COUNT(3110, 660, 0.4, 250, cdur=1.3),
            PILL("PEOPLE WITH ZERO BACK PAIN", 880, 1.3, 60, RED, WHITE)]),
        dict(bg="D4", dur=3.6, dim=0.35, kb="in", els=[
            PILL("AGE 20", 360, 0.05, 80, WHITE, NAVY),
            COUNT(30, 600, 0.25, 270, TEAL, suffix="%", cdur=0.9),
            T("ALREADY HAVE A DISC BULGE", 800, 0.7, 64)]),
        dict(bg="D5", dur=2.6, dim=0.4, kb="in", els=[
            PILL("AGE 80", 360, 0.0, 80, WHITE, NAVY),
            COUNT(84, 600, 0.15, 270, TEAL, suffix="%", cdur=0.8),
            dict(k="bars", y=880, t=0.45, bars=[("20", 30, (120, 200, 255)), ("80", 84, TEAL)])]),
        dict(bg="D6", dur=1.9, dim=0.2, kb="in", els=[
            STAMP("NO PAIN", 400, 0.1),
            T("WRINKLES ON THE INSIDE", 1250, 0.45, 86)]),
        dict(bg="D7", dur=5.0, dim=0.3, kb="right", els=[
            STAMP("KEEP MOVING", 420, 0.15, 118),
            T("MOVEMENT BEATS BED REST", 600, 0.8, 62)]),
        FLAG("D8", 1, 3, "NUMBNESS BETWEEN YOUR LEGS", 1.75),
        FLAG("D9", 2, 3, "LOSING BLADDER CONTROL", 1.75),
        FLAG("D10", 3, 3, "A LEG GETTING WEAKER", 1.75),
        dict(bg="G10", dur=3.0, dim=0.35, siren=True, kb="in", els=[
            STAMP("EMERGENCY", 460, 0.05, 120, RED, WHITE),
            T("COME TO THE ER TODAY", 660, 0.5, 96)]),
        END("Send this to someone with back pain"),
    ],
    "meniscus": [
        dict(bg="M3", dur=5.0, dim=0.45, kb="in", els=[
            T("KNEE MRIs OF", 420, 0.1, 66),
            COUNT(991, 660, 0.4, 260, cdur=1.2),
            PILL("REGULAR ADULTS · AGE 50–90", 880, 1.3, 58, WHITE, NAVY)]),
        dict(bg="M4", dur=4.2, dim=0.4, kb="in", els=[
            PILL("MEN AGED 70–90", 360, 0.05, 72, WHITE, NAVY),
            COUNT(56, 610, 0.25, 270, TEAL, suffix="%", cdur=1.0),
            T("HAD A TORN MENISCUS", 820, 0.8, 72)]),
        dict(bg="M5", dur=4.5, dim=0.6, blur=14, els=[
            T("PEOPLE WITH A TEAR", 360, 0.05, 70),
            dict(k="grid", n=10, good=6, y=640, t=0.4),
            T("6 IN 10: NO KNEE PAIN", 1080, 1.9, 86, TEAL, "pop")]),
        dict(bg=None, dur=4.7, els=[
            T("WEAR-AND-TEAR TEARS", 560, 0.05, 72),
            T("REAL KEYHOLE SURGERY", 880, 0.6, 70, WHITE, "pop", outline=TEAL, maxw=440, x=280),
            T("VS", 880, 1.2, 76, GREY, "pop"),
            T("FAKE SURGERY", 880, 1.7, 70, WHITE, "pop", outline=RED, maxw=440, x=800)]),
        dict(bg=None, dur=1.4, els=[
            T("WEAR-AND-TEAR TEARS", 560, -1, 72),
            T("REAL KEYHOLE SURGERY", 880, -1, 70, WHITE, "pop", outline=TEAL, maxw=440, x=280),
            T("VS", 880, -1, 76, GREY, "pop"),
            T("FAKE SURGERY", 880, -1, 70, WHITE, "pop", outline=RED, maxw=440, x=800),
            STAMP("SAME RESULTS", 1250, 0.0, 124)]),
        dict(bg="M8", dur=2.7, dim=0.3, kb="in", els=[
            STAMP("PHYSIO FIRST", 420, 0.05, 120),
            T("FOR WEAR-AND-TEAR TEARS", 600, 0.6, 58)]),
        FLAG("M9", 1, 2, "KNEE LOCKS AND WON'T STRAIGHTEN", 2.0),
        FLAG("M10", 2, 2, "SWELLS FAST AFTER AN INJURY", 1.7),
        dict(bg="M10", dur=1.6, dim=0.6, blur=12, tint=0.2, els=[
            STAMP("GET CHECKED URGENTLY", 760, 0.0, 104, RED, WHITE, maxw=860)]),
        END("Send this to someone with knee pain"),
    ],
    "gallstones": [
        dict(bg="G3", dur=4.3, dim=0.4, kb="in", els=[
            T("A STUDY OF", 420, 0.1, 64),
            COUNT(22257, 640, 0.35, 220, cdur=1.3),
            PILL("PEOPLE WITH SILENT GALLSTONES", 860, 1.3, 54, TEAL, NAVY)]),
        dict(bg="G5", dur=3.3, dim=0.55, kb="in", els=[
            T("EACH YEAR, ONLY", 380, 0.05, 70),
            COUNT(2, 620, 0.25, 300, TEAL, prefix="~", suffix="%", cdur=0.6),
            T("DEVELOPED SYMPTOMS", 840, 0.7, 72)]),
        dict(bg="G3", dur=4.3, dim=0.62, blur=14, els=[
            PILL("10 YEARS LATER", 360, 0.05, 66, WHITE, NAVY),
            dict(k="grid", n=10, good=8, y=650, t=0.35),
            T("8 IN 10: STILL NO SYMPTOMS", 1090, 1.9, 80, TEAL, "pop")]),
        dict(bg="G4", dur=3.5, dim=0.3, kb="in", els=[
            STAMP("WATCH, DON'T REMOVE", 430, 0.05, 104, maxw=900),
            T("WHAT GUIDELINES USUALLY ADVISE", 640, 0.7, 52, font=BOLD)]),
        dict(bg=None, dur=6.6, els=[
            PILL("HIGHER RISK", 480, 0.0, 84, RED, WHITE),
            T("WOMEN", 700, 0.8, 66, outline=WHITE, anim="pop", maxw=1040),
            T("YOUNGER PEOPLE", 870, 1.6, 66, outline=WHITE, anim="pop", maxw=1040),
            T("MANY OR LARGE STONES", 1040, 2.4, 66, outline=WHITE, anim="pop", maxw=1040),
            T("→ DECIDE WITH YOUR DOCTOR", 1250, 3.8, 66, TEAL, maxw=1000)]),
        FLAG("G7", 1, 3, "RIGHT-RIB PAIN LASTING 30+ MINUTES", 2.0),
        FLAG("G8", 2, 3, "FEVER", 1.8),
        FLAG("G9", 3, 3, "YELLOW EYES", 2.0),
        dict(bg="G10", dur=1.8, dim=0.35, siren=True, kb="in", els=[
            STAMP("COME TO THE ER", 520, 0.0, 120, RED, WHITE)]),
        END("Send this to someone with gallstones"),
    ],
}


def frame(scenes, gi, t, gt, total):
    sc = scenes[gi]
    canvas = background(sc, t)
    for e in sc["els"]:
        draw_element(canvas, e, t)
    chrome(canvas, gt, total, "NORMAL OR NOT?" if sc.get("bg") is not None or gi < len(scenes) - 1 else None)
    if t < 0.12 and gi > 0:  # cut flash
        canvas.alpha_composite(Image.new("RGBA", (W, H), (255, 255, 255, int(110 * (1 - t / 0.12)))))
    return canvas.convert("RGB")


def main():
    name = sys.argv[1]
    scenes = VIDEOS[name]
    total = sum(s["dur"] for s in scenes)
    if "--stills" in sys.argv:
        start = 0
        for i, sc in enumerate(scenes):
            frame(scenes, i, sc["dur"] * 0.8, start + sc["dur"] * 0.8, total).save(ROOT / "qa" / f"{name}_{i:02d}.jpg", quality=80)
            start += sc["dur"]
        print("stills written")
        return
    out = ROOT / "out" / f"{name}_motion_EN.mp4"
    if "--out" in sys.argv:
        out = Path(sys.argv[sys.argv.index("--out") + 1])
    ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24",
                           "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium",
                           "-crf", "19", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)],
                          stdin=subprocess.PIPE)
    start = 0.0
    for i, sc in enumerate(scenes):
        for f in range(int(round(sc["dur"] * FPS))):
            t = f / FPS
            ff.stdin.write(frame(scenes, i, t, start + t, total).tobytes())
        start += sc["dur"]
    ff.stdin.close()
    ff.wait()
    print(out, f"{total:.1f}s")


if __name__ == "__main__":
    main()
