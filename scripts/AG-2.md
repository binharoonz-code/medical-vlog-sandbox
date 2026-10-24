---
id: AG-2
topic: Torn meniscus on MRI is often painless ("Normal or Not?" #2)
status: ACTIVE
locked: false
language: EN (Gulf AR bullets drafted, not recorded)
evidence_grade: B (cohort, prevalence); A for sham-surgery and physio trials (training data)
next_action: Insert the Higgsfield hook clip (needs the MP4 uploaded), then AG reviews the full preview
updated: 2026-10-24
---

# Torn meniscus — often painless

## Evidence Summary

- Englund et al. 2008, *NEJM* (Framingham, 991 community adults aged 50–90): meniscal tear/damage 19% (women 50–59) to 56% (men 70–90); **61% of people with a tear had no pain, aching or stiffness in the past month.** Verified 2026-10-17 via PMC2897006 and AAFP journal club.
- Sihvonen 2013 *NEJM*: arthroscopic partial meniscectomy no better than sham surgery for degenerative tears (training data, Level A).
- Katz 2013 *NEJM*: physio similar to surgery (training data, Level A).

## Causes / Triggers

Age-related (degenerative) meniscal wear; finding often unrelated to symptoms.

## Treatments (graded)

- **Level A:** Exercise therapy/physiotherapy first for degenerative tears; arthroscopy not superior to sham (training data).
- **Level B:** —
- Red flags: knee that locks and won't straighten; rapid swelling after injury → urgent review.

## Story / hook (Omni Flash, Higgsfield, 4 s, 1080×1920)

- Character: grey-bearded Arab man, late 60s, white kandura + ghutra, cream sofa (start image `assets/images/M1.png`).
- Spoken line: "I have a torn meniscus. That's why my knee hurts!"
- Screen text: **TORN = PAIN?** + "AI dramatization" tag.
- Higgsfield job `270dfd45-f879-494c-ba39-b81f2dd51805`, 18 credits. AG chose v1 on 2026-10-24.
- Clip: https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_214331_270dfd45-f879-494c-ba39-b81f2dd51805.mp4 (ElevenLabs asset `PePHYkGyr7gAYYF7AaBX`).

## English Teleprompter (ElevenLabs eleven_v4, voice czZ4QIPS4BGjseYaUp36)

```
[playfully] Maybe. Maybe not. [warmly] A tear on your scan doesn't automatically explain your pain. And the surgery so many people rush into? Look at what the research found. [curious] Researchers scanned the knees of nearly a thousand regular adults over fifty. More than half of the men over seventy had a torn meniscus. Six out of ten people with a tear had no knee pain that month. For wear-and-tear tears, real keyhole surgery was tested against fake surgery. [short pause] Same results. That's why physio usually comes first. [serious] But a knee that locks, or swells fast after an injury? Get checked urgently.
```

- 98 words. Take 1: 33.8 s (174 WPM). **Take 2 (used): 34.9 s (169 WPM).**
- Files: `audio/meniscus_take1.mp3` (12a1de49…), `audio/meniscus_take2.mp3` (2cd060db…).

## Gulf Arabic Teleprompter

- يمكن… ويمكن لا! بصراحة
- دراسة على حوالي ألف شخص فوق الخمسين: أكثر من نص الرياييل فوق السبعين عندهم تمزق
- و٦ من كل ١٠ عندهم تمزق… ما حسوا بأي ألم آخر شهر
- دراسة مشهورة قارنت عملية المنظار بعملية "وهمية"… نفس النتيجة، عشان جي العلاج الطبيعي أول خطوة
- بس إذا الركبة تقفل وما تنفرد، أو تنتفخ بسرعة بعد إصابة… راجع بسرعة

## B-Roll Plan (`VIDEOS["meniscus"]` in `motion/render.py`)

| Scene | Image | On screen |
|---|---|---|
| 1 | M3 (older adults) | KNEE MRIs OF · 991 · REGULAR ADULTS · AGE 50–90 |
| 2 | M4 (gardener) | MEN AGED 70–90 · 56% · HAD A TORN MENISCUS |
| 3 | M5 blurred | PEOPLE WITH A TEAR · 10-icon grid (6 ✓ / 4 !) · 6 IN 10: NO KNEE PAIN |
| 4–5 | plate | WEAR-AND-TEAR TEARS · REAL KEYHOLE SURGERY vs FAKE SURGERY · SAME RESULTS |
| 6 | M8 (physio) | PHYSIO FIRST |
| 7a–c | M9, M10 | RED FLAG 1/2 locks · 2/2 swells fast · GET CHECKED URGENTLY |
| End | plate | NORMAL OR NOT? · Send this to someone with knee pain |

Known issue: M9 and M10 still show non-Arab people (AG's rule: Arab characters). Regenerate in the next 2×2 grid.

## Current outputs

- `motion/out/meniscus_preview_REVIEW.mp4` — 37.5 s: still 0–10.20 s → graphics to 34.85 s → end card. No hook yet.
- `motion/out/meniscus_motion_EN.mp4` — silent graphics, placeholder timing.

## Feedback

- 2026-10-24 AG: voices good; v1 hook; still-photo presenter for now.
