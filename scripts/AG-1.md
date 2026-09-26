---
id: AG-1
topic: N08 Fruit versus Juice — why eat whole fruit instead of drinking juice
status: APPROVED
locked: true
language: EN
evidence_grade: pending
next_action: AG to confirm the approved Drive master (connector cannot fetch >10 MB) and watch the 2026-09-26 HD reconstruction candidate; publish only on AG's instruction
updated: 2026-09-26
---

# Fruit versus Juice (episode N08)

The final was approved on 25 September 2026. It is filed at Drive → Final Videos → Ready to Publish → English → `N08_Fruit-vs-Juice_EN_1080p_FINAL.mp4` (id `17n9ZAO3xifsDdGKNq6ZGuXCtKHcp15gC`, owner-only). It has **not** been published or scheduled.

## Evidence Summary

Not supplied in the N08 execution handoff. This record asserts no clinical guideline clearance.

## Causes / Triggers

Not applicable to this episode; none supplied.

## Treatments (graded)

- **Level A:** not supplied
- **Level B:** not supplied

## English Teleprompter (approved; 83 words, narration 29.675 s ≈ 168 WPM)

```
Why do I recommend eating fruit instead of drinking juice?

Because juicing removes much of the fiber, one of the most valuable parts.

Blending is different. If you keep the whole fruit, you keep the fiber.

Now picture the fruit that went into your glass. One glass can contain several fruits. Easy to drink quickly. Eating them whole takes more time and chewing, and generally leaves you feeling fuller.

That's why juice isn't an equal replacement for whole fruit.

Stop drinking your food.
```

Preserve "much of", "one of", "can", "generally" and "equal". Never restore the old wording that said blending removes fiber.

## Gulf Arabic Teleprompter

- Not part of this deliverable. The N08 handoff excludes an Arabic adaptation.

## B-Roll Plan

Locked 30 fps edit with exclusive frame out points. All source audio is muted, and the narration runs once, continuously.

| Frames | Time (s) | Picture | Speech / meaning |
|---|---|---|---|
| 0–57 | 0.000–1.900 | A1_SIP | Opening question |
| 57–111 | 1.900–3.700 | A2_EAT | Contrast with eating fruit |
| 111–123 | 3.700–4.100 | A4_FOUR_ORANGES | Brief glass/fruit visual |
| 123–177 | 4.100–5.900 | B1_PRESS | "Because juicing removes much of the fiber" |
| 177–237 | 5.900–7.900 | PULP_GOLD_LOSS (+SFX) | "fiber, one of the most valuable parts" |
| 237–257 | 7.900–8.567 | B4_SEGMENTS | Transition to whole-fruit blending |
| 257–312 | 8.567–10.400 | Presenter, source 0–1.85 | "Blending is different." |
| 312–342 | 10.400–11.400 | B3_PEEL | "If you keep the whole fruit" |
| 342–369 | 11.400–12.300 | B4_SEGMENTS | Retained fruit into blender |
| 369–399 | 12.300–13.300 | B5_PULPY_BLEND | "you keep the fiber" |
| 399–479 | 13.300–15.967 | Presenter, source 1.85–4.50 | "Now picture the fruit that went into your glass." |
| 479–498 | 15.967–16.600 | A4_FOUR_ORANGES | "One glass" |
| 498–554 | 16.600–18.467 | GLASS_THOUGHT_BUBBLE (+SFX) | "can contain several fruits" |
| 554–601 | 18.467–20.033 | A1_SIP | "Easy to drink quickly." |
| 601–652 | 20.033–21.733 | A2_EAT | "Eating them whole takes more time" |
| 652–673 | 21.733–22.433 | B3_PEEL | "and chewing" |
| 673–732 | 22.433–24.400 | A3_SATISFIED | "generally leaves you feeling fuller" |
| 732–825 | 24.400–27.500 | Presenter, source 4.50–7.60 | "That's why juice isn't an equal replacement for whole fruit." |
| 825–855 | 27.500–28.500 | PHONE_LIGHTBULB_TICK (+SFX) | "Stop drinking" |
| 855–891 | 28.500–29.700 | ENDING_FRUIT_JUICE_X (+SFX) | "your food." |

Accuracy guardrails:

- Blending is never shown as removing fiber.
- The four oranges are illustrative, not a measured yield.
- The lightbulb is an understanding metaphor.
- The red X sits on extracted juice, not on blending.

## Production Record

- **Voice:** HeyGen "abdulla" synthesized clone `1a7ea23a092f4b1da1bff7941075a995`, the untouched original, chosen over the warm, thick/crisp and ElevenLabs experiments. It is not AG's own recorded performance.
- **Presenter:** HeyGen Avatar IV render `3beebf503b0e47b4a6b774a5c67dcbc5`. Look `c132d27be4034ba7a3cc2ac510523b02` (glasses, black T-shirt, podcast desk), group `4223b98ec44247c69af68c172e210005`. 7.577 s long, three inserts.
- **B-roll:** two 10 s Google Flow Omni 1.1 Flash montages (720p originals plus vendor 1080p upscales), with four local 2D effects.
- **Historical allocated cost:** HeyGen 2 credits ≈ AED 0.36, Flow 30 credits ≈ AED 1.10, total ≈ AED 1.46. Incremental cash was AED 0.

### 2026-09-26 HD reconstruction candidate (Claude Code cloud session)

- **Why:** the Drive connector refuses files over 10 MB, so the approved 22.4 MB master could not be downloaded or inspected. Status for that step: **BLOCKED**.
- **Built from:** only the sources on Drive that are under 10 MB. Every SHA-256 matches `N08_R6_SHOT_LIST_R6.json`.
- **Output:** `N08_Fruit-vs-Juice_EN_1080p_RECON_CANDIDATE_2026-09-26.mp4`, 22,914,805 bytes, SHA-256 `696a27f53e10319745a548d03dc361789181483ae6dab9177ebcac159372fbde`. Delivered privately in-session. It is **not** placed in Drive and does **not** replace the approved master.
- **Specs:**
  - Video: 1080×1920, 30 fps constant, 891 frames, 29.700 s, H.264 High.
  - Audio: AAC-LC 48 kHz mono.
  - Fast-start layout, no captions.
- **Checks passed:**
  - The full decode is clean, with no black frames or freezes.
  - All 19 cuts land on the locked frames.
  - **83/83 words** come back in order on local Whisper small.en.
  - The audio nulls at **−60.1 dB** against the approved "A — Original" mix (`A_Original_00m00-00m29p700.wav`).
  - Loudness: −19.9 LUFS, true peak −0.7 dBFS, no clipping.
  - Presenter audio alignment shows the video 40/23/23 ms behind the narration.
  - Presenter identity and effect placement were confirmed on sampled frames.
- **Known differences from the approved master:**
  - The four effect shots are 720p R5B clips upscaled; the higher-resolution `quality_r8/effects_r5b` set is not on Drive.
  - HD cuts were rebuilt by frame-matching the R4 cuts to the upscaled montages (mean MSE 1.3–3.3/255), because `CUTS_1080_PROVENANCE.json` is not on Drive.
- **Status:** **GENERATED BUT UNVERIFIED**. There has been no real-time watch-and-listen or perceptual lip-sync approval.
- **New credits / AED:** 0 / 0.
- **Open items:**
  - Confirm the approved master once it can be read in-session.
  - Identify the separate 22,373,165-byte `Downloads/N08_Fruit-vs-Juice_EN_1080p_FINAL.mp4`; its contents are unknown.
  - A human phone watch, with attention to lip-sync at 8.57 s, 13.30 s and 24.40 s.

HD cut in-points recovered in the upscaled 24 fps montages (montage frame range, cut frames at 25 fps):

| Cut | Montage | Frames | Cut frames |
|---|---|---|---|
| A1_SIP | A | 0–46 | 48 |
| A2_EAT | A | 47–94 | 49 |
| A3_SATISFIED | A | 95–143 | 50 |
| A4_FOUR_ORANGES | A | 144–189 | 48 |
| B1_PRESS | B | 0–45 | 47 |
| B3_PEEL | B | 94–142 | 50 |
| B4_SEGMENTS | B | 143–190 | 49 |
| B5_PULPY_BLEND | B | 210–239 | 31 |

<details><summary>Assembler used: <code>build_n08_hd_reconstruction.py</code> (local FFmpeg; run as <code>python build_n08_hd_reconstruction.py &lt;drive_dir&gt; &lt;out_dir&gt;</code>)</summary>

```python
"""N08 Fruit vs Juice — HD reconstruction candidate. Local FFmpeg only: no network, generation or vendor charges.

Rebuilds the locked 891-frame R6 edit (SHOT_LIST_R6.json) from existing Drive assets:
  * B-roll: vendor-upscaled 1080p Flow montages. Each R4 720p cut is located frame-by-frame inside the
    matching HD montage, and an HD cut with the same frame content is built (stand-in for the missing
    quality_r8/cuts + CUTS_1080_PROVENANCE.json).
  * Presenter: N08_R6_PRESENTER_ORIGINAL.mp4 (native 1080p HeyGen Avatar IV), source audio muted.
  * Effects: N08_R5B_* clips (720p; the higher-resolution quality_r8/effects_r5b set was not available),
    upscaled to 1080x1920. Their audio is used ONLY to derive the four SFX, with the R6 recipe.
  * Audio: untouched narration master once from t=0 + four SFX at frames 177/498/825/855. No EQ, no
    normalisation, no retiming. Narration resampled 44.1k -> 48k (soxr) to match the approved A mix.
Per-shot trim/rate/fps/tpad logic is copied from N08_R6_assemble_episode.py. Inputs are read-only.

usage: python build_n08_hd_reconstruction.py <drive_dir> <out_dir>
"""
import hashlib, json, subprocess, sys
from pathlib import Path
import numpy as np

DRIVE, OUT = Path(sys.argv[1]), Path(sys.argv[2])
WORK = OUT / 'work'; HDCUTS = WORK / 'hd_cuts'; SEG = WORK / 'segments'; SFXD = WORK / 'sfx'
for d in (HDCUTS, SEG, SFXD): d.mkdir(parents=True, exist_ok=True)
FPS, SR, TOTAL_FRAMES = 30, 48000, 891
FINAL = OUT / 'N08_Fruit-vs-Juice_EN_1080p_RECON_CANDIDATE_2026-09-26.mp4'
MONTAGE = {'A': DRIVE / 'N08_A_HUMAN_FLOW_1080_UPSCALED.mp4', 'B': DRIVE / 'N08_B_FOOD_FLOW_1080_UPSCALED.mp4'}
PRESENTER = DRIVE / 'N08_R6_PRESENTER_ORIGINAL.mp4'
NARRATION = DRIVE / 'N08_R6_ABDULLA_SYNTHESIZED_NARRATION.wav'   # sample-identical decode of the untouched MP3

# Locked R6 rows: (shot, frame_in, frame_out_exclusive, source, source_in, source_out, spoken, has_sfx)
ROWS = [
 ('01',0,57,'A1_SIP',0,1.90,'Why do I recommend eating fruit instead of drinking juice?',False),
 ('02',57,111,'A2_EAT',0,1.80,'eating fruit instead of drinking juice',False),
 ('03',111,123,'A4_FOUR_ORANGES',0,.40,'juice',False),
 ('04',123,177,'B1_PRESS',0,1.80,'Because juicing removes much of the fiber',False),
 ('05',177,237,'PULP_GOLD_LOSS',0,2.00,'fiber, one of the most valuable parts',True),
 ('06',237,257,'B4_SEGMENTS',0,1.00,'valuable parts',False),
 ('07',257,312,'PRESENTER',0,1.85,'Blending is different.',False),
 ('08',312,342,'B3_PEEL',0,2.00,'If you keep the whole fruit',False),
 ('09',342,369,'B4_SEGMENTS',0,1.80,'keep the whole fruit',False),
 ('10',369,399,'B5_PULPY_BLEND',0,1.25,'you keep the fiber',False),
 ('11',399,479,'PRESENTER',1.85,4.50,'Now picture the fruit that went into your glass.',False),
 ('12',479,498,'A4_FOUR_ORANGES',0,.633333333,'One glass',False),
 ('13',498,554,'GLASS_THOUGHT_BUBBLE',0,1.958333333,'can contain several fruits',True),
 ('14',554,601,'A1_SIP',0,1.958333333,'Easy to drink quickly',False),
 ('15',601,652,'A2_EAT',0,2.00,'Eating them whole takes more time',False),
 ('16',652,673,'B3_PEEL',.40,1.80,'and chewing',False),
 ('17',673,732,'A3_SATISFIED',0,2.041666667,'generally leaves you feeling fuller',False),
 ('18',732,825,'PRESENTER',4.50,7.60,"That's why juice isn't an equal replacement for whole fruit.",False),
 ('19',825,855,'PHONE_LIGHTBULB_TICK',0,2.041666667,'Stop drinking',True),
 ('20',855,891,'ENDING_FRUIT_JUICE_X',0,2.50,'your food',True),
]
BROLL = ['A1_SIP', 'A2_EAT', 'A3_SATISFIED', 'A4_FOUR_ORANGES', 'B1_PRESS', 'B3_PEEL', 'B4_SEGMENTS', 'B5_PULPY_BLEND']


def run(args):
    p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-nostdin', *map(str, args)], capture_output=True)
    if p.returncode: raise RuntimeError(p.stderr.decode())
    return p.stdout


def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()


def gray(path, w=72, h=128):
    b = run(['-i', path, '-vf', f'scale={w}:{h}:flags=area,format=gray', '-f', 'rawvideo', '-'])
    return np.frombuffer(b, np.uint8).reshape(-1, h, w).astype(np.float32)


def tempo(rate):
    parts = []
    while rate > 2: parts.append('atempo=2'); rate /= 2
    while rate < .5: parts.append('atempo=0.5'); rate /= .5
    parts.append(f'atempo={rate:.10f}')
    return ','.join(parts)


def build_hd_cuts():
    """Locate every R4 cut frame in the HD montage; write a 25 fps HD cut with the same frame content."""
    prov, mont = {}, {k: gray(v) for k, v in MONTAGE.items()}
    for name in BROLL:
        r4 = DRIVE / f'N08_R4_{name}.mp4'; cut = gray(r4); M = mont[name[0]]; k = np.arange(len(cut))
        best = min(((np.mean((M[np.floor((t + k / 25) * 24 + 1e-6).astype(int)] - cut) ** 2), t)
                    for t in np.arange(0, 10, 1 / 96) if np.floor((t + k[-1] / 25) * 24 + 1e-6) < len(M)))
        t0, idx, errs = best[1], [], []
        for j in k:   # refine each frame within +-2 source frames of the fitted model
            c = int(np.floor((t0 + j / 25) * 24 + 1e-6))
            cand = [i for i in range(c - 2, c + 3) if 0 <= i < len(M)]
            e = [float(np.mean((M[i] - cut[j]) ** 2)) for i in cand]
            idx.append(cand[int(np.argmin(e))]); errs.append(min(e))
        sel = '+'.join(f'eq(n\\,{i})' for i in sorted(set(idx)))
        uniq = run(['-i', MONTAGE[name[0]], '-vf', f'select={sel},format=yuv420p', '-fps_mode', 'passthrough',
                    '-f', 'rawvideo', '-'])
        fsz = 1080 * 1920 * 3 // 2; frames = {i: uniq[n * fsz:(n + 1) * fsz] for n, i in enumerate(sorted(set(idx)))}
        out = HDCUTS / f'{name}.mp4'
        p = subprocess.Popen(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'yuv420p',
                              '-s', '1080x1920', '-r', '25', '-i', '-', '-c:v', 'libx264', '-qp', '0', '-preset', 'veryfast',
                              '-pix_fmt', 'yuv420p', str(out)], stdin=subprocess.PIPE)
        for i in idx: p.stdin.write(frames[i])
        p.stdin.close(); assert p.wait() == 0
        prov[name] = dict(r4_cut=r4.name, r4_sha256=sha(r4), hd_montage=MONTAGE[name[0]].name, hd_montage_sha256=sha(MONTAGE[name[0]]),
                          fitted_montage_start_s=round(float(t0), 4), montage_frame_indices_24fps=idx,
                          match_mse_gray_0_255=dict(mean=round(float(np.mean(errs)), 2), max=round(float(np.max(errs)), 2)),
                          frames=len(idx), fps=25)
    (OUT / 'HD_CUTS_RECON_PROVENANCE.json').write_text(json.dumps(prov, indent=1))


def build_segments():
    shots = []
    for sid, fi, fo, name, si, so, phrase, has_sfx in ROWS:
        is_presenter = name == 'PRESENTER'
        source = PRESENTER if is_presenter else (DRIVE / f'N08_R5B_{name}.mp4' if has_sfx else HDCUTS / f'{name}.mp4')
        n = fo - fi; dur = n / FPS; rate = (so - si) / dur
        timing = 'setpts=PTS-STARTPTS' if is_presenter else f'setpts=(PTS-STARTPTS)/{rate:.10f}'
        vf = (f'trim=start={si}:end={so},{timing},scale=1080:1920:force_original_aspect_ratio=decrease:flags=lanczos,'
              f'pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1,fps={FPS},tpad=stop_mode=clone:stop_duration=0.2,'
              f'trim=end_frame={n},format=yuv420p')
        run(['-y', '-i', source, '-vf', vf, '-an', '-frames:v', n, '-c:v', 'libx264', '-qp', '0', '-preset', 'veryfast', SEG / f'{sid}.mp4'])
        if has_sfx:
            run(['-y', '-i', source, '-af', f'atrim=start={si}:end={so},asetpts=PTS-STARTPTS,{tempo(rate)},volume=0.18,apad,atrim=duration={dur}',
                 '-vn', '-ar', SR, '-ac', '1', SFXD / f'{sid}_sfx.wav'])
        shots.append(dict(shot_id=sid, spoken_phrase=phrase, timeline_frame_in=fi, timeline_frame_out=fo, timeline_in=fi / FPS,
                          timeline_out=fo / FPS, source=name, source_file=source.name, source_in=si, source_out=so,
                          playback_rate=1.0 if is_presenter else rate,
                          layout='presenter' if is_presenter else ('effect (720p upscaled)' if has_sfx else 'full-frame HD B-roll'),
                          sound='narration continuous; source muted' + ('; SFX from effect clip x0.18' if has_sfx else '')))
    return shots


def build_audio():
    nar = np.frombuffer(run(['-i', NARRATION, '-af', 'aresample=resampler=soxr', '-ar', SR, '-ac', '1', '-f', 'f32le', '-']), np.float32)
    n = round(TOTAL_FRAMES / FPS * SR); mix = np.zeros(n, np.float64); mix[:min(n, len(nar))] += nar[:n]
    for sid, fi, *_, has_sfx in ROWS:
        if not has_sfx: continue
        s = np.frombuffer(run(['-i', SFXD / f'{sid}_sfx.wav', '-f', 'f32le', '-']), np.float32)
        o = round(fi / FPS * 1000) * SR // 1000; m = min(len(s), n - o); mix[o:o + m] += s[:m]
    peak = float(np.abs(mix).max())
    assert peak < 0.98, 'R6 limiter (0.98) would engage; review before export'
    wav = WORK / 'mix_48k_f32.wav'
    p = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-',
                        '-c:a', 'pcm_f32le', str(wav)], input=mix.astype(np.float32).tobytes())
    assert p.returncode == 0
    return wav, peak


def main():
    build_hd_cuts()
    shots = build_segments()
    wav, peak = build_audio()
    listing = WORK / 'concat.txt'; listing.write_text(''.join(f"file 'segments/{r[0]}.mp4'\n" for r in ROWS))
    picture = WORK / 'picture_only_lossless.mp4'
    run(['-y', '-f', 'concat', '-safe', '0', '-i', listing, '-c', 'copy', picture])
    run(['-y', '-i', picture, '-i', wav, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
         '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-g', '60', '-r', FPS, '-fps_mode', 'cfr', '-c:a', 'aac', '-b:a', '192k',
         '-ar', SR, '-ac', '1', '-frames:v', TOTAL_FRAMES, '-t', TOTAL_FRAMES / FPS, '-movflags', '+faststart', FINAL])
    (OUT / 'SHOT_LIST_RECON.json').write_text(json.dumps(dict(
        fps=FPS, export_resolution='1080x1920', total_frames=TOTAL_FRAMES, narration=NARRATION.name, mix_peak=peak,
        limiter='R6 alimiter(0.98) omitted: mix peak below threshold, so it would be inactive',
        source_disclosure='Presenter native 1080p (25 fps). B-roll: vendor 1080p upscales of 720p Flow originals (24 fps). '
                          'Effects: 720p R5B clips upscaled locally (lanczos). Output converted to 30 fps CFR.',
        shots=shots), indent=1))
    print('built', FINAL)


if __name__ == '__main__':
    main()
```

</details>

## Feedback

(Only section that may be edited when locked: true)
