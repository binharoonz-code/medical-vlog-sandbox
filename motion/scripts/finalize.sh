#!/usr/bin/env bash
# Convert rendered samples to standard delivery format and write a receipt:
# H.264 High, yuv420p limited (TV) range, BT.709 tags, +faststart for phones.
# Usage: scripts/finalize.sh            (reads out/*.mp4, writes out/deliver/)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/deliver
receipt=out/deliver/RECEIPT.txt
: > "$receipt"
for src in out/*.mp4; do
  name=$(basename "$src" .mp4)
  dst="out/deliver/${name}_1080x1920.mp4"
  ffmpeg -loglevel error -y -i "$src" \
    -vf "scale=in_range=full:out_range=tv,format=yuv420p" \
    -c:v libx264 -profile:v high -preset slow -crf 18 \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
    -movflags +faststart -an "$dst"
  info=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=width,height,r_frame_rate,pix_fmt,nb_frames -show_entries format=duration,size \
    -of default=nw=1:nk=0 "$dst" | tr '\n' ' ')
  echo "$(basename "$dst")  $info sha256=$(sha256sum "$dst" | cut -d' ' -f1)" | tee -a "$receipt"
done
for src in out/*.mov; do
  [ -e "$src" ] || continue
  cp "$src" out/deliver/
  info=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,pix_fmt,width,height -show_entries format=duration,size \
    -of default=nw=1:nk=0 "$src" | tr '\n' ' ')
  echo "$(basename "$src")  $info sha256=$(sha256sum "$src" | cut -d' ' -f1)" | tee -a "$receipt"
done
