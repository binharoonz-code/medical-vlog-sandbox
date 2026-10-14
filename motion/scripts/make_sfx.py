"""Synthesise the house-style sound effects (original, no third-party samples).

Writes 48 kHz mono 16-bit WAVs to public/sfx/: pop, pop2, whoosh, whoosh_out,
hit, riser, tick. Run: python3 scripts/make_sfx.py
"""
import os, wave
import numpy as np

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'sfx')
rng = np.random.default_rng(7)


def t(sec):
    return np.arange(int(SR * sec)) / SR


def lowpass(x, cutoff):
    # one-pole low-pass, cutoff may be an array (sweeps)
    cutoff = np.broadcast_to(cutoff, x.shape)
    a = np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def bandsweep(x, lo, hi):
    return lowpass(x, hi) - lowpass(x, lo)


def save(name, x, peak=0.9):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = min(len(x), int(SR * 0.004))
    x[-fade:] *= np.linspace(1, 0, fade)
    data = (x * 32767).astype(np.int16)
    with wave.open(os.path.join(OUT, name + '.wav'), 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())


# pop: short pitched blip with a fast pitch drop
tt = t(0.11)
f = 900 * np.exp(-tt * 28) + 380
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 38)
save('pop', pop, 0.8)
f2 = 1200 * np.exp(-tt * 30) + 520
save('pop2', np.sin(2 * np.pi * np.cumsum(f2) / SR) * np.exp(-tt * 40), 0.8)

# whoosh: noise through a rising then falling band, swelling envelope
tt = t(0.45)
env = np.sin(np.pi * np.clip(tt / 0.45, 0, 1)) ** 1.6
centre = 300 + 3200 * np.sin(np.pi * tt / 0.45)
w = bandsweep(rng.standard_normal(len(tt)), centre * 0.5, centre * 1.6) * env
save('whoosh', w, 0.75)
save('whoosh_out', w[::-1].copy(), 0.6)

# hit: low thump + short noise transient
tt = t(0.5)
thump = np.sin(2 * np.pi * np.cumsum(110 * np.exp(-tt * 9) + 42) / SR) * np.exp(-tt * 7)
click = lowpass(rng.standard_normal(len(tt)), 2500) * np.exp(-tt * 60) * 0.6
save('hit', thump + click, 0.95)

# riser: noise + tone rising over 0.9 s
tt = t(0.9)
env = (tt / 0.9) ** 2
tone = np.sin(2 * np.pi * np.cumsum(200 + 900 * (tt / 0.9) ** 2) / SR) * 0.35
nz = bandsweep(rng.standard_normal(len(tt)), 400 + 3000 * tt, 900 + 6000 * tt) * 0.8
save('riser', (tone + nz) * env, 0.6)

# tick: tiny click for small word accents
tt = t(0.03)
save('tick', lowpass(rng.standard_normal(len(tt)), 6000) * np.exp(-tt * 200), 0.5)
print('ok', sorted(os.listdir(OUT)))
