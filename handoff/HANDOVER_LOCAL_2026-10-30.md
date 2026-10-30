# AG Arabic Medical Motion Vlogs — FULL HANDOVER FOR A LOCAL SESSION (30 Oct 2026)

> Supersedes HANDOVER_FULL_2026-10-27.md. Built for a **local Claude session on AG's Windows PC** (Claude desktop app + Claude in Chrome). Everything needed is in this file and in `handoff/` (kit_v2, reference_previews). Push prompt for the next step: **section 12**.

Single-file handover of the "Arabic medical vlog editor" thread. It covers who/what, every locked rule, the exact methods, every approved script word for word, where every file is, what's pending, the Google Flow (Omni Flash + Nano Banana) generation pack, and the **push prompt** (section 12) to continue in a new thread.

Source thread: Claude Code cloud session "Arabic medical vlog editor". Repo: `binharoonz-code/medical-vlog-sandbox`, branch **`claude/motion-vlog-handoff`**. Kit folder: **`handoff/kit_v2/`**.

---

## 1. Who and what

- **AG**: Dubai emergency physician and creator (TikTok, Instagram Reels, YouTube Shorts). Gulf (Emirati) Arabic and English medical vlogs.
- **This thread's product:** 9:16 **kinetic motion-graphic** Arabic vlogs. Every caption word animates exactly when it's spoken, over icons, gauges, cards and stamps in a navy style. The voice is AG's **ElevenLabs clone**.
- **Style:** the original navy kinetic style is the default. Don't set `THEME`. The other themes (pop, paper, neon, editorial) were tested and rejected.
  - Palette: bg `#0B1626`, ink `#F7F9FC`, teal `#2EC4B6`, red `#FF4D5A`, gold `#FFD23F`, muted `#8DA2BC`.
  - Fonts: Lalezar (display), Tajawal (body), Inter (numbers).
- **Draft tag:** «مسودة للمراجعة» appears small, top-right, on every render. Remove it and render 4K (`--scale 2`) **only when AG says "final"**.

## 2. 🔒 Locked rules (never break them)

1. **Voice method H1, locked 22 Oct.**
   - Use the ElevenLabs take exactly as generated.
   - The only edit: silences of 0.25 s or longer are shortened to **0.08 s**.
   - **No speed change** (no rubberband or atempo) and **no loudness change**.
   - AG compared versions A, B, C, D, H1 and H2 and heard the quality drop whenever the voice was sped up. `pace_165.py` now does H1 by default. `ALLOW_STRETCH` and `NORM` exist, but don't use them.
2. **🔒 Pace, decided by AG on 30 Oct: the Arabic voice must run at 165–180 WPM, never below 165.**
   - Get there by **rewriting the script** to be more fluid and denser, with joined sentences, no choppy commas and fewer filler words. You may also use **eleven_v4 audio tags** for pace and energy, e.g. `[speaking fast, energetic]`, `[excited]`.
   - **Never by speeding up the audio.** Rule 1 still holds: H1 shortens silences only.
   - Measure WPM on the H1 output: alpha words ÷ duration × 60.
   - Below 165 → rewrite or re-tag, then re-voice. Keep the meaning and AG's words.
   - Every rewrite needs AG's approval (gate G1) before voicing.
   - All 13 current videos run at 130–145 WPM, so **all 13 need rewriting**.
3. **Presentation rule:** never show AG an old render. Anything previously chosen is first rebuilt with the current locked methods (voice, caption and timing fixes), then presented.
4. **Video generation (Omni Flash) only in Google Flow**, from AG's signed-in Chrome, driven by a local Claude session with the Claude in Chrome extension.
   - **Never Higgsfield** or any other video generator for the medical vlogs.
   - Cloud sessions can't reach Flow: the network blocks it and there's no Google login.
5. **🔒 AG speaking parts** are always motion graphics: kinetic text, icons and voice.
   - The talking-head slot shows **AG's still photo**, the `presenter` FX, **in every render until the video is final**.
   - **HeyGen is the very last step**, applied to that slot only after AG approves the final.
   - Use AG's photo once he provides it. Until then, use the placeholder card «صورة د. AG», and ask him for the photo.
6. **Hooks (omni-clip-pipeline v3.3, 24 Oct):**
   - Every Omni generation is a hook generation: 3–5 s per hook, 2–3 hooks per 10 s run.
   - Each hook has one dramatic acted action, hyper-expressive faces, a kinetic camera (crash zooms, whip pans) and ASMR.
   - The hook headline is on screen from the first frame, top third, held for the whole hook.
   - In motion-graphics videos, the screen hook is 5 words or fewer, never spoken, compresses the opening line rather than repeating it, and keeps medical terms in English.
7. **Omni prompt hygiene:**
   - scene headers carry the time only ("SCENE 2, 3.3–6.6 s:")
   - "exactly one on-screen text per scene"
   - props that could carry writing are "plain blank"
   - no negative instructions ("no…", "without…")
   - no location names, camera or lens names, branding, credentials, or study names and years
   - every line is spoken once
   - regenerate once at most, then stop and report
8. **Spending:** price every paid step first (`estimate_only` where it's available) and wait for AG's OK. **Never publish.**
9. **Security:** never ask for or accept API keys or tokens in chat. Keys go only into the services' own connection forms.
10. **Medical claims:** grade every claim as Strong, Moderate or Weak. Flag unverified claims, never invent a citation, and if sources conflict, say so.
11. **Working style:**
    - Say "I don't know" when unsure.
    - Label sources and estimates.
    - Separate fact from inference.
    - Ask when critical context is missing.
    - Correct mistakes immediately.
    - Keep replies short and direct.

## 3. Accounts and IDs (none of these are secrets)

- **ElevenLabs:**
  - Workspace "abdulla's Workspace", Creator plan.
  - Arabic voice: **"Emirati thick" `czZ4QIPS4BGjseYaUp36`**, model **`eleven_v4`**.
  - English voice: "Me english" `OTOjvbcbsnhMXZldcJmT`, `eleven_v4`, with expression via audio tags only.
  - Flow used for all generations here: `NJvM5Mt3e0lRTWJDX6EW`.
- **Zapier:** its old route to ElevenLabs hit the task limit. The ElevenLabs connector is used instead.
- **Google Drive:**
  - Arabic → «Motion graphic»: `1vZhaaaDEl0ruD_tBl3Flq8voK54X_B0d` (first batch, 4K).
  - "Viral scripts — Magnesium & Testosterone": `1VBnYAy5TiSSxK6BXdzRc-aUi82N_5eF_`, with the scripts Doc `1KybThSJgQxf2UXzrzfLl_3aEleOZTRN_HcbFoBpunz4`. That Doc still says "~160 WPM"; update it to H1.
  - Recovered speeches: `1DMVLigLsmklAdoG3Wx10hs-1oUBPxifj`.
  - The Drive connector **can't upload video**. AG uploads videos by hand.
- **AG's PC:** Windows, `C:\Users\LENOVO`.
  - N08 working folder: `C:\Users\LENOVO\n08w`.
  - Drive is synced at `G:\My Drive`.
  - The rule files `N08_RULES_2026-10-24.md`, `VOICE_METHODS_EN_AR_2026-10-24.md` and `omni-clip-pipeline_v3.3_SKILL.md` are in Drive (N08 folder) and in `…\scratch-2026-10-21-d54afe\N08_review\`.
- **Google Flow:**
  - Omni settings: **Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1 = 15 credits**. Ultra plan; about 9,700 credits were recorded in another thread.
  - Nano Banana settings: **🍌 Nano Banana 2.1 · Image · 9:16 · x1 = 0 credits**. Download "1K Original".
  - Pasting into Flow: the prompt box is a ProseMirror div. Paste with a synthetic ClipboardEvent after select-all.
  - Name new projects "[Claude] …".
- **Locked AG identity sheet: not found yet.** The search in another thread was unfinished. The look description lives at `C:\Users\LENOVO\OneDrive\Desktop\Character sheet face profile 2\_handoff_refs\AG_Soul_2_Character.md`: navy scrubs, black full-rim rectangular glasses, short beard, DJI clip-on mic.

## 3b. Links (open these)
- Repo branch: https://github.com/binharoonz-code/medical-vlog-sandbox/tree/claude/motion-vlog-handoff
  - This file: `handoff/HANDOVER_LOCAL_2026-10-30.md`
  - Kit: `handoff/kit_v2/`
  - Previews: `handoff/reference_previews/`
- Motion engine: https://github.com/majedphotos/video-ad-editor (commit `cf39f0f`)
- Drive:
  - Arabic «Motion graphic» (first batch, 4K): https://drive.google.com/drive/folders/1vZhaaaDEl0ruD_tBl3Flq8voK54X_B0d
  - "Viral scripts — Magnesium & Testosterone": https://drive.google.com/drive/folders/1VBnYAy5TiSSxK6BXdzRc-aUi82N_5eF_
  - Scripts Doc: https://docs.google.com/document/d/1KybThSJgQxf2UXzrzfLl_3aEleOZTRN_HcbFoBpunz4
  - Recovered speeches: https://drive.google.com/file/d/1DMVLigLsmklAdoG3Wx10hs-1oUBPxifj
  - N08 images: https://drive.google.com/drive/folders/1JEYL48fHs-zNVZps4DuqCYORYyF3ggUM
  - Arabic library: https://drive.google.com/drive/folders/166NBcDfgHw1g3I2O93sMK5b7PEHwWOOc
- ElevenLabs flow (every Arabic take and transcription): https://elevenlabs.io/app/flows/NJvM5Mt3e0lRTWJDX6EW
- Google Flow: https://labs.google/fx/tools/flow
  - N08 project `1b11aa2d-a64c-4257-af4c-9ecbd2f5b953`
  - Sugar hook project `96de85f6-5d98-46e3-a203-8709e9b98097`
- Cloud test thread (from-scratch regeneration, running 30 Oct): Claude Code session "Arabic motion vlogs — from-scratch regeneration test". Its renders arrive in chat; it commits to the same branch.

## 4. Status: what exists

**Kept and approved: 13 motion videos, all rebuilt with H1.** Reference renders were sent to AG in chat. Scripts are in section 13.

| Topic | Videos |
|---|---|
| Testosterone | Kill_Testosterone («تبي تقتل التستوستيرون عندك؟», 40.3 s), T2_three, T3_free, T4_quiz |
| Magnesium | Magnesium_montage, M1_stop, M2_exam, M3_pov, M4_trend |
| Full-body MRI | MRI5_twist, MRI6_doctor |
| Peptides | PEP4_three (voice says «بيبتايد», captions show «ببتيد») |

> **All 13 run at 130–145 WPM, under the new 165 minimum.** They are the *visual* reference. Their scripts must be rewritten and re-voiced (section 12, step 2). Small 540p reference previews of every approved video are in `handoff/reference_previews/`.
| Fitness | **T6_fitness**, the newest; AG's own speech, with «ممكن» added at AG's request |

**Dropped:** T1_age. Don't rebuild it unless AG asks.

**First batch (done, 4K, in Drive):** ice water, phone and hemorrhoids, IV NAD, weekend sleep, jet lag, caffeine, pimple. These are older and pre-H1.

**Pending, in order:**
1. **T6 drama opening.** Two Omni Flash hook runs plus five Nano Banana B-roll images, run in Google Flow from AG's PC. The full prompts are in section 11. Then assemble: hook runs → T6 speech video with the Nano Banana images timed to the words → preview without the talking head → HeyGen later.
2. **AG's still photo** for the talking-head slot (shown until final). He hasn't sent it yet. Ask for it.
3. **Screen hooks** for the other 12 videos. They're proposed in section 13 but **not approved or applied**.
4. **Pace (rule 2, decided).** Rewrite all 13 scripts to 165–180 WPM, get AG's approval (G1), re-voice, then rebuild.
5. **Fact-check:**
   - testosterone −15% after a week of 5-hour sleep (T2, T4, Kill)
   - "belly fat drops it by a third" (T4, Kill)
   - "20 vs 50" (Kill)
   - the editorial inferences in T4 ("belly fat worse than age") and T2 ("sleep most dangerous")
   - the MRI6 doctor-authority line
   - T6, where the general claims were softened with «ممكن»: Moderate evidence, fitness/VO2max ↔ erectile function; Strong to Moderate, waist/belly fat ↔ lower T
6. **Final:** when AG says "final", remove the draft tag, render 4K, then AG uploads to Drive.
7. **Next topics** (from the recovered speeches doc, adapted to Gulf Arabic and not translated):
   - Short myth-busters: T15 knuckles, T16 shower→AC, T17 urine colour, T18 sugar and hyperactivity, T19 detox, T20 carrots, T21 dim light, T22 sweat, T23 gum, T24 antibiotics for flu.
   - The Mounjaro/Ozempic series, S1–S6.
   - Longer speeches.
   - Council-pass topics: ED and the heart, women's heart attack signs, paracetamol overdose.

## 5. The motion engine: setup from scratch

### 5a. Windows (AG's PC), for the local session
Needs Git, Python 3, Node 18+ and ffmpeg (with ffprobe) on PATH, plus Google Chrome. Install anything missing with winget: `winget install Git.Git Python.Python.3.12 OpenJS.NodeJS.LTS Gyan.FFmpeg`.
```powershell
mkdir C:\Users\LENOVO\arabic_motion; cd C:\Users\LENOVO\arabic_motion
git clone -b claude/motion-vlog-handoff https://github.com/binharoonz-code/medical-vlog-sandbox.git kit_repo
git clone https://github.com/majedphotos/video-ad-editor.git engine_repo; cd engine_repo; git checkout cf39f0f
cd video-ad-editor; npm install --no-audit --no-fund --ignore-scripts; cd ..
git apply ..\kit_repo\handoff\kit_v2\engine_patch\render_js.patch   # harmless on Windows (it only adds --no-sandbox when running as root)
cd ..
$env:CHROME = "C:\Program Files\Google\Chrome\Application\chrome.exe"
python kit_repo\handoff\kit_v2\scripts\make_all.py --kit kit_repo\handoff\kit_v2 --engine engine_repo\video-ad-editor\motion --out out --work work M2_exam
# expect: DONE M2_exam video 18.09 audio 18.09   (tested 30 Oct: audio byte-identical to the approved version)
```
- Single new or rewritten video: `python ...\make_all.py --kit ... --engine ... --out out --voice new.mp3 --align new.align.json --story story.json NAME`
- 4K final: add `--scale 2`, only when AG says "final".
- `render.js` passes `--use-angle=metal`. If Chrome on Windows renders black frames, try deleting that one arg locally.

### 5b. Linux or cloud

```bash
git clone https://github.com/majedphotos/video-ad-editor.git && cd video-ad-editor && git checkout cf39f0f
cd video-ad-editor && npm install --no-audit --no-fund --ignore-scripts      # puppeteer-core
git -C .. apply <repo>/handoff/kit_v2/engine_patch/render_js.patch           # adds --no-sandbox when running as root
export CHROME=/path/to/chrome     # cloud: /opt/pw-browsers/chromium-1194/chrome-linux/chrome (check: ls /opt/pw-browsers)
# engine dir = video-ad-editor/video-ad-editor/motion   (render.js lives there)
```

Rebuild every approved video exactly. This was tested on M2_exam: the audio came out byte-identical to the approved version. `make_all.py` is the cross-platform equivalent.

```bash
KIT=<repo>/handoff/kit_v2 ENGINE=<clone>/video-ad-editor/motion OUT=$PWD/out bash $KIT/scripts/make_all.sh            # all 13
KIT=... ENGINE=... OUT=... bash $KIT/scripts/make_all.sh T6_fitness M2_exam                                               # some
```

Preview frames without a full render:

```bash
node render.js <proj> preview 1.0 6.5 13.5 --safe     # writes <proj>/renders/preview/contact.png and shows the safe-zone overlay
```

Use `node render.js <proj> all --fresh --scale 2` for 4K.

## 6. kit_v2 contents (`handoff/kit_v2/`)

| Path | What |
|---|---|
| `scripts/pace_165.py` | 🔒 H1 voice method. `pace_165.py in.mp3 out.wav <words> <target>`. Writes `out.wav.map.json`, which maps old times to new so captions follow. |
| `scripts/build_note.py` | Storyboard JSON + voice + alignment → engine project (`timeline.json`, `project.json`, `scenes/all.js`, `captions.json`). Env `ALIGN=<align.json>` gives exact word timing. Arg 5 is the pace map. |
| `scripts/tr_to_align.py` | ElevenLabs **Scribe** transcript `words.json` + the voice text → character alignment. It merges «الـ»+next token and expands "BBC 157" to 6 words. It asserts the word counts match. |
| `scripts/make_all.sh` | The whole pipeline per video: pace → build → render → mux (tpad 0.3 s, x264 crf16, AAC 192k). |
| `scripts/make_all.py` | **Cross-platform (Windows)** version of the same pipeline, with the per-video overrides `--voice/--align/--story` and `--scale 2`. |
| `../reference_previews/*.mp4` | 540p previews of the 13 approved H1 renders, for visual comparison. |
| `motion_src/lib.js`, `kit.js` | Drawing library and FX vocabulary (below). `theme_*.js` holds the rejected themes. |
| `stories/<name>.json` | The 13 approved storyboards. |
| `voice/<name>.mp3`, `.align.json` (+ `.txt` voice text, `.words.json` Scribe words where they exist) | The approved voice takes and their timing. |
| `engine_patch/render_js.patch` | The sandbox patch. |

## 7. How a video is made (the method)

1. **Script.** Write Gulf Arabic, adapted rather than translated, in flowing joined sentences, because choppy comma-heavy lines make the voice slow and stilted.
   - Two versions:
     - **caption lines**: 2–7 words each; numbers as digits, e.g. «5 ساعات», «15%», «BPC-157», «VO2 max»
     - **voice text**: numbers as words, e.g. «خمس ساعات», «خمسطعش بالمية»; Latin terms spelled for the voice, e.g. «بي بي سي مية وسبعة وخمسين», «الفي-أو-تو ماكس»; pronunciation fixes, e.g. «بيبتايد» not «ببتيد»
   - AG approves the speech (**gate G1**) before any voicing.
2. **Voice.** Use the ElevenLabs connector: `creative_generate_speech` (eleven_v4, voice `czZ4QIPS4BGjseYaUp36`, flow `NJvM5Mt3e0lRTWJDX6EW`).
   - Use the default 2 takes, then poll `creative_get_flow_run_status`.
   - Pick the shortest clean take. Download `content_url` with curl.
   - For a faster delivery, the v4 tag `[speaking fast, energetic…]` gave about 149 WPM, but AG preferred the natural take. There is **no speed parameter** on eleven_v4, multilingual_v2 or v3 in this connector.
3. **Word timing.**
   - Put the audio on the flow. If `creative_create_asset_upload` and `finalize` are permission-blocked, use `creative_attach_reference_file` with the take's https `content_url`.
   - Run `creative_transcribe_audio` (eleven_scribe_v1, connect_from that node), then download `words_download_url`.
   - Run `python3 tr_to_align.py words.json voice.txt out.align.json`.
   - Make **voice.txt** a single-token form for multi-word Latin terms (e.g. «الفي-أو-تو» as one token) so the counts match the transcript.
4. **Storyboard JSON** (`stories/*.json`):
   - `title`, `lines` (caption lines)
   - `say`: display→spoken substitutions, so the spoken word counts per line match. Built-in NUM pairs cover the old numbers; add new ones like `["عمره 60","عمره ستين"]`.
   - `flags`
   - `scenes[]`, each with `lines` (1-based), `tr` (push / wipe / zoom), `hot` (words to colour per line), `hotColor`, and `fx[]`
   - FX timing refs are `[line, wordIndex | "substring"]`
5. **FX vocabulary** (`kit.js`):
   - `stamp` — slammed label with shake; `until`, `rot`, `size`, `color`
   - `counter` — big number with `sub`
   - `icon` — named icon; `mark` x / v / !, `markAt`
   - `eq` — A op B with `sub`. **RTL: the larger side is on the RIGHT, so use "<" to mean right > left.**
   - `cards` — stacked cards with icon and mark
   - `pair` — two tall cards with icon, label and mark
   - `gauge` — level bar with `keys` [[ref, level]…] and `notes`
   - `week`, `clock`, `daybar`, `pills`
   - `presenter` — **the talking-head placeholder slot for AG's still photo**
   - Icons: ice, dumbbell, phone, toilet, clock, moon, sun, plane, bus, coffee, bulb, face, toothpaste, patch, concealer, study, alarm, suitcase, bed, ivbag, mri, vial, syringe, muscle (weak; prefer dumbbell), heart, idcard
   - Captions sit at y≈1290, size 84, line-height 1.45 (prevents tanween overlap)
   - Keep content inside the safe zone: the hook goes at y ≥ 330, top. Check with `preview --safe`.
6. **Pace:** `python3 pace_165.py voice.mp3 final.wav <words> 1` gives H1.
7. **Build:** `ALIGN=voice.align.json python3 build_note.py story.json final.wav proj/<name> motion_src final.wav.map.json`. Check that there is **no "WARNING: matched X of Y"**.
8. **QC before showing AG:**
   - Preview contact sheet: check the safe zone, RTL order, numbers shown as "1%" not "%1" (use an LRI isolate if needed), and no overlaps.
   - Full render, then mux; video length must equal audio length.
   - Check frames on every number line.
9. **Deliver:** send the files in chat. AG uploads them to Drive.

## 8. Lessons and known pitfalls

- **Speeding up the voice wrecks the quality.** That's the reason for rule 1.
- **Number lines:** spoken words outnumber displayed tokens. `build_note` assigns the extra spoken words to the non-Arabic tokens. If a line's count is off, timing drifts; check for the WARNING.
- **Transcript quirks:**
  - Scribe writes «ببتيد» however it was pronounced, so you can't verify pronunciation by transcript; AG has to listen.
  - It writes Latin as English ("online", "Semaglutide", "BBC 157", "VO2 max", "testosterone").
  - It splits «ال» + English.
- **Batch shell loops:** ffmpeg and python read stdin and swallow the job list. Always use `< /dev/null` and `ffmpeg -nostdin`.
- **Theme files** must not redeclare `bg`. Use `themeBg` / `themeLine`.
- **Don't `pkill -f` a pattern** that appears in your own command line.
- **Omni:**
  - Omni reads the *audio transcript*, so sharp substance, harm or sexual words in the speech trigger the lane rules (Lane 1 SHARP = real voice + 2D, AG never on screen; Lane 3 SPLIT = sharp target only in the screen hook or caption).
  - Video models garble Arabic text. If the headline comes out garbled, add it as an overlay in assembly.

## 9. omni-clip-pipeline v3.3: the parts that matter here

- **Order (AG, 24 Oct):**
  1. Speech approved
  2. Omni hook generated
  3. Voice generated
  4. B-roll attached to the words (Omni hook frames without text, existing clips, Nano Banana images, motion graphics)
  5. Preview without the talking head
  6. HeyGen last
- **Never generate a 10 s explainer scene in Omni.**
- **Gates:** G1 speech approved · G2 ffmpeg checks · G3 prompt check · G4 identity QC · G5 sources live.
- **Nano Banana B-roll:**
  - Shown as stills with a slow push-in, timed to the words, with motion labels in the empty top third.
  - Prompt convention: "Photoreal, vertical 9:16, …, shallow depth of field, crisp detail, clean empty space in the top third of the frame."
- **Publishing (only when AG says so):** TikTok first, Reels +24 h, Shorts +48 h. Captions adapted per platform.

## 10. Where generation runs

| Job | Where it can run |
|---|---|
| Motion graphics, ElevenLabs voice, Scribe, assembly | Cloud session (this repo) or AG's PC |
| **Omni Flash video + Nano Banana images** | **Only AG's PC:** local Claude session + Claude in Chrome, in AG's signed-in Chrome on Google Flow |
| HeyGen | Later; AG will re-subscribe. Use placeholders until then. |
| Uploading video to Drive | AG by hand, or the PC session via the `G:\My Drive` sync |

## 11. T6 Google Flow pack (ready to run on AG's PC)

### A. Omni Flash hook runs — 2 runs × 10 s, 3 hooks each

Settings: **Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1** = 15 Flow credits per run → **30 credits** (≈ AED 1.10). Regenerate a run **once at most**, then stop and report.
QC every text frame: exactly one on-screen text per scene; props stay plain blank.

### Run 1 — «وين ولدك المعرس؟»

```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. A formal Gulf Arab engagement visit in a traditional majlis: cushioned floor seating, a brass tray with an Arabic coffee pot and small cups, warm evening light.
Characters, identical in every scene: the bride's father, about 60, grey beard, white kandura and white ghutra; the bride's brother, about 30, white kandura; the suitor, a 65-year-old Emirati man with full white hair, a neatly trimmed white beard, white kandura and white ghutra, broad shoulders and a visibly athletic, muscular build.
Exactly one on-screen text per scene: the headline «60 أقوى من 20؟» in bold white Arabic letters in the top third, from the first frame and held through every scene.

SCENE 1, 0–3.3 s: The father pours coffee (ASMR pour and cup clink), glances toward the door with raised eyebrows and asks in Gulf Emirati Arabic: «وين ولدك المعرس؟»
SCENE 2, 3.3–6.6 s: Crash zoom onto the suitor, chest out, proud grin: «أنا اللي جاي أخطب!»
SCENE 3, 6.6–10 s: The suitor hands over a plain blank white card; whip pan to the father reading it, eyes wide: «خمسة وستين؟!» The whole majlis bursts out laughing.
Every line is spoken once.
```

### Run 2 — the backflip

```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. The same majlis and the same characters: the 65-year-old suitor with full white hair, white beard, white kandura and ghutra and an athletic build; the bride's father, about 60, grey beard; the brother, about 30.
Exactly one on-screen text per scene: the headline «60 أقوى من 20؟» in bold white Arabic letters in the top third, from the first frame and held through every scene.

SCENE 1, 0–3.3 s: The suitor springs up and performs a clean standing backflip in the open centre of the majlis; kandura whoosh, solid landing thud.
SCENE 2, 3.3–6.6 s: Crash zoom as he flexes his right biceps with a playful grin; the brother's jaw drops: «واو! والله إنك أشد من اللي عمره ثمنطعش!»
SCENE 3, 6.6–10 s: The father slaps his knee laughing: «إنت تقدر على أربع حريم!» Everyone laughs.
Every line is spoken once.
```

If Flow garbles the Arabic headline, keep the clip and AG's overlay adds «60 أقوى من 20؟» in assembly (the motion-graphics layer already has it).

---

### B. Nano Banana B-roll images — 5 images, 0 credits

Settings: **🍌 Nano Banana 2.1 · Image · 9:16 · x1**. One prompt at a time. Download **1K Original**.
Used as B-roll stills with slow push-in, timed to the words; motion-graphic labels sit in the empty top third.

| # | Timed to (speech line) | Prompt |
|---|---|---|
| I1 | «ريال عمره 60 ويتمرن بانتظام» | Photoreal, vertical 9:16, a fit 60-year-old Emirati man with white hair and white beard in a grey athletic t-shirt lifting dumbbells in a bright modern gym, focused confident expression, warm natural light, shallow depth of field, crisp detail, clean empty space in the top third of the frame. |
| I2 | «من شاب عمره 20 تمرينه قليل» | Photoreal, vertical 9:16, a 20-year-old man slouched on a sofa at night scrolling his phone, soft round belly under a loose t-shirt, snack packets on the table, blue screen glow, shallow depth of field, crisp detail, clean empty space in the top third of the frame. |
| I3 | «الكتلة العضلية» | Photoreal, vertical 9:16, close-up of a mature man's strong forearm and biceps gripping a barbell, chalk dust in the air, warm gym light, shallow depth of field, crisp detail, clean empty space in the top third of the frame. |
| I4 | «اللياقة البدنية VO2 max» | Photoreal, vertical 9:16, a fit middle-aged man running on a treadmill wearing a sports-lab breathing mask during a fitness test, plain blank monitor beside him, clean clinical light, shallow depth of field, crisp detail, clean empty space in the top third of the frame. |
| I5 | «الكرش ومحيط الخصر» | Photoreal, vertical 9:16, close-up of a plain blank measuring tape wrapped around a man's belly at waist level, white t-shirt lifted slightly, neutral bathroom light, shallow depth of field, crisp detail, clean empty space in the top third of the frame. |

---


## 12. PUSH PROMPT, LOCAL SESSION (paste into the Claude desktop app on AG's PC)

```
You are continuing AG's Arabic medical motion-vlog project on AG's Windows PC (local session, Claude in Chrome available).
FIRST: clone/pull https://github.com/binharoonz-code/medical-vlog-sandbox branch claude/motion-vlog-handoff into C:\Users\LENOVO\arabic_motion\kit_repo and read handoff/HANDOVER_LOCAL_2026-10-30.md completely. Follow it exactly; every 🔒 rule in section 2 is binding:
- Voice: H1 only (silences→0.08 s, NO speed change, NO loudness change). Arabic voice must be 165–180 WPM (min 165) — reached by rewriting / v4 pace tags, NEVER by speeding audio.
- AG's still photo sits in the presenter slot in every render until final; HeyGen is the very last step.
- Omni Flash + Nano Banana only in Google Flow in AG's signed-in Chrome (new tab, project "[Claude] …"); never Higgsfield. Price paid steps and wait for OK. Never publish. Say "I don't know" when unsure; grade medical claims; never invent citations.

STEP 1 — Setup (section 5a). Prove it: make_all.py … M2_exam → "DONE M2_exam video 18.09 audio 18.09", no WARNING. Ask AG for his still photo for the presenter slot; save it as kit_v2/motion_src/ag_photo.png and extend the presenter FX in kit.js to draw that image (fallback: the placeholder) — keep everything else identical.

STEP 2 — Rewrite all 13 Arabic scripts to ≥165 WPM (gate G1). Order: T6_fitness first, then Kill_Testosterone, T2_three, T3_free, T4_quiz, Magnesium_montage, M1_stop, M2_exam, M3_pov, M4_trend, MRI5_twist, MRI6_doctor, PEP4_three.
  For each: start from the section-13 voice text; keep the meaning, AG's words and Gulf dialect (ريال not رجال; medical terms in English); make it flow (joined sentences, fewer commas, drop filler); keep the «ممكن» softenings and the «بيبتايد» spelling; numbers as words for the voice, digits on screen. Show AG all rewritten scripts in Arabic in ONE message (old vs new word count) and wait for approval or edits.

STEP 3 — Re-voice the approved rewrites. Price first (creative_generate_speech with estimate_only) and wait for OK. ElevenLabs connector: eleven_v4, voice czZ4QIPS4BGjseYaUp36, flow NJvM5Mt3e0lRTWJDX6EW, default 2 takes. If a take measures <165 WPM after H1, add a v4 pace tag ([speaking fast, energetic]) and try once more; report the measured WPM per video. Then Scribe transcription → tr_to_align.py → update the storyboard caption lines to the new wording (same scenes/FX, re-anchor FX refs to the new words) → make_all.py with --voice/--align/--story → preview contact-sheet QC (safe zone, RTL, numbers) → full render → send AG each video (they replace the old ones; never show an old render).

STEP 4 — T6 Google Flow (section 11). Tell AG the cost (2 Omni runs × 15 credits = 30; Nano Banana 0) and wait for OK. In a NEW tab of AG's signed-in Chrome: labs.google/fx/tools/flow → new project "[Claude] T6 fitness sexual age" → Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1 → paste Run 1, then Run 2, exactly (ProseMirror box: select-all, then a synthetic ClipboardEvent paste). QC every text frame; regenerate a run once at most, then stop and report. Then 🍌 Nano Banana 2.1 · Image · 9:16 · x1 → I1–I5 one at a time → download 1K Original. Save to C:\Users\LENOVO\t6w\ (T6_HOOK_R1.mp4, T6_HOOK_R2.mp4, T6_NB_I1..I5.jpg) and to G:\My Drive\…\Viral scripts — Magnesium & Testosterone\T6 Flow\.

STEP 5 — Assemble T6: Run 1 → Run 2 → the T6 speech motion video (re-voiced at ≥165 WPM) with I1–I5 as slow push-in B-roll timed to «ريال عمره 60», «شاب عمره 20», «الكتلة العضلية», «VO2 max», «الكرش ومحيط الخصر» (motion labels in the top third), AG's photo in the presenter slot, the hook «60 أقوى من 20؟» on screen through the hooks (overlay it if Flow garbled the Arabic). ffmpeg locally, 1080×1920. Send AG the preview.

STEP 6 — Screen hooks for the other 12 (section-13 proposals): get AG's approval or edits, add each as a first-frame stamp (≤5 words, top, y≥330, not spoken), re-render, present.

STEP 7 — Fact-check list (section 4, item 5) with evidence grades; flag what can't be sourced.

STEP 8 — Only when AG says "final": remove the «مسودة للمراجعة» tag, render 4K (--scale 2), copy to G:\My Drive (Arabic → Motion graphic, or the viral folder). THEN HeyGen on the presenter slot as the last step (AG will re-subscribe; ask before any spend).

STEP 9 — Propose the next topic batch (section 4, item 7): Gulf Arabic, adapted not translated, written for ≥165 WPM, speech first for AG's approval.

Commit new scripts, stories and voices to claude/motion-vlog-handoff with clear messages. Report in short, direct English; give Arabic scripts in Arabic. Stop at every gate and wait for AG.
```

---

## 13. Every approved script, word for word (voice text = exactly as voiced; caption lines = on screen)

### Kill_Testosterone — كيف تقتل التستوستيرون

- Approved H1 length: **40.3 s** · storyboard `kit_v2/stories/Kill_Testosterone.json` · voice `kit_v2/voice/Kill_Testosterone.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **3 خطوات تدمّر Testosterone**

**Voice text (exactly as voiced):**

> تبي تقتل التستوستيرون عندك؟ هذي الطريقة خطوة بخطوة. أول شي ارقد خمس ساعات بس كل ليلة لمدة أسبوع وبينزل لين خمسطعش بالمية لأن التستوستيرون ينصنع وأنت راقد. ثاني شي خلّ الكرش يكبر لأن دهون البطن حرفياً تحوّل التستوستيرون لإستروجين. ثالث شي الكحول اللي ينزّله مباشرة. يقولون التستوستيرون ينزل واحد بالمية كل سنة بعد الأربعين بس الكرش ينزّله الثلث، يعني ممكن تكون عمرك عشرين ومستواك مستوى واحد عمره خمسين. والحل ببلاش، أوزان ثقيلة سكوات وديدلفت، والزنك وفيتامين دي بس إذا عندك نقص. ارقد زين وارفع حديد وخفّف الكرش.

**On-screen caption lines:**

1. تبي تقتل التستوستيرون عندك؟
2. هذي الطريقة خطوة بخطوة
3. أول شي ارقد 5 ساعات بس كل ليلة
4. لمدة أسبوع
5. وبينزل لين 15%
6. لأن التستوستيرون ينصنع وأنت راقد
7. ثاني شي خلّ الكرش يكبر
8. لأن دهون البطن حرفياً تحوّل التستوستيرون لإستروجين
9. ثالث شي الكحول اللي ينزّله مباشرة
10. يقولون التستوستيرون ينزل 1% كل سنة
11. بعد الأربعين
12. بس الكرش ينزّله الثلث
13. يعني ممكن تكون عمرك 20
14. ومستواك مستوى واحد عمره 50
15. والحل ببلاش
16. أوزان ثقيلة سكوات وديدلفت
17. والزنك وفيتامين دي
18. بس إذا عندك نقص
19. ارقد زين وارفع حديد وخفّف الكرش

### T2_three — التستوستيرون — 3 عادات

- Approved H1 length: **23.7 s** · storyboard `kit_v2/stories/T2_three.json` · voice `kit_v2/voice/T2_three.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **العادة رقم 1 صادمة**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> ثلاث عادات تقتل التستوستيرون عندك وأنت ما تدري. رقم ثلاثة، الكحول، ينزّله مباشرة. رقم اثنين، الكرش، دهون البطن تحوّل التستوستيرون لإستروجين. ورقم واحد والأخطر، قلة الرقاد. خمس ساعات بس كل ليلة لمدة أسبوع، وبينزل لين خمسطعش بالمية، لأن التستوستيرون ينصنع وأنت راقد. وأي وحدة منهم عندك؟

**On-screen caption lines:**

1. ثلاث عادات تقتل التستوستيرون عندك
2. وأنت ما تدري
3. رقم ثلاثة.. الكحول
4. ينزّله مباشرة
5. رقم اثنين.. الكرش
6. دهون البطن تحوّل التستوستيرون لإستروجين
7. ورقم واحد والأخطر
8. قلة الرقاد
9. 5 ساعات بس كل ليلة لمدة أسبوع
10. وبينزل لين 15%
11. لأن التستوستيرون ينصنع وأنت راقد
12. وأي وحدة منهم عندك؟

### T3_free — التستوستيرون — الحل ببلاش

- Approved H1 length: **23.8 s** · storyboard `kit_v2/stories/T3_free.json` · voice `kit_v2/voice/T3_free.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **Testosterone… ببلاش؟**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> قبل لا تدفع فلوس على مكملات التستوستيرون، اسمع هذا. الحل ببلاش. أول شي، ارقد زين، لأن التستوستيرون ينصنع وأنت راقد. ثاني شي، ارفع أوزان ثقيلة، سكوات وديدلفت. ثالث شي، خفّف الكرش، لأن دهون البطن تحوّله لإستروجين. والزنك وفيتامين دي؟ بس إذا عندك نقص. ارقد، وارفع حديد، وخفّف الكرش، وخلّ فلوسك في جيبك.

**On-screen caption lines:**

1. قبل لا تدفع فلوس على مكملات التستوستيرون
2. اسمع هذا
3. الحل ببلاش
4. أول شي ارقد زين
5. لأن التستوستيرون ينصنع وأنت راقد
6. ثاني شي ارفع أوزان ثقيلة
7. سكوات وديدلفت
8. ثالث شي خفّف الكرش
9. لأن دهون البطن تحوّله لإستروجين
10. والزنك وفيتامين دي؟
11. بس إذا عندك نقص
12. ارقد وارفع حديد وخفّف الكرش
13. وخلّ فلوسك في جيبك

### T4_quiz — التستوستيرون — سؤال سريع

- Approved H1 length: **24.4 s** · storyboard `kit_v2/stories/T4_quiz.json` · voice `kit_v2/voice/T4_quiz.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **النوم ولا الكرش؟**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> سؤال سريع، شو ينزّل التستوستيرون أكثر؟ إنك ترقد خمس ساعات بس لمدة أسبوع، ولا الكرش؟ الرقاد القليل ينزّله لين خمسطعش بالمية. بس الكرش؟ ينزّله الثلث، لأن دهون البطن حرفياً تحوّل التستوستيرون لإستروجين. والعمر؟ بعد الأربعين ينزل تقريباً واحد بالمية كل سنة بس. يعني الكرش أخطر عليك من العمر. اكتب لي في التعليقات، كنت تتوقع هالشي؟

**On-screen caption lines:**

1. سؤال سريع
2. شو ينزّل التستوستيرون أكثر؟
3. إنك ترقد 5 ساعات بس لمدة أسبوع
4. ولا الكرش؟
5. الرقاد القليل ينزّله لين 15%
6. بس الكرش؟
7. ينزّله الثلث
8. لأن دهون البطن حرفياً
9. تحوّل التستوستيرون لإستروجين
10. والعمر؟
11. بعد الأربعين ينزل تقريباً 1% كل سنة بس
12. يعني الكرش أخطر عليك من العمر
13. اكتب لي في التعليقات
14. كنت تتوقع هالشي؟

### Magnesium_montage — المغنيسيوم

- Approved H1 length: **18.5 s** · storyboard `kit_v2/stories/Magnesium_montage.json` · voice `kit_v2/voice/Magnesium_montage.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **(not proposed yet)**

**Voice text (exactly as voiced):**

> الكل ياخذ مغنيسيوم بس أغلبكم ياخذه للسبب الغلط. المغنيسيوم يشتغل بس مب للشي اللي شريته عشانه. يفيد فعلاً للإمساك ويفيد للوقاية من الشقيقة، أما النوم فخمسين خمسين، والشد العضلي والقلق الدليل عليهم ضعيف. فقبل لا تشتريه اعرف شو تبي منه.

**On-screen caption lines:**

1. الكل ياخذ مغنيسيوم
2. بس أغلبكم ياخذه للسبب الغلط
3. المغنيسيوم يشتغل
4. بس مب للشي اللي شريته عشانه
5. يفيد فعلاً للإمساك
6. ويفيد للوقاية من الشقيقة
7. أما النوم فخمسين خمسين
8. والشد العضلي والقلق
9. الدليل عليهم ضعيف
10. فقبل لا تشتريه
11. اعرف شو تبي منه

### M1_stop — المغنيسيوم — وقف!

- Approved H1 length: **19.6 s** · storyboard `kit_v2/stories/M1_stop.json` · voice `kit_v2/voice/M1_stop.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **Magnesium: تشتريه غلط**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> وقف! لا تشتري علبة المغنيسيوم الثانية قبل تسمع هذا. أغلب الناس ياخذونه عشان النوم أو القلق، وهذي بالضبط الأشياء اللي الدليل فيها أضعف. النوم خمسين خمسين، والقلق والشد العضلي الدليل ضعيف. وين يشتغل صدق؟ الإمساك، والوقاية من الشقيقة. يعني يمكن تكون تدفع فلوس على الشي الغلط.

**On-screen caption lines:**

1. وقف!
2. لا تشتري علبة المغنيسيوم الثانية
3. قبل تسمع هذا
4. أغلب الناس ياخذونه عشان النوم أو القلق
5. وهذي بالضبط الأشياء
6. اللي الدليل فيها أضعف
7. النوم خمسين خمسين
8. والقلق والشد العضلي الدليل ضعيف
9. وين يشتغل صدق؟
10. الإمساك
11. والوقاية من الشقيقة
12. يعني يمكن تكون تدفع فلوس على الشي الغلط

### M2_exam — المغنيسيوم — الامتحان

- Approved H1 length: **18.1 s** · storyboard `kit_v2/stories/M2_exam.json` · voice `kit_v2/voice/M2_exam.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **Magnesium رسب هني**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> حطيت المغنيسيوم في امتحان، وهذي النتيجة. الإمساك؟ ناجح، الدليل حقيقي. الوقاية من الشقيقة؟ ناجح بعد. النوم؟ نص نص، خمسين خمسين. الشد العضلي والقلق؟ راسب، الدليل ضعيف. فإذا أنت شاريه عشان النوم أو القلق، أنت حاط فلوسك على الطالب الغلط.

**On-screen caption lines:**

1. حطيت المغنيسيوم في امتحان
2. وهذي النتيجة
3. الإمساك؟ ناجح
4. الدليل حقيقي
5. الوقاية من الشقيقة؟ ناجح بعد
6. النوم؟ نص نص
7. خمسين خمسين
8. الشد العضلي والقلق؟ راسب
9. الدليل ضعيف
10. فإذا أنت شاريه عشان النوم أو القلق
11. أنت حاط فلوسك على الطالب الغلط

### M3_pov — المغنيسيوم — هذا الفيديو لك

- Approved H1 length: **20.1 s** · storyboard `kit_v2/stories/M3_pov.json` · voice `kit_v2/voice/M3_pov.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **حبة Magnesium كل ليلة؟**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> إذا أنت من الناس اللي كل ليلة ياخذون حبة مغنيسيوم عشان يرقدون، هذا الفيديو لك. الدليل على النوم؟ خمسين خمسين، مب السحر اللي في بالك. والقلق والشد العضلي؟ الدليل ضعيف. بس فيه شي ما أحد يقوله لك، المغنيسيوم فعلاً يفيد للإمساك، ويساعد في الوقاية من الشقيقة. فاستخدمه للشي اللي يشتغل فيه.

**On-screen caption lines:**

1. إذا أنت من الناس اللي كل ليلة
2. ياخذون حبة مغنيسيوم عشان يرقدون
3. هذا الفيديو لك
4. الدليل على النوم؟ خمسين خمسين
5. مب السحر اللي في بالك
6. والقلق والشد العضلي؟
7. الدليل ضعيف
8. بس فيه شي ما أحد يقوله لك
9. المغنيسيوم فعلاً يفيد للإمساك
10. ويساعد في الوقاية من الشقيقة
11. فاستخدمه للشي اللي يشتغل فيه

### M4_trend — المغنيسيوم — الترند

- Approved H1 length: **18.5 s** · storyboard `kit_v2/stories/M4_trend.json` · voice `kit_v2/voice/M4_trend.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **الترند كذب عليك**
- Spoken substitutions (`say`): [['عمرك 20', 'عمرك عشرين'], ['عمره 50', 'عمره خمسين'], ['تقريباً 1%', 'تقريباً واحد بالمية'], ['من 5 ساعات', 'من خمس ساعات'], ['لين 15%', 'لين خمسطعش بالمية'], ['5 ساعات بس', 'خمس ساعات بس'], ['ترقد 5 ساعات', 'ترقد خمس ساعات']]

**Voice text (exactly as voiced):**

> المغنيسيوم صار ترند، والكل يقول إنه يرقّدك، ويهدّيك، ويفك الشد. بس العلم يقول شي ثاني. أقوى دليل عنده؟ مب النوم، ولا القلق. الإمساك، والوقاية من الشقيقة. النوم خمسين خمسين، والقلق والشد العضلي الدليل ضعيف. الترند باع لك الشي الغلط.

**On-screen caption lines:**

1. المغنيسيوم صار ترند
2. والكل يقول إنه يرقّدك
3. ويهدّيك ويفك الشد
4. بس العلم يقول شي ثاني
5. أقوى دليل عنده؟
6. مب النوم ولا القلق
7. الإمساك
8. والوقاية من الشقيقة
9. النوم خمسين خمسين
10. والقلق والشد العضلي الدليل ضعيف
11. الترند باع لك الشي الغلط

### MRI5_twist — الرنين لكامل الجسم — رحت تطمّن

- Approved H1 length: **29.4 s** · storyboard `kit_v2/stories/MRI5_twist.json` · voice `kit_v2/voice/MRI5_twist.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **MRI طمّنك… ولا خوّفك؟**
- Spoken substitutions (`say`): [['BPC-157', 'بي بي سي مية وسبعة وخمسين']]

**Voice text (exactly as voiced):**

> رحت تسوي رنين لكامل الجسم عشان تطمّن… ورجعت بسؤال جديد. لأن أي شي مب واضح في الصورة بيوديك لفحوصات أكثر، ومواعيد أكثر، وخوف أكثر. فإذا أنت سليم وما عندك خطورة عالية؟ نصيحتي: لا تسويه بشكل روتيني. عندك عرض أو شي مقلقك؟ افحصه، واختار الفحص اللي يجاوب على هالسؤال بالذات، والتزم بالفحوصات الدورية حسب عمرك وخطورتك. لأن فحوصات أكثر، مب معناته رعاية أحسن. ارسله لواحد يفكر يسويه.

**On-screen caption lines:**

1. رحت تسوي رنين لكامل الجسم عشان تطمّن..
2. ورجعت بسؤال جديد
3. لأن أي شي مب واضح في الصورة
4. بيوديك لفحوصات أكثر
5. ومواعيد أكثر
6. وخوف أكثر
7. فإذا أنت سليم وما عندك خطورة عالية؟
8. نصيحتي.. لا تسويه بشكل روتيني
9. عندك عرض أو شي مقلقك؟ افحصه
10. واختار الفحص اللي يجاوب على هالسؤال بالذات
11. والتزم بالفحوصات الدورية حسب عمرك وخطورتك
12. لأن فحوصات أكثر.. مب معناته رعاية أحسن
13. ارسله لواحد يفكر يسويه

### MRI6_doctor — الرنين لكامل الجسم — كدكتور

- Approved H1 length: **27.7 s** · storyboard `kit_v2/stories/MRI6_doctor.json` · voice `kit_v2/voice/MRI6_doctor.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **فحص ما أنصح فيه**
- Spoken substitutions (`say`): [['BPC-157', 'بي بي سي مية وسبعة وخمسين']]

**Voice text (exactly as voiced):**

> كدكتور، هذا فحص ما أنصح فيه إذا أنت سليم: الرنين لكامل الجسم بس عشان تطمّن. لأن أي شي مب واضح في الصورة بيوديك لفحوصات أكثر، ومواعيد أكثر، وخوف أكثر. رحت تدوّر الطمأنينة، ورجعت بسؤال جديد. عندك عرض أو شي مقلقك؟ افحصه، واختار الفحص اللي يجاوب على هالسؤال بالذات، والتزم بالفحوصات الدورية حسب عمرك وخطورتك. فحوصات أكثر، مب معناته رعاية أحسن.

**On-screen caption lines:**

1. كدكتور.. هذا فحص ما أنصح فيه
2. إذا أنت سليم
3. الرنين لكامل الجسم بس عشان تطمّن
4. لأن أي شي مب واضح في الصورة
5. بيوديك لفحوصات أكثر
6. ومواعيد أكثر.. وخوف أكثر
7. رحت تدوّر الطمأنينة
8. ورجعت بسؤال جديد
9. عندك عرض أو شي مقلقك؟ افحصه
10. واختار الفحص اللي يجاوب على هالسؤال بالذات
11. والتزم بالفحوصات الدورية حسب عمرك وخطورتك
12. فحوصات أكثر.. مب معناته رعاية أحسن

### PEP4_three — الببتيدات — 3 أسئلة قبل الإبرة

- Approved H1 length: **35.9 s** · storyboard `kit_v2/stories/PEP4_three.json` · voice `kit_v2/voice/PEP4_three.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **Peptide أونلاين؟ 3 أسئلة**
- Spoken substitutions (`say`): [['BPC-157', 'بي بي سي مية وسبعة وخمسين']]

**Voice text (exactly as voiced):**

> قبل لا تحقن بيبتايد اشتريته أونلاين، اسأل نفسك ثلاث أسئلة. بس أول، شو هي البيبتايدات؟ سلاسل قصيرة من الأحماض الأمينية. الإنسولين واحد منها، وأدوية مثل السيماغلوتايد لها دليل في استخدامات معيّنة. بس هذا ما يعني إن كل بيبتايد ينباع أونلاين صح. السؤال الأول: أي منتج بالضبط؟ الثاني: لأي حالة؟ والثالث: وين الدليل على البشر؟ لأن بي بي سي مية وسبعة وخمسين مثلاً، دليله على البشر قليل، وسلامته ونقاوته علامة استفهام. ومكتوب عليه للأبحاث فقط؟ هذا مب دليل إنه آمن لك. احفظ هالأسئلة قبل أي إبرة.

**On-screen caption lines:**

1. قبل لا تحقن ببتيد اشتريته أونلاين
2. اسأل نفسك ثلاث أسئلة
3. بس أول.. شو هي الببتيدات؟
4. سلاسل قصيرة من الأحماض الأمينية
5. الإنسولين واحد منها
6. وأدوية مثل السيماغلوتايد
7. لها دليل في استخدامات معيّنة
8. بس هذا ما يعني إن كل ببتيد ينباع أونلاين صح
9. السؤال الأول.. أي منتج بالضبط؟
10. الثاني.. لأي حالة؟
11. والثالث.. وين الدليل على البشر؟
12. لأن BPC-157 مثلاً
13. دليله على البشر قليل
14. وسلامته ونقاوته علامة استفهام
15. ومكتوب عليه «للأبحاث فقط»؟
16. هذا مب دليل إنه آمن لك
17. احفظ هالأسئلة قبل أي إبرة

### T6_fitness — اللياقة تحدد عمرك الجنسي

- Approved H1 length: **25.7 s** · storyboard `kit_v2/stories/T6_fitness.json` · voice `kit_v2/voice/T6_fitness.mp3`
- Proposed screen hook (≤5 words, not yet applied unless noted): **60 أقوى من 20؟ (already built into the video)**
- Spoken substitutions (`say`): [['عمره 60', 'عمره ستين'], ['عمره 20', 'عمره عشرين'], ['VO2 max', 'الفي-أو-تو ماكس']]

**Voice text (exactly as voiced):**

> عمرك الجنسي مب مكتوب في جوازك. ريال عمره ستين ويتمرن بانتظام، ممكن يكون أقوى جنسياً من شاب عمره عشرين تمرينه قليل أو ما يتمرن. ليش؟ لأن اللي عمره ستين ممكن يكون التستوستيرون عنده أعلى، والأداء يعتمد على الكتلة العضلية واللياقة البدنية، الفي-أو-تو ماكس. واللي ينزّل التستوستيرون هو الكرش ومحيط الخصر. القدرة الجنسية تحددها أنت، مب عمرك.

**On-screen caption lines:**

1. عمرك الجنسي مب مكتوب في جوازك
2. ريال عمره 60 ويتمرن بانتظام
3. ممكن يكون أقوى جنسياً
4. من شاب عمره 20 تمرينه قليل أو ما يتمرن
5. ليش؟
6. لأن اللي عمره 60 ممكن يكون التستوستيرون عنده أعلى
7. والأداء يعتمد على الكتلة العضلية
8. واللياقة البدنية VO2 max
9. واللي ينزّل التستوستيرون هو الكرش ومحيط الخصر
10. القدرة الجنسية تحددها أنت مب عمرك


---

## 14. Dropped (do not rebuild unless AG asks)

- **T1_age** «ممكن تكون عمرك عشرين، والتستوستيرون عندك مثل واحد عمره خمسين…» — dropped by AG (number-line letter/timing issues; "not going to waste time to fix it").
