"""Split a 2x2 GPT image grid into four panels.

Usage: python3 split_grid.py GRID.png CODE1 CODE2 CODE3 CODE4
Order: top-left, top-right, bottom-left, bottom-right. Panels are saved to
assets/images/<CODE>.png. Seams are searched near the centre so a thin
gutter or slightly off-centre split is trimmed away.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "assets" / "images"


def seam(gray, axis):
    """Return (start, end) of the strongest seam band within ±6% of centre."""
    profile = np.abs(np.diff(gray.astype(float), axis=axis)).mean(axis=1 - axis)
    n = gray.shape[axis]
    lo, hi = int(n * 0.44), int(n * 0.56)
    edge = lo + int(np.argmax(profile[lo:hi]))
    # widen over a uniform gutter (low variance rows/cols) if one exists
    line_var = gray.std(axis=1 - axis)
    a = b = edge
    while a > lo and line_var[a] < 6:
        a -= 1
    while b < hi and line_var[b + 1] < 6:
        b += 1
    return a, b + 1


def main():
    path, codes = sys.argv[1], sys.argv[2:6]
    im = Image.open(path).convert("RGB")
    gray = np.asarray(im.convert("L"))
    x0, x1 = seam(gray, 1)
    y0, y1 = seam(gray, 0)
    boxes = [(0, 0, x0, y0), (x1, 0, im.width, y0), (0, y1, x0, im.height), (x1, y1, im.width, im.height)]
    print(f"grid {im.width}x{im.height}, seams x={x0}-{x1} y={y0}-{y1}")
    for code, box in zip(codes, boxes):
        panel = im.crop(box)
        panel.save(OUT / f"{code}.png")
        print(f"{code}: {panel.width}x{panel.height}  ratio {panel.height / panel.width:.3f} (9:16 = 1.778)")


if __name__ == "__main__":
    main()
