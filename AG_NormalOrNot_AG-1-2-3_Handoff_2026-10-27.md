# AG_NormalOrNot_AG-1-2-3_Handoff_2026-10-27 — "Normal or Not?" medical vlogs AG-1 (disc), AG-2 (meniscus), AG-3 (gallstones)

> **START HERE.** This one document plus the folders next to it contain the whole project.
> In a new chat: attach this ZIP (or point to the GitHub branch below) and say:
> "Read AG_NormalOrNot_AG-1-2-3_Handoff_2026-10-27.md first, then continue with step 1 of the Ordered next steps."
> The only thing NOT inside: the 3 hook videos (Higgsfield) — attach them too (links in §6).
>
> Folder map inside the ZIP: `audio/` narration takes · `motion/out/` review previews and motion graphics · `motion/*.py` the tools · `assets/images/` every image · `scripts/AG-1..3.md` per-topic records · `BACKLOG.md` ten more topics · `MASTER_INDEX.md` board.

Prepared 2026-10-24 by Claude (cloud session `session_019k7gceBU7JFhpuCURUMeTT`) at AG's request. Read this file, `MASTER_INDEX.md`, and `scripts/AG-1.md`, `AG-2.md`, `AG-3.md` before acting.

Repo: https://github.com/binharoonz-code/medical-vlog-sandbox — branch **`claude/vlog-image-assets`** (not merged to `main`; no PR opened).

---

## 1. Goal and approved scope

Produce three short vertical (1080×1920) English medical vlogs in the "Normal or Not?" series:

| ID | Topic | Myth (hook line) |
|---|---|---|
| AG-1 | Disc bulge on MRI is usually normal | "My MRI isn't normal! That's why my back hurts!" |
| AG-2 | Torn meniscus is often painless | "I have a torn meniscus. That's why my knee hurts!" |
| AG-3 | Silent gallstones rarely need surgery | "I have gallstones! I need them removed!" |

**Locked structure (AG):** Omni Flash character hook (myth, dramatic, ~4 s) → AG presenter answers ("Hold on…") → motion graphics carry the numbers and red flags under AG's voice → end card.

## 2. AG decisions (exact, with dates)

- 2026-10-17: topics chosen from a "surprising normal" list; knuckle cracking removed; ghutra topic = Arabic only.
- 2026-10-17: hook format = character shouts the misconception, then AG intervenes; images must be **realistic** and characters **Arab**.
- 2026-10-17: images generated as **2×2 grids** (4 panels per image), then split and upscaled.
- 2026-10-23: **all Omni Flash generation must go through Google Flow** (AG's saved rule) — but the three existing Higgsfield hooks are **kept** ("the one we have done by using the Higgsfield was good. We are going to use this one").
- 2026-10-23: **HeyGen skipped for now** — use a **stable still photo** as the talking head; HeyGen replaces it later.
- 2026-10-23: narration generated with **ElevenLabs, latest expressive model, in AG's voice**.
- 2026-10-24: "**I like the voices. The voices are good.**"
- 2026-10-24: hooks = **Version 1 (already made)**. Future hooks: generated in Google Flow ("as has been done in another chat").

## 3. Verified current state (2026-10-24)

| Item | State | Evidence |
|---|---|---|
| Evidence & scripts | Done, facts checked 2026-10-17 | `scripts/AG-1..3.md` |
| Images | Done, Arab realistic, 1080×1920 (EDSR upscaled from 470×835 grid panels) | `assets/images/` |
| Hooks (Omni Flash 1.1 via Higgsfield, 4 s, 1080×1920, with speech) | Generated; **NOT watched/heard by Claude**; **not yet inserted** | job IDs in §6 |
| Narration (ElevenLabs eleven_v4, voice "Emirati thick" `czZ4QIPS4BGjseYaUp36`) | 2 takes each; AG approved the voices | `audio/` |
| Still presenter | `assets/images/AG_still.png` (crop of `my-male-character/assets/01-master-face.png`) | — |
| Motion graphics | Rendered locally, timed to the narration take | `motion/out/*_preview_REVIEW.mp4` |
| Full preview with hook | **Blocked** — hook MP4s cannot be downloaded into the cloud session | §5 |
| Arabic versions | Bullets drafted only; AG's rule: Arabic = AG's own recording | AG-*.md |
| Final export / publication | Not started | — |

### Review previews (REVIEW ONLY — no hook yet)

| File | Length | Structure | Phone link |
|---|---|---|---|
| `motion/out/disc_preview_REVIEW.mp4` | 35.7 s | still 0–9.71 s → graphics → end card | https://github.com/binharoonz-code/medical-vlog-sandbox/blob/claude/vlog-image-assets/motion/out/disc_preview_REVIEW.mp4 |
| `motion/out/meniscus_preview_REVIEW.mp4` | 37.5 s | still 0–10.20 s → graphics → end card | https://github.com/binharoonz-code/medical-vlog-sandbox/blob/claude/vlog-image-assets/motion/out/meniscus_preview_REVIEW.mp4 |
| `motion/out/gallstones_preview_REVIEW.mp4` | 40.3 s | still 0–6.57 s → graphics → end card | https://github.com/binharoonz-code/medical-vlog-sandbox/blob/claude/vlog-image-assets/motion/out/gallstones_preview_REVIEW.mp4 |

### Narration takes (pace target 165 WPM, AG rule)

| Take | Words | Speech s | WPM | Used in preview | sha256 (first 16) |
|---|---|---|---|---|---|
| disc_take1 | 96 | 31.3 | 184 | | 854ccb6e2648b7d9 |
| disc_take2 | 96 | 31.9 | 181 | ✅ | 2ca860b1fc906992 |
| meniscus_take1 | 98 | 33.8 | 174 | | 12a1de49d145ca21 |
| meniscus_take2 | 98 | 34.9 | 169 | ✅ | 2cd060db0f6152a7 |
| gallstones_take1 | 99 | 36.1 | 165 | ✅ | bb32b931e77c6e42 |
| gallstones_take2 | 99 | 36.8 | 162 | | 300cfa59b2d57368 |

Counting: hyphenated compounds and contractions = 1 word; speech = file minus leading/trailing silence (−45 dB, 0.3 s). Disc is above target; AG approved the voices but has not ruled on pace. Picks were made for pace only; Claude could not listen.

ElevenLabs flow: "[Claude] Normal or Not – narration EN (disc, meniscus, gallstones)" — https://elevenlabs.io/app/flows/xqdxdHf0TQMNAbQgAK0A (all 6 takes are there).

## 4. Unknown / stale / missing access

- Claude has **not heard** any audio nor **watched** any hook; lip-sync, accent, pronunciation, sound quality unverified.
- "Emirati thick" is assumed to be AG's clone (only cloned voice in the workspace) — AG approved the result, but the identity was not explicitly confirmed.
- `AG_still.png` comes from the "my male character" reference set; assumed to be AG's on-screen identity.
- Motion-graphics scene changes snap to pauses, not exact words.
- Google Flow per-clip credit cost and AG's Google plan: unknown.
- M9 and M10 images still show non-Arab people (violates the Arab-characters rule) — need regeneration.

## 5. Exact blockers and what was tried

**Hook clips cannot reach the cloud session.**
- `curl https://d8j0ntlcm91z4.cloudfront.net/...mp4` → `curl: (56) CONNECT tunnel failed, response 403` (tried 2026-10-17 and 2026-10-24).
- `upload.higgsfield.ai` PUT → same 403.
- Workaround tried 2026-10-24: ElevenLabs `creative_attach_reference_file` fetched all three clips into the ElevenLabs asset library (`9SYlrW8PzayQ2B4DmmhS` disc, `PePHYkGyr7gAYYF7AaBX` meniscus, `L16JYARZR9Z7yd0ibSrG` gallstones), but the connector only exposes a thumbnail URL, not the video → still blocked.
- **Fix:** AG uploads the 3 MP4s into the new chat, OR adds `d8j0ntlcm91z4.cloudfront.net` (and `upload.higgsfield.ai`) to the cloud environment's allowed domains, OR continue on AG's own computer (Claude Code local), which can also drive Google Flow in Chrome.

**Google Flow from the cloud session:** `curl https://labs.google/fx/tools/flow` → 403; and no access to AG's signed-in Google account. Must be done by AG or from a local session on AG's computer.

**Disk:** the session hit "No space left on device" once; fixed by deleting `/root/.cache/uv`, `/root/.npm/_cacache`, `/root/.cache/pip`.

## 6. Artifacts and source pointers

**Hooks (Higgsfield, Gemini Omni Flash 1.1, 4 s, 9:16, 1080p, 18 credits each)**

| Topic | Job ID | Start image | Clip URL |
|---|---|---|---|
| Disc | 59570cb8-9b59-41b1-8e6b-6ebb4136295d | D1 | https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_214329_59570cb8-9b59-41b1-8e6b-6ebb4136295d.mp4 |
| Meniscus | 270dfd45-f879-494c-ba39-b81f2dd51805 | M1 | https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_214331_270dfd45-f879-494c-ba39-b81f2dd51805.mp4 |
| Gallstones | 8e30672a-e854-4f25-a1fe-fc2c0fb338b3 | G1 (new, gallbladder scan) | https://d8j0ntlcm91z4.cloudfront.net/user_38wpvQoW6tmvBKWNtLdcpKVXDa4/hf_20261017_215414_8e30672a-e854-4f25-a1fe-fc2c0fb338b3.mp4 |

Hook prompts used (v1) and the more dramatic v2 prompts (not generated) are in §9.

**Images** (`assets/images/`, codes used in `motion/render.py`)
- Disc: D1 hook start, D2 hook close-up, D3 group, D4 young spine, D5 old spine, D6 disc cross-section, D7 padel grandfather, D8–D10 red flags (Arab, grid panels).
- Meniscus: M1 hook start, M3 older group, M4 gardener, M5 knee pain (Arab, grid panel), M8 physio, M9 exam (**non-Arab**), M10 swollen knee (**non-Arab**). M2/M6/M7 not needed.
- Gallstones: G1/G2 hook frames (gallbladder scan, grid panels), G3 ultrasound, G4 calm, G5/G8 (Arab, grid panels), G7 (mirrored so pain is right-sided), G9 jaundice eye, G10 ambulance. **G6_REJECT_fetal** not used.
- `*_src.png` = original 470×835 grid panels before upscaling; `grid_*_test.webp` = the two original 2×2 grids.

**Code** (`motion/`)
- `render.py` — motion-graphics renderer (PIL + ffmpeg, Inter Display font). Scene lists in `VIDEOS`. `python3 render.py disc [--stills] [--out PATH]`.
- `preview.py` — builds the REVIEW video timed to a take: `python3 preview.py disc ../audio/disc_take2.mp3 30 96 --hook HOOK.mp4 --hook-text "MRI = PAIN?"`. Args: topic, take, words in segment A (disc 30, meniscus 27, gallstones 21), total words (96/98/99). With `--hook` it prepends the clip with its own audio, stamps the screen text at 0.25 s and adds an "AI dramatization" tag. Tested with a dummy clip 2026-10-24.
- `split_grid.py` — splits a 2×2 grid: `python3 split_grid.py GRID.png TL TR BL BR`.
- `upscale.py` — EDSR ×4 upscale to 1080×1920 (needs `pip install opencv-contrib-python-headless` and `EDSR_x4.pb` from https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb; ~2 min/panel on CPU).

**Screen texts:** disc "MRI = PAIN?", meniscus "TORN = PAIN?", gallstones "SURGERY? WAIT."

## 7. Costs so far (AED, USD peg 3.6725)

| Item | Credits | AED | Basis |
|---|---|---|---|
| 3 Omni Flash hooks (Higgsfield) | 54 | ≈ 6.5–10 | estimate: $0.033–0.05/credit (Ultra plan vs top-up) |
| ElevenLabs narration, 3 × 2 takes | 3,820 | ≈ 2.4 | ElevenLabs reported $0.65 |
| ChatGPT image grids | — | unknown | AG's ChatGPT subscription |
| Local rendering, upscaling, previews | — | 0 | local CPU |

Note: Higgsfield history also shows a Kling v3.0 charge of 54 credits on 2026-10-17 19:51 that was **not** made by this session.

**Process errors recorded:** hooks were generated on Higgsfield before AG's Google-Flow-only rule was loaded, and without an AED quote first. AG later chose to keep them.

## 8. Ordered next steps

1. **Get the 3 hook MP4s into the session** (upload, or allow the domain, or work locally).
2. Run `preview.py` with `--hook` for each topic (commands in §6). Check: 1080×1920, continuous audio, screen text on, hook-to-"Hold on" cut feels natural.
3. AG reviews the three full previews (hook → still → graphics). Decide disc pace (181 WPM vs 165 target): keep, or regenerate slower (≈ AED 0.8 for 2 takes).
4. Regenerate M9/M10 with Arab characters (next 2×2 grid) and re-render the meniscus graphics.
5. Later: replace the still with HeyGen avatar (AG's numbered avatar choice first; AED quote first), Arabic versions with AG's own recording, then final export and AG acceptance. Publication needs separate approval.
6. Optional: produce the 10 backlog topics in `BACKLOG.md` using the same pipeline.

## 9. Hook prompts

**v1 (used, Higgsfield, 4 s):**
- Disc (D1): "Photorealistic. The man in the image shakes the MRI film toward the camera and shouts in frustrated English with a natural Gulf Arabic accent: "My MRI isn't normal! That's why my back hurts!" His left hand stays pressed on his lower back, his face full of exasperation, lips perfectly synced to the words. Fast push-in toward his face as he finishes the line. Natural handheld movement, real living-room ambience. The line is spoken once, clearly, with a short pause after it."
- Meniscus (M1): "Photorealistic. The grey-bearded man in the image grips his knee, then taps it twice and looks at the camera, declaring with stubborn certainty in English with a natural Gulf Arabic accent: "I have a torn meniscus. That's why my knee hurts!" One eyebrow raised, lips perfectly synced to the words. Slow push-in toward his face. Warm evening lamplight, quiet living-room ambience. The line is spoken once, clearly, with a short pause after it."
- Gallstones (G1): "Photorealistic. She waves the ultrasound printout in the air and cries out in panic, in English with a natural Gulf Arabic accent: "I have gallstones! I need them removed!" Her other hand stays pressed to her chest, lips perfectly synced to the words. Quick push-in toward her face as she finishes. Bright morning kitchen ambience. The line is spoken once, clearly, with a short pause after it."

**v2 (more dramatic, 5 s, for Google Flow, not generated):**
- Disc: He storms toward the camera, slaps the MRI film flat against the bright window so the light shines through the spine, jabs his finger at it and shouts in exasperated English with a natural Gulf Arabic accent: "My MRI isn't normal! That's why my back hurts!" On the last word he winces and grabs his lower back. Snap push-in on his face. Only his voice and natural room sound. The line is spoken once.
- Meniscus: He tries to push himself up from the sofa, winces, drops back down heavily, slaps his knee and declares with indignant certainty in English with a natural Gulf Arabic accent: "I have a torn meniscus. That's why my knee hurts!" He crosses his arms, unconvinced. Slow dramatic push-in. Only his voice and quiet evening room sound. The line is spoken once.
- Gallstones: She rushes forward waving the ultrasound printout, her voice cracking with panic in English with a natural Gulf Arabic accent: "I have gallstones! I need them removed!" She presses the printout to her chest, breathing fast. Whip push-in to her face. Only her voice and bright kitchen ambience. The line is spoken once.

## 10. Rules that apply (from AG's saved operating rules)

- Omni Flash / Google Flow requests → Google Flow on AG's account only (Higgsfield only if AG explicitly says so).
- Show a complete **AED estimate before any paid generation**; quote in AED with credits alongside.
- Vlogs open with a story/problem; misconceptions belong to characters; staged scenes labelled (we use "AI dramatization").
- 165 WPM target; 1080×1920 output; Arabic narration = AG's own recording.
- Images: realistic, Arab characters, 2×2 grids then split + upscale.
- Deliver media inside the chat **and** give a phone (HTTPS) link.
- Status questions are read-only.

## 11. Acceptance checks

- Each final video 1080×1920, hook → presenter → graphics → end card, continuous audio, no black frames.
- Hook line spoken once, lip-sync acceptable (AG checks), screen text readable, "AI dramatization" tag present.
- Every number on screen matches the evidence in the AG-*.md files.
- AG listens and accepts before anything is called final.

## 12. First verification step in the new chat (read-only)

`git fetch origin claude/vlog-image-assets && git checkout claude/vlog-image-assets && git log --oneline -3` — expect the latest commit to be the handoff commit; then `ls audio motion/out assets/images`.

## 13. Recommended effort

Medium. The remaining work is mechanical assembly once the hook files are available; the main risk is quality review, which needs AG's eyes and ears.

## 14. Authorization still needed

- Any new paid generation (v2 hooks, re-narration, HeyGen, more images) → AED quote + AG approval.
- Merging the branch / opening a PR, publication or scheduling → AG's explicit instruction.

## 15. Image generation method (ChatGPT, realistic, Arab characters, 2×2 grids)

**Rule (AG, 2026-10-17):** one ChatGPT image = one vertical 9:16 canvas split into 4 equal panels; Claude splits it with `motion/split_grid.py` and upscales with `motion/upscale.py`. Realistic photos only, all people Gulf Arab, same character identical across panels. Panel order: 1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right.

Measured result of the test: ChatGPT returned 941×1672 grids → panels 470×835 → EDSR upscale to 1080×1920 (clearly sharper than a plain resize, but not native detail).

**Header to paste before every grid batch:**
```
INSTRUCTIONS — READ FIRST AND APPLY TO EVERY IMAGE:
Create exactly N separate images. Each image is ONE vertical 9:16 canvas at the highest resolution you can produce, divided into a 2×2 grid of FOUR EQUAL panels: Panel 1 = top-left, Panel 2 = top-right, Panel 3 = bottom-left, Panel 4 = bottom-right. Each panel is its own complete, independent photograph in vertical 9:16 framing that fills its quarter edge to edge. Hard straight edges between panels — no borders, no gutters, no white lines, no frames, no numbers, no labels, no captions, no text anywhere. Nothing crosses from one panel into another, and each subject stays fully inside its own panel with a little breathing room from the panel edges so it can be cropped cleanly. Every panel must be PHOTOREALISTIC like a real photograph — never cartoon, 3D render or illustration — with visible skin pores and texture, no plastic sheen, natural light. ALL PEOPLE ARE ARAB with a Gulf Arab / Emirati appearance: olive-to-light-brown skin, dark hair, dark brown eyes, dressed modestly in Gulf style. When the same character appears in several panels, keep the face, age, hair, beard and clothing IDENTICAL across those panels.
```

**Next batch (ready, not yet run) — fixes the last non-Arab images for AG-2 and adds spares:**
```
[paste the header above with N = 1]

IMAGE — MENISCUS FIXES
Character for Panels 1–2: a grey-bearded Arab man in his late sixties with olive skin and deep wrinkles, wearing a white kandura pulled up just above the knee where needed.

Panel 1 (top-left) = M9: In a bright clinic examination room, the man lies on an exam table with his right knee stuck in a bent position, unable to straighten it, grimacing and gripping the table edge, while a female Arab doctor in a white coat and black hijab gently supports his leg. Bright clinic light, shot on Leica M11 50mm.

Panel 2 (top-right) = M2: Close-up of the same man on a cream living-room sofa in warm evening lamplight, pointing firmly down at his knee, wincing with one eye squeezed and lips pressed in stubborn conviction. Shot on iPhone 15 Pro, slight grain in shadows.

Panel 3 (bottom-left) = M10: An Arab man in his twenties in a football kit sits on the grass at the sideline of a pitch just after an injury, his right knee visibly swollen, puffy and reddened, an ice pack beside it, hands hovering protectively near the knee. Natural afternoon light, shot on Fujifilm X100V.

Panel 4 (bottom-right) = G6 replacement: A calm female Arab doctor in a white coat and black hijab sits beside an Arab woman in a black abaya and shayla in a bright consultation room, both looking at a tablet that clearly shows an adult abdominal gallbladder ultrasound with several bright round gallstones and dark shadow streaks beneath them — no baby, no fetus. The doctor makes a reassuring open-hand gesture. Soft window light, shot on Sony A7R V 35mm f/1.4.

Generate 1 image: one 9:16 canvas split into four equal panels exactly as described.
```
Then: `python3 motion/split_grid.py GRID.png M9 M2 M10 G6` → `python3 motion/upscale.py EDSR_x4.pb M9 M2 M10 G6` → re-render.

**Known image-model failure seen in this project:** ultrasound printouts defaulted to a **pregnancy (fetal) scan** — always state "adult abdominal gallbladder scan — no baby, no fetus". Check side of pain (right upper abdomen) — G7 had to be mirrored.

## 16. How the topics were chosen (history)

1. 20 general viral topics (first aid etc.) → AG wanted trending topics.
2. 20 trending news topics (Oct 2026) → AG wanted viral myths.
3. 20 viral myths (seed oils kept as "acceptable") → AG asked for "surprising normal" facts like MRI disc bulges and balding age.
4. Final "surprising normal" list (numbers as used in this thread): 1 disc bulge, 2 meniscus, 3 rotator cuff, 4 thyroid nodules, 5 lung nodules, 6 gallstones, 7 brain MRI, 8 skipped heartbeats, 9 balding age, 10 ghutra (AR only), 11 grey hair 50-50-50 rule, 12 testosterone, 13 height loss, 14 sperm counts, 15 body temperature, 16 10,000 steps, 17 8 glasses of water, 18 earwax, 19 wisdom teeth, 20 knuckle cracking.
5. AG selected 1, 2, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 18, 20; then removed 20. Produced first: 1, 2, 6 (= AG-1, AG-2, AG-3). The other ten are in `BACKLOG.md`.

Fact corrections made during checking (keep): gallstones "80% never symptomatic" → replaced by 2%/yr, ~8 in 10 symptom-free at 10 y; testosterone ~1%/yr → 1.6%/yr longitudinal; knuckle experiment 60 y → 50+ y; 10,000-step plateau figure → replaced by Ding 2025 (7,000); sperm "50%" → concentration −51.6%, total −62.3%, disputed.

## 17. What this handoff does NOT contain

- The **hook video files** themselves — only their links/job IDs (the cloud session could not download them). Bring the 3 MP4s to the new chat or work from AG's computer.
- The raw chat transcript — only the decisions, outputs and evidence above.
- ChatGPT originals other than the two test grids (the used images are all in `assets/images/`).
- Live account state (credit balances, ElevenLabs/Higgsfield libraries) — re-check in the new session.
- Note: the repository is **public**; anything committed here is visible to anyone with the link.

## 18. Running the tools on AG's Windows computer (added 2026-10-27)

Local copy: `C:\Users\LENOVO\OneDrive\المستندات\medical-vlog-sandbox` on branch `claude/vlog-image-assets` (cloned 2026-10-27, Git 2.55).

1. Update first: `git pull origin claude/vlog-image-assets`.
2. Install once: Python 3 (`winget install Python.Python.3.13`), FFmpeg (`winget install Gyan.FFmpeg`), then `pip install -r motion/requirements.txt`.
3. Fonts are bundled in `motion/fonts/` (Inter, SIL Open Font License) — nothing to install.
4. Run from the `motion` folder, e.g. `python preview.py disc ..\audio\disc_take2.mp3 30 96 --hook ..\hooks\disc_hook.mp4 --hook-text "MRI = PAIN?"`.
5. Put the downloaded hook clips in `hooks\` as `disc_hook.mp4`, `meniscus_hook.mp4`, `gallstones_hook.mp4` (links in §6).

Caution: the folder is inside OneDrive. If OneDrive sync locks or duplicates files during rendering, pause OneDrive sync while working, or move the project to `C:\Users\LENOVO\Projects`.
