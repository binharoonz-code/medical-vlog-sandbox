"""AI-upscale grid panels to 1080x1920 with OpenCV EDSR (x4), then resize.

Usage: python3 upscale.py MODEL.pb CODE [CODE ...]
Originals are kept as assets/images/<CODE>_src.png.
"""
import shutil, sys, time
from pathlib import Path
import cv2

IMG = Path(__file__).resolve().parent.parent / "assets" / "images"

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(sys.argv[1])
sr.setModel("edsr", 4)
for code in sys.argv[2:]:
    src = IMG / f"{code}_src.png"
    if not src.exists():
        shutil.copy(IMG / f"{code}.png", src)
    t = time.time()
    up = sr.upsample(cv2.imread(str(src)))
    out = cv2.resize(up, (1080, 1920), interpolation=cv2.INTER_AREA)
    cv2.imwrite(str(IMG / f"{code}.png"), out)
    print(f"{code}: {up.shape[1]}x{up.shape[0]} -> 1080x1920 in {time.time() - t:.0f}s", flush=True)
