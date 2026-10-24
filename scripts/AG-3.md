---
id: AG-3
topic: Silent gallstones rarely need surgery ("Normal or Not?" #3)
status: ACTIVE
locked: false
language: EN (Gulf AR bullets drafted, not recorded)
evidence_grade: B (large cohort); guideline position = training data
next_action: Insert the Higgsfield hook clip (needs the MP4 uploaded), then AG reviews the full preview
updated: 2026-10-24
---

# Silent gallstones — watch, don't remove

## Evidence Summary

- Morris-Stiff et al. 2023 cohort, 22,257 people with incidental (silent) gallstones: ~2%/year developed symptoms; cumulative 10.1% at 5 y, 21.5% at 10 y, 32.6% at 15 y → ~8 in 10 still symptom-free at 10 years. Higher risk: female sex, younger age, multiple stones, stones >9 mm, polyps. Verified via secondary summaries on 2026-10-17 (Guts and Growth summary; AAFP clinical inquiry). Primary paper not opened.
- Correction recorded: an earlier claim "~80% of gallstones never cause symptoms" was **not supported** and was replaced.
- Guidelines (e.g. EASL 2016) generally advise against surgery for silent stones — training data, not re-verified.

## Causes / Triggers

Incidental finding on imaging done for another reason.

## Treatments (graded)

- **Level B:** Watchful waiting for asymptomatic stones; individual decision with doctor for higher-risk groups.
- Red flags: right upper abdominal pain >30 min, fever, yellow eyes → ER.

## Story / hook (Omni Flash, Higgsfield, 4 s, 1080×1920)

- Character: Arab woman, early 40s, black abaya + shayla, bright kitchen (start image `assets/images/G1.png` — the regenerated grid panel showing a **gallbladder** scan, not a pregnancy scan).
- Spoken line: "I have gallstones! I need them removed!"
- Screen text: **SURGERY? WAIT.** + "AI dramatization" tag.
- Higgsfield job `8e30672a-e854-4f25-a1fe-fc2c0fb338b3`, 18 credits. AG chose v1 on 2026-10-24.
- Clip: https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_215414_8e30672a-e854-4f25-a1fe-fc2c0fb338b3.mp4 (ElevenLabs asset `L16JYARZR9Z7yd0ibSrG`).

## English Teleprompter (ElevenLabs eleven_v4, voice czZ4QIPS4BGjseYaUp36)

```
[calmly] Not so fast. Were they found by accident, with no pain? Surgery isn't automatic. Here's what usually happens to stones like yours. [curious] In a study of over twenty-two thousand people with silent gallstones, only about two percent a year developed symptoms. After ten years, roughly eight out of ten still had no symptoms. That's why guidelines usually say watch, don't remove. Women, younger people, and anyone with many or large stones carry higher risk, so decide with your doctor. [serious] But pain under your right ribs lasting more than half an hour, fever, or yellow eyes? Come to the ER.
```

- 99 words. **Take 1 (used): 36.1 s (165 WPM).** Take 2: 36.8 s (162 WPM).
- Files: `audio/gallstones_take1.mp3` (bb32b931…), `audio/gallstones_take2.mp3` (300cfa59…).

## Gulf Arabic Teleprompter

- لا تستعجلين! بصراحة… لقوها بالصدفة وما عندج ألم؟
- دراسة على أكثر من ٢٢ ألف شخص جذي: بس حوالي ٢٪ في السنة تبدأ عندهم أعراض
- بعد ١٠ سنين، تقريباً ٨ من كل ١٠ بعدهم ما عندهم أي مشكلة
- الحريم، الأصغر في العمر، واللي عندهم حصى وايد أو كبيرة… خطرهم أعلى، قرري مع دكتورج
- بس ألم تحت الضلوع اليمين أكثر من نص ساعة، حرارة، أو صفار في العيون… تعالي الطوارئ

## B-Roll Plan (`VIDEOS["gallstones"]` in `motion/render.py`)

| Scene | Image | On screen |
|---|---|---|
| 1 | G3 (ultrasound) | A STUDY OF · 22,257 · PEOPLE WITH SILENT GALLSTONES |
| 2 | G5 (woman in pain) | EACH YEAR, ONLY · ~2% · DEVELOPED SYMPTOMS |
| 3 | G3 blurred | 10 YEARS LATER · grid 8 ✓ / 2 ! · 8 IN 10: STILL NO SYMPTOMS |
| 4 | G4 (calm, tea) | WATCH, DON'T REMOVE · WHAT GUIDELINES USUALLY ADVISE |
| 5 | plate | HIGHER RISK · WOMEN · YOUNGER PEOPLE · MANY OR LARGE STONES · → DECIDE WITH YOUR DOCTOR |
| 6a–c | G7 (mirrored), G8, G9 | RED FLAG 1/3–3/3: right-rib pain 30+ min · fever · yellow eyes |
| 7 | G10 | COME TO THE ER |
| End | plate | NORMAL OR NOT? · Send this to someone with gallstones |

G6 rejected (tablet showed a fetal scan); not used.

## Current outputs

- `motion/out/gallstones_preview_REVIEW.mp4` — 40.3 s: still 0–6.57 s → graphics to 37.72 s → end card. No hook yet.
- `motion/out/gallstones_motion_EN.mp4` — silent graphics, placeholder timing.

## Feedback

- 2026-10-24 AG: voices good; v1 hook; still-photo presenter for now.
