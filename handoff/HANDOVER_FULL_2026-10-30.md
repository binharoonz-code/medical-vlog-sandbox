# AG Arabic Medical Motion Vlogs — FULL HANDOVER v3 (30 Oct 2026)

**Self-contained.** This one file has everything needed to continue on a **local Claude session on AG's Windows PC (with Claude in Chrome)** or in a cloud session: who and what, locked rules, accounts and IDs, every link, exact status, the setup, the method, every Omni Flash and Nano Banana prompt, the QC gates, the assembly, every approved script word for word, pending decisions, and the **PUSH PROMPT (section 0)**.
It supersedes `HANDOVER_FULL_2026-10-27.md` (kept for history) and includes AG's 30 Oct decisions: **Arabic voice 165–180 WPM (min 165) by rewriting, never speed-up**, and **AG's photo in the presenter slot until final, HeyGen last**.

---

## 0. PUSH PROMPT — paste into a new LOCAL session on AG's PC

```
You are continuing AG's Arabic medical motion-vlog project on AG's Windows PC (C:\Users\LENOVO), with Claude in Chrome.
FIRST read the full handover: repo binharoonz-code/medical-vlog-sandbox, branch claude/motion-vlog-handoff, file handoff/HANDOVER_FULL_2026-10-30.md
(clone: git clone -b claude/motion-vlog-handoff https://github.com/binharoonz-code/medical-vlog-sandbox.git C:\Users\LENOVO\mvs).
Obey every 🔒 rule in section 2. Above all: H1 voice only (silences to 0.08 s, NO speed change, NO loudness change); never show AG an old render; Omni Flash and Nano Banana ONLY in Google Flow in AG's signed-in Chrome, never Higgsfield or any other generator; price every paid step and wait for AG's OK; never publish; only show AG work that passed QC; label evidence and say "I don't know" when unsure.

STEP 1 — Engine setup on this PC (section 6; Git Bash make_all.sh or PowerShell make_all.py). Prove it: M2_exam must print "DONE M2_exam video 18.09 audio 18.09" with no WARNING.
STEP 2 — Google Flow, in a NEW tab of AG's signed-in Chrome (section 9). Project "[Claude] Hooks squeezed 12".
  a) The 4 squeezed hook runs R1–R4 (section 9B). AG APPROVED: 4 runs = 60 credits. Settings Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1.
     Apply the QC gate (section 10) to every run. On a fail, regenerate that run ONCE; a second fail means stop and report the failed item. Never show a failing run.
  b) T6: Run 1 + Run 2 (section 9A) = 30 credits. NOT yet approved: tell AG "30 credits" and wait for OK. Then Nano Banana I1–I5 (0 credits) in project "[Claude] T6 fitness sexual age".
  Save to C:\Users\LENOVO\t6w\ as HOOK_R1..R4.mp4, T6_HOOK_R1.mp4, T6_HOOK_R2.mp4, T6_NB_I1..I5.jpg, and to Drive folder 1VBnYAy5TiSSxK6BXdzRc-aUi82N_5eF_ / "T6 Flow".
STEP 3 — Rewrite all 13 Arabic scripts to 165–180 WPM, minimum 165 (rule 2, DECIDED; gate G1). Order: T6_fitness, Kill_Testosterone, T2_three, T3_free, T4_quiz, Magnesium_montage, M1_stop, M2_exam, M3_pov, M4_trend, MRI5_twist, MRI6_doctor, PEP4_three. Start from the section-12 voice text; keep the meaning, AG's words, Gulf dialect (ريال), English medical terms, the «ممكن» softenings and «بيبتايد»; make it flow (joined sentences, fewer commas, no filler). Show AG all rewrites in Arabic in ONE message (old vs new word count) and wait for approval or edits.
STEP 4 — Re-voice the approved rewrites: price first (creative_generate_speech estimate_only), wait for OK; eleven_v4, voice czZ4QIPS4BGjseYaUp36, flow NJvM5Mt3e0lRTWJDX6EW, default 2 takes. Measure WPM after H1; if under 165, add a v4 pace tag ([speaking fast, energetic]) and retry once; report the WPM per video. Then Scribe → tr_to_align.py → update caption lines and re-anchor FX refs in the chosen storyboards (D1) → make_all.py --voice/--align/--story → preview QC → full render. AG's photo in the presenter slot (D5) as soon as he sends it (save as kit_v2/motion_src/ag_photo.png and make the presenter FX draw it).
STEP 5 — Assemble (section 11). For each of the 12 videos, cut its 3.3 s hook scene from R1–R4 (cut map in section 9B, set cut points by eye), overlay kit_v2/headlines/<name>.png, and put it in front of the RE-VOICED motion video. T6: Run 1 → Run 2 → T6 motion video, with I1–I5 as push-in B-roll on their words.
STEP 6 — Your own QC on every assembled video (section 10, final check). Send AG only the ones that pass, grouped by topic. Report failures in one line each.
STEP 7 — Continue the pending gates in section 4, one at a time: D1 (if still unclear), fact-check list, "final" (remove the draft tag, 4K, copy to G:\My Drive), then HeyGen on the presenter slot as the VERY LAST step (ask before any spend), then the next topic batch (Gulf Arabic, written for ≥165 WPM, speech first, G1).
Report in short, direct English; give AG's Arabic scripts in Arabic. Never publish. Commit new kit/scripts to the same branch with clear messages.
```

**Cloud variant:** a cloud session can't reach Flow. It does steps 1, 3, 4 and 5 once AG has put the clips in Drive "T6 Flow" or sent them in chat.

---

## 1. Who and what

- **AG**: Dubai emergency physician and creator (TikTok, Instagram Reels, YouTube Shorts). Makes Gulf (Emirati) Arabic and English medical vlogs.
- **Product:** 9:16 **kinetic motion-graphic** Arabic vlogs. Every caption word animates exactly when spoken, over icons, gauges, cards and stamps in a navy style. The voice is AG's **ElevenLabs clone**.
- **New (30 Oct): every video opens with an Omni Flash drama hook** (AG's pattern, section 9B) with its Arabic screen hook overlaid, then the motion video.
- **Style:** navy kinetic is the default. Don't set `THEME`; pop, paper, neon and editorial were rejected.
  - Palette: bg `#0B1626`, ink `#F7F9FC`, teal `#2EC4B6`, red `#FF4D5A`, gold `#FFD23F`, muted `#8DA2BC`.
  - Fonts: Lalezar, Tajawal, Inter (all in the engine's `motion/fonts`).
- **Draft tag** «مسودة للمراجعة» sits small, top-right, on every render. Remove it and render 4K (`--scale 2`) **only when AG says "final"**.

## 2. 🔒 Locked rules (never break them)

1. **Voice method H1 (locked 22 Oct).**
   - Use the ElevenLabs take exactly as generated.
   - The only edit: silences of 0.25 s or longer are shortened to **0.08 s**.
   - **No speed change** (no rubberband or atempo) and **no loudness change**.
   - `pace_165.py` does H1 by default. Never set `ALLOW_STRETCH` or `NORM`.
2. **🔒 Pace, DECIDED by AG on 30 Oct: the Arabic voice must run at 165–180 WPM, minimum 165.**
   - Get there by **rewriting the script** to be more fluid and denser (joined sentences, fewer commas, no filler), plus **eleven_v4 pace tags** if needed (`[speaking fast, energetic]`).
   - **Never by speeding up audio** (rule 1).
   - Measure WPM on the H1 output: alpha words ÷ seconds × 60.
   - All 13 current videos (130–145 WPM) **must be rewritten (G1) and re-voiced**.
3. **Presentation:** never show AG an old render. Rebuild with the current locked methods first.
4. **Video generation (Omni Flash) and Nano Banana run only in Google Flow**, in AG's signed-in Chrome, driven by a local Claude session with Claude in Chrome. **Never Higgsfield** or any other generator for the medical vlogs. Cloud sessions can't reach Flow.
5. **🔒 AG's speaking parts are motion graphics**, with **AG's still photo in the presenter slot in every render until the video is final** (AG, 30 Oct).
   - **HeyGen is the very last step**, after AG approves the final.
   - Until AG sends the photo, use the placeholder «صورة د. AG» and ask him for it.
6. **Hooks (omni-clip-pipeline v3.3) + the SQUEEZE RULE:**
   - **3–5 s per hook, 2–3 hooks per 10 s run.** Never spend one 10 s run on one hook when it can carry 3. (AG, 30 Oct: 12 hooks = 4 runs = 60 credits, not 180.)
   - Each hook has one dramatic acted action, hyper-expressive faces, crash zooms and whip pans, and ASMR.
   - The screen hook is ≤5 words, never spoken, top third, from the first frame, and keeps medical terms in English.
7. **AG's hook pattern (30 Oct):** a man looks at a result on his phone → the result is in **red with a steep red down arrow** → crash zoom, **he screams, sweating, presses the phone to his head** → one short line leading into the speech.
   - Serious drama and expressive faces. **No comedy, no costumes, no silly set-ups.** AG rejected the v1 set-ups (quiz show, bottle costume, influencer) in his words: «ما بسوي لي فيديوهات … غبية».
   - Go back to the agreed pattern.
8. **Omni prompt hygiene:**
   - Scene headers carry the time only ("SCENE 2, 3.3–6.6 s:").
   - "Exactly one on-screen text per scene" (in squeezed runs, that text is the phone screen).
   - Props that could carry writing are "plain blank".
   - No negative instructions ("no…", "without…").
   - No location names, camera or lens names, branding, credentials, or study names and years.
   - Every line is spoken once.
   - Sharp words (kill, alcohol, injection, sexual) stay out of the spoken lines (Lane 3 SPLIT).
   - Regenerate once at most, then stop and report.
9. **QC before AG sees anything** (AG, 30 Oct: "only push it to me if it is up to standard"). Section 10.
10. **Spending:** price every paid step first and wait for AG's OK. **Never publish.**
11. **Security:** never ask for or accept API keys or tokens in chat.
12. **Medical claims:** grade every claim Strong, Moderate or Weak. Flag unverified claims. Never invent a citation. If sources conflict, say so.
13. **Working style:** say "I don't know"; label sources and estimates; separate fact from inference; ask when critical context is missing; correct mistakes immediately; keep replies short.

## 3. Accounts, IDs, links (none of these are secrets)

| What | Value / link |
|---|---|
| Repo + branch | https://github.com/binharoonz-code/medical-vlog-sandbox/tree/claude/motion-vlog-handoff |
| Clone | `git clone -b claude/motion-vlog-handoff https://github.com/binharoonz-code/medical-vlog-sandbox.git` |
| Motion engine | https://github.com/majedphotos/video-ad-editor, commit **cf39f0f** (engine dir `video-ad-editor/video-ad-editor/motion`) |
| ElevenLabs | Workspace "abdulla's Workspace", Creator plan. Arabic voice **"Emirati thick" `czZ4QIPS4BGjseYaUp36`**, model **`eleven_v4`**. English voice "Me english" `OTOjvbcbsnhMXZldcJmT`. Flow used for every generation: `NJvM5Mt3e0lRTWJDX6EW`. Use the ElevenLabs connector, not Zapier (its task limit was hit). |
| Drive: Arabic «Motion graphic» (first batch, 4K) | https://drive.google.com/drive/folders/1vZhaaaDEl0ruD_tBl3Flq8voK54X_B0d |
| Drive: "Viral scripts — Magnesium & Testosterone" (deliveries + "T6 Flow") | https://drive.google.com/drive/folders/1VBnYAy5TiSSxK6BXdzRc-aUi82N_5eF_ |
| Scripts Doc (still says ~160 WPM; update it to H1) | https://docs.google.com/document/d/1KybThSJgQxf2UXzrzfLl_3aEleOZTRN_HcbFoBpunz4 |
| Recovered speeches (next topics) | https://drive.google.com/drive/folders/1DMVLigLsmklAdoG3Wx10hs-1oUBPxifj (a folder or file ID; open it to see which) |
| Google Flow | Open from AG's Chrome bookmarks or history, signed in. (I believe the URL is https://labs.google/fx/tools/flow, unverified from the cloud.) |
| AG's PC | Windows, `C:\Users\LENOVO`. Drive synced at `G:\My Drive`. Working folders `C:\Users\LENOVO\n08w`, `C:\Users\LENOVO\t6w` |
| Rule files | `N08_RULES_2026-10-24.md`, `VOICE_METHODS_EN_AR_2026-10-24.md`, `omni-clip-pipeline_v3.3_SKILL.md`, in Drive (N08 folder) and `…\scratch-2026-10-21-d54afe\N08_review\` |
| AG look reference (identity sheet not found yet) | `C:\Users\LENOVO\OneDrive\Desktop\Character sheet face profile 2\_handoff_refs\AG_Soul_2_Character.md`: navy scrubs, black full-rim rectangular glasses, short beard, DJI clip-on mic. AG is never generated on screen in the hooks. |

- Drive connector **can't upload video**. Videos go through `G:\My Drive` sync (PC) or AG by hand.
- Flow paste trick: the prompt box is a ProseMirror div. Select-all, then paste with a synthetic ClipboardEvent.
- Name Flow projects "[Claude] …".
- Flow Omni settings: **Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1 = 15 credits**. Nano Banana: **🍌 Nano Banana 2.1 · Image · 9:16 · x1 = 0 credits**, download "1K Original". The Ultra plan had about 9,700 credits recorded in another thread (unverified now).
- Price estimate: 30 credits ≈ AED 1.10 (from the 27 Oct thread), so 60 ≈ AED 2.2. Scaled estimate.

## 4. STATUS (30 Oct 2026)

**Done this session (cloud):**
- Engine set up and proven: M2_exam rebuilt to `DONE M2_exam video 18.094 audio 18.094`, no WARNING.
- **AG's test: all 13 motion videos re-designed from scratch** (`kit_v2/stories_scratch/`, generated by `gen.py`) and rendered (`out/scratch/`, not in git, re-render with section 6). Sent to AG.
- **Reference set** (approved storyboards `kit_v2/stories/`) rebuilt with H1 (`out/reference/`). Sent to AG with a side-by-side table.
- Lengths are identical in both sets because both use the same voice: Kill 40.27 · T2 23.75 · T3 23.76 · T4 24.39 · Montage 18.51 · M1 19.64 · M2 18.09 · M3 20.08 · M4 18.48 · MRI5 29.41 · MRI6 27.66 · PEP4 35.88 · T6 25.68 s. Video = audio on all 26.
- Scratch-set differences:
  - hook stamp on every first frame (reference: T6 only)
  - 1–2 more scenes per video
  - week chart and clock for "5 hours"
  - Testosterone/Estrogen in English
  - pill-chips
  - evidence gauges
- Omni hook pack: v1 (comic) rejected by AG → v2 (AG's pattern) → **v3 squeezed: 12 hooks in 4 runs, 60 credits. AG APPROVED and asked for generation + QC.** It can't run from the cloud, so it's waiting on the PC session.
- New tools: `scripts/preview.sh` (QC contact sheet), `scripts/assemble_hook.sh` (cuts a scene from a squeezed run, overlays the headline PNG, concats with the motion video), `scripts/make_headlines.js` plus `kit_v2/headlines/*.png` (13 Arabic screen hooks, rendered and checked RTL), and `STORIES=` support in `make_all.sh`.
- T6 Flow pack for the PC: `handoff/PC_SESSION_T6_FLOW.md`.

**Decisions — open or ambiguous (ask AG, one at a time):**
- **D1 Motion design per video: scratch or reference?**
  - AG said "I've seen them, not bad, I think they're good now… apply them to the pipeline", then «ارجع للأصل… أبغى فيديوهات على نفس اللي احنا اتفقنا عليهم».
  - **Unclear which set.** The last session assumed «الأصل» = the approved reference set (the pipeline default) but didn't get confirmation. Ask before the final assembly.
  - If AG picks scratch: `STORIES=$KIT/stories_scratch`.
- **D2 Screen hooks for the 12 videos:** the headlines in section 9B were proposed in section 13 and are part of the v3 pack AG approved. Treat them as **approved with the pack**, but show them in the first assembled preview. Magnesium_montage's «تاخذ Magnesium غلط؟» is new (Claude's).
- **D3 Pace: DECIDED (30 Oct).** 165–180 WPM, minimum 165, by rewriting (and v4 pace tags), never by speeding up. All 13 scripts get rewritten → AG approves (G1) → re-voice (price first) → rebuild.
- **D4 T6 Omni runs (30 credits):** not explicitly approved yet.
- **D5 AG's still photo** for the presenter slot: not received. AG confirmed it stays in the slot until final; HeyGen comes last.
- **D6 Fact-check list:** sent to AG with grades (below). No edits decided.
- **D7 "Final":** when AG says it, remove the draft tag and render 4K (`--scale 2`). AG uploads to Drive.
- **D8 Next topics** (after final):
  - myth-busters: T15 knuckles, T16 shower→AC, T17 urine colour, T18 sugar and hyperactivity, T19 detox, T20 carrots, T21 dim light, T22 sweat, T23 gum, T24 antibiotics for flu
  - Mounjaro/Ozempic S1–S6
  - council-pass topics: ED and the heart, women's heart-attack signs, paracetamol overdose
  - Gulf Arabic, adapted not translated, speech first for G1.

**Fact-check grades given to AG (from training knowledge, no citations attached; verify before "final"):**
- −15% testosterone after a week of 5-hour sleep: Moderate (small, short trial in young men, ~10–15%).
- Belly fat ↔ lower T: Strong. **"By a third": unverified → Weak, soften.**
- "Age 20 with the level of a 50-year-old": Weak (illustration).
- T4 "belly fat worse than age" and T2 "sleep the most dangerous": editorial inferences, Weak. Suggest «ممكن».
- ~1%/year after 40: Moderate–Strong.
- MRI6: incidental findings → more tests: Strong–Moderate. «ما أنصح فيه» is AG's opinion. No major guideline known to recommend routine whole-body MRI for healthy people (not re-checked).
- T6: fitness/VO2max ↔ erectile function Moderate; waist ↔ low T Strong–Moderate; "fit 60 > inactive 20": Weak, hence «ممكن».

**Dropped:** T1_age (don't rebuild unless AG asks). The first batch (ice water, phone and hemorrhoids, IV NAD, weekend sleep, jet lag, caffeine, pimple) is done, 4K, in Drive, pre-H1.

## 5. Repo map (branch `claude/motion-vlog-handoff`)

| Path | What |
|---|---|
| `handoff/HANDOVER_FULL_2026-10-30.md` | **this file** |
| `handoff/HANDOVER_FULL_2026-10-27.md` | previous handover (history) |
| `handoff/OMNI_HOOKS_12.md` | squeezed hook pack v3 + QC gate (also inlined in section 9B) |
| `handoff/PC_SESSION_T6_FLOW.md` | T6 Flow pack (also inlined in section 9A) |
| `handoff/kit_v2/scripts/pace_165.py` | 🔒 H1 voice: `pace_165.py in.mp3 out.wav 1 1` (make_all passes 1 1 = no stretch). Writes `out.wav.map.json`. |
| `handoff/kit_v2/scripts/build_note.py` | storyboard + voice + alignment → engine project. `ALIGN=<align.json>`; arg 5 = pace map |
| `handoff/kit_v2/scripts/tr_to_align.py` | Scribe `words.json` + voice text → alignment |
| `handoff/kit_v2/scripts/make_all.sh` | pace → build → render → mux. Env `KIT ENGINE OUT WORK STORIES CHROME` |
| `handoff/kit_v2/scripts/make_all.py` | **Same pipeline, cross-platform (PowerShell/Windows, no Git Bash needed).** `python make_all.py --kit K --engine E --out O --work W [--voice mp3 --align json --story json] [--scale 2] NAME...`. Tested 30 Oct: M2_exam audio byte-identical to the approved version. |
| `handoff/reference_previews/<name>.mp4` | 540p previews of the 13 approved H1 renders, for visual reference |
| `handoff/kit_v2/scripts/preview.sh` | pace → build → contact sheet with safe zone (frame 0 + 85% of each scene) |
| `handoff/kit_v2/scripts/assemble_hook.sh` | `HEADLINE=png assemble_hook.sh out.mp4 motion.mp4 run.mp4@start-end [...]` |
| `handoff/kit_v2/scripts/make_headlines.js` | renders `kit_v2/headlines/*.png` (needs Playwright) |
| `handoff/kit_v2/headlines/<name>.png` | 13 transparent 1080×1920 Arabic screen-hook overlays (gold stamp, y≈430) |
| `handoff/kit_v2/stories/<name>.json` | 13 **approved** storyboards (reference) |
| `handoff/kit_v2/stories_scratch/` | 13 **scratch** storyboards + `gen.py` (edit gen.py, then `python3 gen.py`) |
| `handoff/kit_v2/voice/<name>.mp3 / .align.json / .txt / .words.json` | approved voice takes and their timing |
| `handoff/kit_v2/motion_src/lib.js, kit.js` | drawing library and FX vocabulary |
| `handoff/kit_v2/engine_patch/render_js.patch` | adds `--no-sandbox` when running as root (harmless on Windows) |

## 6. Setup

**Windows PC (local session).** Needs Git for Windows (Git Bash), Node 18+, Python 3, ffmpeg on PATH, Google Chrome. Run the commands in **Git Bash**:

```bash
cd /c/Users/LENOVO
git clone -b claude/motion-vlog-handoff https://github.com/binharoonz-code/medical-vlog-sandbox.git mvs
git clone https://github.com/majedphotos/video-ad-editor.git vae && cd vae && git checkout cf39f0f
cd video-ad-editor && npm install --no-audit --no-fund --ignore-scripts && cd ..
git apply ../mvs/handoff/kit_v2/engine_patch/render_js.patch
export CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"   # check the path exists
export KIT=/c/Users/LENOVO/mvs/handoff/kit_v2 ENGINE=/c/Users/LENOVO/vae/video-ad-editor/motion
cd /c/Users/LENOVO/mvs && OUT=$PWD/out/reference WORK=$PWD/work bash $KIT/scripts/make_all.sh M2_exam
# must print: DONE M2_exam video 18.09… audio 18.09…  and no WARNING
```

- If python is `py` on Windows, alias it: `alias python3=py`.
- If ffmpeg is missing: `winget install Gyan.FFmpeg`.
- For make_headlines.js only: `npm i playwright && npx playwright install chromium`. The PNGs are already committed, so this is only needed for new headlines.

**Windows without Git Bash (PowerShell), using `make_all.py`:**
```powershell
$env:CHROME = "C:\Program Files\Google\Chrome\Application\chrome.exe"
python C:\Users\LENOVO\mvs\handoff\kit_v2\scripts\make_all.py --kit C:\Users\LENOVO\mvs\handoff\kit_v2 --engine C:\Users\LENOVO\vae\video-ad-editor\motion --out C:\Users\LENOVO\mvs\out\reference --work C:\Users\LENOVO\mvs\work M2_exam
```
- If Chrome renders black frames on Windows, remove `--use-angle=metal` from `render.js` launch args locally.

**Cloud:** the same, with `CHROME=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome` (check with `ls /opt/pw-browsers`).

**Commands:**

```bash
OUT=$PWD/out/reference WORK=$PWD/work bash $KIT/scripts/make_all.sh                         # all 13, approved designs
STORIES=$KIT/stories_scratch OUT=$PWD/out/scratch WORK=$PWD/work_scratch bash $KIT/scripts/make_all.sh   # scratch designs
STORIES=... WORK=... bash $KIT/scripts/preview.sh M2_exam T6_fitness                          # contact sheets with safe zone
(cd $ENGINE && node render.js <proj> all --fresh --scale 2)                                    # 4K, only on "final"
```

**Engine notes:**
- The draft tag lives in `motion_src/lib.js`, `bg()`: the line with `'مسودة للمراجعة'`. On "final", comment it out, rebuild and render with `--scale 2`.
- Long caption lines reach slightly into TikTok's right-side UI zone in both sets (engine caption maxWidth 900). This is known and hasn't been changed.

## 7. How a motion video is made (method, unchanged from 27 Oct)

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

- **Mixed-direction text (30 Oct):** numbers inside Arabic FX text: wrap them in LRI…PDI (U+2066/U+2069), e.g. `iso("−15%")` in gen.py. Checked: renders "−15%", not "%15−".
- **An icon's ✗/✓ mark ignores `until`.** If an icon disappears mid-scene, its mark stays on screen. Use separate x positions or separate scenes.
- **eq op "VS"** is wide (Inter 170 px) and overlaps a long A label. Use "?" or keep labels short.
- **Stamp hooks wider than ~1000 px overflow.** Keep size ≤80 and ≤5 words. Check frame 0 in preview.
- **Omni scene edges drift.** Set the cut points of squeezed runs by eye (scrub to the whip pan), never blindly at 3.3/6.6.

## 9. Google Flow generation packs

### 9A. T6 pack (section 11 of 27 Oct, unchanged; 2 runs = 30 credits, NOT yet approved; Nano Banana I1–I5 = 0 credits)

#### A. Omni Flash hook runs — 2 runs × 10 s, 3 hooks each

Settings: **Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1** = 15 Flow credits per run → **30 credits** (≈ AED 1.10). Regenerate a run **once at most**, then stop and report.
QC every text frame: exactly one on-screen text per scene; props stay plain blank.

#### Run 1 — «وين ولدك المعرس؟»

```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. A formal Gulf Arab engagement visit in a traditional majlis: cushioned floor seating, a brass tray with an Arabic coffee pot and small cups, warm evening light.
Characters, identical in every scene: the bride's father, about 60, grey beard, white kandura and white ghutra; the bride's brother, about 30, white kandura; the suitor, a 65-year-old Emirati man with full white hair, a neatly trimmed white beard, white kandura and white ghutra, broad shoulders and a visibly athletic, muscular build.
Exactly one on-screen text per scene: the headline «60 أقوى من 20؟» in bold white Arabic letters in the top third, from the first frame and held through every scene.

SCENE 1, 0–3.3 s: The father pours coffee (ASMR pour and cup clink), glances toward the door with raised eyebrows and asks in Gulf Emirati Arabic: «وين ولدك المعرس؟»
SCENE 2, 3.3–6.6 s: Crash zoom onto the suitor, chest out, proud grin: «أنا اللي جاي أخطب!»
SCENE 3, 6.6–10 s: The suitor hands over a plain blank white card; whip pan to the father reading it, eyes wide: «خمسة وستين؟!» The whole majlis bursts out laughing.
Every line is spoken once.
```

#### Run 2 — the backflip

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

#### B. Nano Banana B-roll images — 5 images, 0 credits

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



### 9B. Squeezed hook pack v3: 12 hooks in 4 runs = 60 credits (APPROVED by AG, 30 Oct)

Squeeze rule (locked rule 6, omni-clip-pipeline v3.3): **3–5 s per hook, 2–3 hooks per 10 s run.** Each scene below is a complete hook for one video, so 12 hooks fit in **4 runs = 60 credits**, not 180 (≈ AED 2.2, an estimate scaled from the handover's 30 credits ≈ AED 1.10). In assembly, each scene is cut out and put in front of its own video.
AG's pattern in every hook: the phone shows a result in red with a large red arrow plunging down → crash zoom, he screams, sweating, pressing the phone to his head → one short line leading into the speech. It's serious drama, never comedy. AG is never on screen.
Settings: Google Flow on AG's PC only, **Omni 1.1 Flash · Video · Frames · 9:16 · 720p · 10 s · x1 = 15 credits per run.** Regenerate a run once at most, then stop and report.
Text: each scene's only text is the phone result, in English. Each video's Arabic headline is overlaid in assembly from the first frame.
T6 keeps its own section-9A runs (2 runs, 30 credits, still awaiting AG's OK).

Shared character for all 4 runs (same man, so the 12 hooks look like one series):
`an Emirati man about 35, short black beard, white kandura, hyper-expressive face`

---

#### RUN 1 — Kill_Testosterone · T2_three · T3_free
```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. Character, identical in every scene: an Emirati man about 35, short black beard, white kandura.
Exactly one on-screen text per scene: the phone screen.

SCENE 1, 0–3.3 s: Living room at night, phone ding; close-up of his phone screen showing "Testosterone" in bold red with a large red arrow plunging downward; crash zoom as he screams, sweating, pressing the phone to his head: «يا الله شو أسوي؟ ليش نازل عندي؟!»
SCENE 2, 3.3–6.6 s: Dark bedroom at 3 in the morning; close-up of the phone screen showing "Testosterone LOW" in bold red with a large red arrow plunging downward; he sits bolt upright, sweating, phone pressed to his forehead: «أنا شو مسوي غلط؟!»
SCENE 3, 6.6–10 s: Shop aisle of plain blank white supplement tubs; close-up of the phone screen showing "Testosterone" in bold red with a large red arrow plunging downward; his basket drops, tubs scatter: «يعني لازم أشتري هذا كله؟!»
Every line is spoken once.
```

#### RUN 2 — T4_quiz · Magnesium_montage · M1_stop
```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. Character, identical in every scene: an Emirati man about 35, short black beard, white kandura.
Exactly one on-screen text per scene: the phone screen.

SCENE 1, 0–3.3 s: Bathroom mirror, morning; close-up of his phone screen showing "Testosterone" in bold red with a large red arrow plunging downward; he shouts, sweating, then grabs his belly in the mirror: «من الرقاد… ولا من الكرش؟!»
SCENE 2, 3.3–6.6 s: Dark bedroom at 3 in the morning; close-up of the phone screen showing "Magnesium: weak for sleep" in bold red with a large red arrow plunging downward; a plain white pill bottle rattles off the nightstand; he groans, phone pressed to his head: «آخذه كل ليلة… وما أرقد!»
SCENE 3, 6.6–10 s: Parked car at night; close-up of the phone screen showing "Anxiety: weak evidence" in bold red with a large red arrow plunging downward; he slaps the steering wheel, horn honk, sweating: «دفعت كل هذا… على شي ما يشتغل؟!»
Every line is spoken once.
```

#### RUN 3 — M2_exam · M3_pov · M4_trend
```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. Character, identical in every scene: an Emirati man about 35, short black beard, white kandura.
Exactly one on-screen text per scene: the phone screen.

SCENE 1, 0–3.3 s: Home office desk with a plain white pill bottle; close-up of his phone screen showing "Sleep: FAIL" in bold red with a large red arrow plunging downward; he yells and shoves back from the desk: «يعني ما يفيد للنوم؟!»
SCENE 2, 3.3–6.6 s: Dark bedroom, he grips a plain white bottle; close-up of the phone screen showing "Sleep: 50/50" in bold red with a large red arrow plunging downward; he groans into the pillow, bloodshot eyes: «حبة كل ليلة… وليش ما يشتغل؟!»
SCENE 3, 6.6–10 s: Living room couch; close-up of the phone screen showing "Trend: FALSE" in bold red with a large red arrow plunging downward; the bottle drops with a rattle, he presses the phone to his head: «يعني الترند كذب علي؟!»
Every line is spoken once.
```

#### RUN 4 — MRI5_twist · MRI6_doctor · PEP4_three
```
Photoreal cinematic, vertical 9:16, 10 seconds, three fast hook scenes, hyper-expressive faces, kinetic camera with crash zooms and whip pans, crisp ASMR sound in every scene. Character, identical in every scene: an Emirati man about 35, short black beard, white kandura.
Exactly one on-screen text per scene: the phone screen.

SCENE 1, 0–3.3 s: Hospital waiting area, calm at first; phone ding; close-up of his phone screen showing "Incidental finding" in bold red with a large red arrow plunging downward; panic, sweat running, phone pressed to his head: «شو يعني هذا؟! أنا رحت أطمّن بس!»
SCENE 2, 3.3–6.6 s: Parked car outside a clinic; close-up of the phone screen showing "Further tests required" in bold red with a large red arrow plunging downward; he shouts, both hands pressing the phone to his head: «فحوصات زيادة؟! وأنا كنت سليم!»
SCENE 3, 6.6–10 s: Home gym bench with an opened plain brown parcel and a small plain blank vial; close-up of the phone screen showing "Research use only" in bold red with a large red arrow plunging downward; he backs away from the vial: «للأبحاث فقط؟! وأنا كنت باخذه!»
Every line is spoken once.
```

---

#### Cut map for assembly (scene → video, Arabic headline overlaid from frame 1)
| Run | 0–3.3 s | 3.3–6.6 s | 6.6–10 s |
|---|---|---|---|
| R1 | Kill_Testosterone «3 خطوات تدمّر Testosterone» | T2_three «العادة رقم 1 صادمة» | T3_free «Testosterone… ببلاش؟» |
| R2 | T4_quiz «النوم ولا الكرش؟» | Magnesium_montage «تاخذ Magnesium غلط؟» | M1_stop «Magnesium: تشتريه غلط» |
| R3 | M2_exam «Magnesium رسب هني» | M3_pov «حبة Magnesium كل ليلة؟» | M4_trend «الترند كذب عليك» |
| R4 | MRI5_twist «MRI طمّنك… ولا خوّفك؟» | MRI6_doctor «فحص ما أنصح فيه» | PEP4_three «Peptide أونلاين؟ 3 أسئلة» |

Cut points are set by eye on the real clip, since Omni scene edges drift. Use `scripts/assemble_hook.sh out.mp4 motion.mp4 run.mp4@START-END`.

---


## 10. QC gates (AG: "only push it to me if it is up to standard")

**A. Each Omni run, before it's used or shown:**
Run R1 to R4 in order. After each run, check every scene and **show AG only runs that pass every item**:
1. Phone text is legible English, matches the prompt, and is red with a down arrow. There is no other text in the frame.
2. Same man in every scene (beard, kandura, face). Hands and fingers look normal. No warped faces.
3. Each scene has the full beat: phone, then scream with sweat and phone to the head, then the line.
4. The Arabic line is spoken once, clearly, in Gulf dialect, within its 3.3 s, and isn't cut off at the scene edge.
5. ASMR is audible. There are no stray voices or music.
6. Props stay plain blank (bottles, vial, parcel).
On a fail: regenerate that run **once**. If it fails again, stop, don't show it, and report which item failed. Shorten that run's long lines (Kill, MRI5) only if they were rushed.

**B. Each Nano Banana image:** photoreal, 9:16, the subject matches the prompt, the top third is empty, no text or logos, hands look normal.

**C. Each motion video (before mux):** `preview.sh` contact sheet must show:
- no WARNING from the build
- hook inside the safe zone (y ≥ 330) and fully inside the frame
- RTL order correct, numbers read "15%" not "%15"
- no overlaps between FX and captions
- the ✗/✓ marks land on the right word

**D. Each assembled video (final check):**
- length = hook segment(s) + motion length (±0.1 s)
- frame 0 shows the Arabic headline
- the hook's line isn't cut at the edges
- no black or frozen frames at the joins
- audio has no gap or click at the join
- the H1 voice is untouched (same timing and level as the make_all output; only re-encoded)
- the draft tag is present until "final"
- watch at least the first 6 s and the join

Only videos that pass A–D go to AG. Report failures in one line each.

## 11. Assembly

```bash
# squeezed hooks: one scene per video (cut points by eye; defaults 0-3.3, 3.3-6.6, 6.6-10)
HEADLINE=$KIT/headlines/Kill_Testosterone.png bash $KIT/scripts/assemble_hook.sh out/final/Kill_Testosterone.mp4 out/reference/Kill_Testosterone.mp4 /c/Users/LENOVO/t6w/HOOK_R1.mp4@0-3.3
HEADLINE=$KIT/headlines/T2_three.png          bash $KIT/scripts/assemble_hook.sh out/final/T2_three.mp4          out/reference/T2_three.mp4          /c/Users/LENOVO/t6w/HOOK_R1.mp4@3.3-6.6
# ... follow the cut map in 9B for all 12 (R1: Kill, T2, T3 · R2: T4, Montage, M1 · R3: M2, M3, M4 · R4: MRI5, MRI6, PEP4)
# T6: both runs whole, headline overlaid only if Flow garbled it
HEADLINE=$KIT/headlines/T6_fitness.png bash $KIT/scripts/assemble_hook.sh out/final/T6_fitness.mp4 out/reference/T6_fitness.mp4 /c/Users/LENOVO/t6w/T6_HOOK_R1.mp4 /c/Users/LENOVO/t6w/T6_HOOK_R2.mp4
```

- Use `out/scratch/<name>.mp4` instead of `out/reference/` if AG picks scratch (D1).
- **T6 B-roll (not scripted yet):** I1–I5 as slow push-in stills (scale 1.0→1.08 over the word span) on:
  - I1 «ريال عمره 60» (line 2)
  - I2 «شاب عمره 20» (line 4)
  - I3 «الكتلة العضلية» (line 7)
  - I4 «VO2 max» (line 8)
  - I5 «الكرش ومحيط الخصر» (line 9)
  - Keep the motion labels in the top third. Word times are in the build's `timeline.json` (`vo[].words[].s/e`) under `work/proj_T6_fitness/`.
  - Overlay the stills on the motion video with ffmpeg `overlay=enable='between(t,s,e)'` after `zoompan` or `scale` animation, and keep the motion layer's captions on top. The simplest approach: overlay the stills under a cropped caption band, then QC.
- Preview without the talking head, then send. HeyGen last.

## 12. Every approved script, word for word (from 27 Oct, unchanged)

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


## 13. Dropped

- **T1_age** «ممكن تكون عمرك عشرين، والتستوستيرون عندك مثل واحد عمره خمسين…» — dropped by AG (number-line letter/timing issues; "not going to waste time to fix it").

---

**Push prompt: see section 0.**
