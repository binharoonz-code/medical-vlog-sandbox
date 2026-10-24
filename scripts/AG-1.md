---
id: AG-1
topic: Disc bulge on MRI is usually normal ("Normal or Not?" #1)
status: ACTIVE
locked: false
language: EN (Gulf AR bullets drafted, not recorded)
evidence_grade: B (systematic review of prevalence studies); A for "stay active" guidance (training data, ACP 2017)
next_action: Insert the Higgsfield hook clip (needs the MP4 uploaded), then AG reviews the full preview
updated: 2026-10-24
---

# Disc bulge on MRI — usually normal

## Evidence Summary

- Brinjikji et al. 2015, *AJNR* 36(4):811–816 — systematic review, 33 studies, 3,110 people **with no back pain**. Disc bulge prevalence ~30% at age 20 → ~84% at age 80; disc degeneration 37% → 96%. Verified against the AJNR abstract on 2026-10-17. https://www.ajnr.org/content/36/4/811
- Red flags (cauda equina): saddle numbness, bladder/bowel loss, progressive leg weakness → emergency. Widely accepted (training data).
- "Stay active, avoid bed rest; no routine imaging for non-specific back pain" — ACP 2017 guideline (training data, not re-verified this session).

## Causes / Triggers

Normal age-related disc change; the bulge is often not the pain generator.

## Treatments (graded)

- **Level A:** Stay active; short-term non-drug measures (ACP 2017 — training data).
- **Level B:** —

## Story / hook (Omni Flash, Higgsfield, 4 s, 1080×1920)

- Character: Arab man, early 40s, grey t-shirt, living room, holding MRI film (start image `assets/images/D1.png`).
- Spoken line: "My MRI isn't normal! That's why my back hurts!"
- Screen text (added in edit): **MRI = PAIN?** + small "AI dramatization" tag.
- Higgsfield job `59570cb8-9b59-41b1-8e6b-6ebb4136295d`, model gemini_omni_flash_1_1, 18 credits. AG chose this version (v1) on 2026-10-24.
- Clip: https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_214329_59570cb8-9b59-41b1-8e6b-6ebb4136295d.mp4 (blocked from the cloud session; also stored in ElevenLabs asset library as `9SYlrW8PzayQ2B4DmmhS`).

## English Teleprompter (narration, ElevenLabs eleven_v4, voice "Emirati thick" czZ4QIPS4BGjseYaUp36)

Segment A (presenter on screen) + Segment B (voice over motion graphics). Tags in brackets are delivery directions for eleven_v4, not spoken.

```
[firmly] Hold on. [warmly] Your pain is real. But that bulge on your MRI? It might not be the cause. Let me show you what scans find in people with zero pain. [curious] Researchers pooled scans from over three thousand people with no back pain at all. At twenty, nearly a third already had disc bulges. By eighty... eighty-four percent. Wrinkles on the inside. [warmly] Most back pain improves when you keep moving, not when you stay in bed. [serious] But numbness between your legs, losing bladder control, or a leg getting weaker? That's an emergency. Come to the ER today.
```

- 96 words. Take 1: 31.3 s speech (184 WPM). **Take 2 (used in preview): 31.9 s (181 WPM)** — above the 165 WPM target; AG said the voices are good (2026-10-24) but did not rule on the pace.
- Files: `audio/disc_take1.mp3` (sha256 854ccb6e…), `audio/disc_take2.mp3` (2ca860b1…).

## Gulf Arabic Teleprompter

- لحظة! بصراحة… خلني أوريك شي
- دراسة جمعت أكثر من ٣ آلاف شخص ما عندهم أي ألم ظهر
- ثلث اللي عمرهم ٢٠ عندهم disc bulge… ولين عمر ٨٠ توصل ٨٤٪
- ألمك حقيقي، بس الـ bulge يمكن مب هو السبب… والحركة أحسن من الرقاد
- بس خدر بين الرجلين، ما تقدر تتحكم في البول، أو ضعف في الرجل؟ تعال الطوارئ فوراً

(Draft only. AG's rules: Arabic narration = AG's own recording, not TTS.)

## B-Roll Plan (motion graphics, rendered locally by `motion/render.py`, scene list `VIDEOS["disc"]`)

| Scene | Image | On screen |
|---|---|---|
| 1 | D3 (group) | MRI SCANS OF · 3,110 · PEOPLE WITH ZERO BACK PAIN |
| 2 | D4 (young spine) | AGE 20 · 30% · ALREADY HAVE A DISC BULGE |
| 3 | D5 (old spine) | AGE 80 · 84% · bars 20→30%, 80→84% |
| 4 | D6 (disc cross-section) | NO PAIN · WRINKLES ON THE INSIDE |
| 5 | D7 (padel grandfather) | KEEP MOVING · MOVEMENT BEATS BED REST |
| 6a–c | D8, D9, D10 | RED FLAG 1/3–3/3: numbness between legs, losing bladder control, a leg getting weaker |
| 7 | G10 (ambulance) | EMERGENCY · COME TO THE ER TODAY |
| End | plate | NORMAL OR NOT? · Send this to someone with back pain |

## Current outputs

- `motion/out/disc_preview_REVIEW.mp4` — 35.7 s, 1080×1920: still presenter 0–9.71 s → graphics to 33.07 s → end card. **No hook yet.** REVIEW ONLY.
- `motion/out/disc_motion_EN.mp4` — silent graphics, placeholder timing (29.4 s).

## Feedback

- 2026-10-24 AG: voices are good; use v1 hook; HeyGen skipped for now (still photo placeholder).
