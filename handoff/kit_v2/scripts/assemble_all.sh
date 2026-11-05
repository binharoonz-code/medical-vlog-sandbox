#!/usr/bin/env bash
# Assemble the 12 Arabic videos: hook scene (final cut map, QC_HOOKS_2026-11-01.md) + overlay (headline + spoken-line caption) + motion video.
# usage: bash assemble_all.sh <kit> <hooks dir> <motion dir> <out dir>     (motion dir = out/reference or out/scratch)
set -u
KIT=$1; HK=$2; MO=$3; OUT=$4; mkdir -p "$OUT"; S=$KIT/scripts
declare -A MAP=(
  [Kill_Testosterone]="HOOK5_R1b.mp4@0-3.30" [T2_three]="HOOK5_R1.mp4@3.30-6.62" [T3_free]="HOOK5_R1.mp4@6.62-10"
  [T4_quiz]="HOOK5_R2.mp4@0-3.30" [Magnesium_montage]="HOOK5_R2.mp4@3.30-6.62" [M1_stop]="HOOK5_R2.mp4@6.62-10"
  [M2_exam]="HOOK5_R3b.mp4@0-3.30" [M3_pov]="HOOK5_R3b.mp4@3.30-6.48" [M4_trend]="HOOK5_R3b.mp4@6.48-10"
  [MRI5_twist]="HOOK5_R4.mp4@0-3.30" [MRI6_doctor]="HOOK5_R4.mp4@3.30-6.68" [PEP4_three]="HOOK5_R4.mp4@6.68-10" )
for n in Kill_Testosterone T2_three T3_free T4_quiz Magnesium_montage M1_stop M2_exam M3_pov M4_trend MRI5_twist MRI6_doctor PEP4_three; do
  for i in $(seq 1 120); do [ -s "$MO/$n.mp4" ] && break; sleep 10; done   # wait for the motion render
  [ -s "$MO/$n.mp4" ] || { echo "MISSING motion $n"; continue; }
  sleep 3   # let ffmpeg finish writing
  spec=${MAP[$n]}; r=${spec##*@}; a=${r%-*}; b=${r#*-}
  HEADLINE=$KIT/overlays/$n.png bash "$S/assemble_hook.sh" "$OUT/$n.mp4" "$MO/$n.mp4" "$HK/${spec%@*}@$r" </dev/null || { echo "FAIL $n"; continue; }
  m=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MO/$n.mp4"); o=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$n.mp4")
  python -c "import sys;h=$b-$a;m=$m;o=$o;print(f'QC-D $n hook={h:.2f} motion={m:.2f} expected={h+m:.2f} got={o:.2f} delta={o-h-m:+.2f}', 'OK' if abs(o-h-m)<=0.1 else 'LENGTH-FAIL')"
  # join check frames: 0, hook end -1 frame, hook start of motion, +0.5 s
  hf=$(python -c "print(int(round(($b-$a)*30)))")
  ffmpeg -nostdin -v error -y -i "$OUT/$n.mp4" -vf "select='eq(n\,0)+eq(n\,$((hf-1)))+eq(n\,$hf)+eq(n\,$((hf+15)))',scale=270:-1,tile=4x1" -fps_mode vfr "$OUT/${n}_join.jpg" </dev/null
done
echo ALL-DONE
