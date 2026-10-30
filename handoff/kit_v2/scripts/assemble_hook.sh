#!/usr/bin/env bash
# Omni Flash hook clip(s) + motion video -> one 1080x1920 30 fps video.
# The hook keeps its own sound (dialogue + ASMR); the motion part keeps the H1 voice untouched.
# usage: assemble_hook.sh out.mp4 motion.mp4 hook1.mp4[@start-end] [hook2.mp4[@start-end] ...]
#   @start-end cuts one scene out of a squeezed 3-hook run, e.g. R1.mp4@0-3.3
set -eu
OUT=$1; MOTION=$2; shift 2
IN=(); F=""; i=0
for h in "$@" "$MOTION"; do
  if [[ "$h" == *@* ]]; then r=${h##*@}; IN+=(-ss "${r%-*}" -to "${r#*-}" -i "${h%@*}"); else IN+=(-i "$h"); fi
  F+="[$i:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,setsar=1,format=yuv420p[v$i];"
  F+="[$i:a]aresample=48000,aformat=channel_layouts=stereo[a$i];"
  i=$((i+1))
done
CAT=""; for ((k=0; k<i; k++)); do CAT+="[v$k][a$k]"; done
ffmpeg -nostdin -loglevel error -y "${IN[@]}" -filter_complex "${F}${CAT}concat=n=$i:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 16 -preset medium -c:a aac -b:a 192k -movflags +faststart "$OUT"
echo "DONE $OUT $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s"
