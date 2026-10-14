#!/usr/bin/env bash
# Convert rendered samples to standard delivery format and write a receipt:
# H.264 High, yuv420p limited (TV) range, BT.709 tags, +faststart for phones.
# Graphics-only samples are written silent; renders with a film underneath keep
# its soundtrack (copied as is).
# Usage: scripts/finalize.sh [out/BURN-*.mp4 ...]   (default out/*.mp4, writes out/deliver/)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/deliver
receipt=out/deliver/RECEIPT.txt
[ $# -gt 0 ] || : > "$receipt"
srcs=("$@"); [ ${#srcs[@]} -gt 0 ] || srcs=(out/*.mp4)
for src in "${srcs[@]}"; do
  name=$(basename "$src" .mp4)
  dst="out/deliver/${name}_1080x1920.mp4"
  audio=(-an)
  if ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$src" | grep -q .; then audio=(-c:a copy); fi
  ffmpeg -loglevel error -y -i "$src" \
    -vf "scale=in_range=full:out_range=tv,format=yuv420p" \
    -c:v libx264 -profile:v high -preset slow -crf 18 \
    -color_primaries bt709 -color_trc bt709 -colorspace bt709 -color_range tv \
    -movflags +faststart "${audio[@]}" "$dst"
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
