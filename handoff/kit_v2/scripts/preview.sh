#!/usr/bin/env bash
# QC before a full render: H1 voice -> build -> contact sheet with the safe-zone overlay,
# one frame late in every scene (when all its FX are on screen) plus frame 0 (the hook).
# usage: KIT=.. ENGINE=.. STORIES=<dir> WORK=<dir> bash preview.sh name [name ...]
set -u
KIT=${KIT:?}; ENGINE=${ENGINE:?}; STORIES=${STORIES:-$KIT/stories}; WORK=${WORK:-$PWD/work}; mkdir -p "$WORK"
for k in "$@"; do
  W=$WORK/$k.wav; P=$WORK/proj_$k
  python3 "$KIT/scripts/pace_165.py" "$KIT/voice/$k.mp3" "$W" 1 1 < /dev/null > "$WORK/$k.pace.json" || { echo "FAIL pace $k"; continue; }
  ALIGN="$KIT/voice/$k.align.json" python3 "$KIT/scripts/build_note.py" "$STORIES/$k.json" "$W" "$P" "$KIT/motion_src" "$W.map.json" < /dev/null > "$WORK/$k.build.txt" 2>&1 || { echo "FAIL build $k"; tail -3 "$WORK/$k.build.txt"; continue; }
  grep -h WARNING "$WORK/$k.build.txt"
  TIMES=$(python3 -c "import json,sys;t=json.load(open('$P/timeline.json'));print(' '.join(['0.0']+[f'{s[\"start\"]+0.85*(s[\"end\"]-s[\"start\"]):.2f}' for s in t['scenes']]))")
  (cd "$ENGINE" && node render.js "$P" preview $TIMES --safe < /dev/null > "$WORK/$k.preview.log" 2>&1) || { echo "FAIL preview $k"; tail -3 "$WORK/$k.preview.log"; continue; }
  echo "PREVIEW $k $P/renders/preview/contact.png ($TIMES)"
done
