#!/usr/bin/env bash
# Rebuild every agreed video from the kit with the LOCKED H1 voice method.
# usage: KIT=<path to handoff/kit_v2> ENGINE=<path to video-ad-editor/video-ad-editor/motion> OUT=<out dir> bash make_all.sh [name ...]
# needs: python3, node (+ engine npm deps: puppeteer-core), ffmpeg, Chrome/Chromium in $CHROME
set -u
KIT=${KIT:?}; ENGINE=${ENGINE:?}; OUT=${OUT:-$PWD/out}; WORK=${WORK:-$PWD/work}; mkdir -p "$OUT" "$WORK"
NAMES=${*:-"T2_three T3_free T4_quiz M1_stop M2_exam M3_pov M4_trend MRI5_twist MRI6_doctor PEP4_three Kill_Testosterone Magnesium_montage T6_fitness"}
for k in $NAMES; do
  W=$WORK/$k.wav; P=$WORK/proj_$k
  # 1) LOCKED voice method: shorten silences to 0.08 s only. No speed change, no loudness change.
  python3 "$KIT/scripts/pace_165.py" "$KIT/voice/$k.mp3" "$W" 1 1 < /dev/null > "$WORK/$k.pace.json" || { echo "FAIL pace $k"; continue; }
  # 2) build the project (exact word timing from the alignment)
  ALIGN="$KIT/voice/$k.align.json" python3 "$KIT/scripts/build_note.py" "$KIT/stories/$k.json" "$W" "$P" "$KIT/motion_src" "$W.map.json" < /dev/null > "$WORK/$k.build.txt" 2>&1 || { echo "FAIL build $k"; tail -3 "$WORK/$k.build.txt"; continue; }
  grep -h WARNING "$WORK/$k.build.txt"
  # 3) render 1080x1920 frames -> video
  (cd "$ENGINE" && node render.js "$P" all --fresh < /dev/null > "$WORK/$k.render.log" 2>&1) || { echo "FAIL render $k"; continue; }
  # 4) mux with the voice; hold the last frame 0.3 s so the video never cuts the voice
  ffmpeg -nostdin -loglevel error -y -i "$P/renders/video.mp4" -i "$W" -map 0:v -map 1:a -vf tpad=stop_mode=clone:stop_duration=0.3 \
    -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT/$k.mp4" && rm -rf "$P/renders/frames"
  echo "DONE $k video $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$k.mp4") audio $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$W")"
done
