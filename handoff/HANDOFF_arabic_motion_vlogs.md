# Handoff: Arabic (Gulf) medical vlog, kinetic motion-graphics pipeline

Status as of 15 Oct 2026. Seven videos finished in 4K. This document records the decisions we locked and how each step was done, so the same result can be rebuilt from scratch.
The companion file `motion_vlog_source_kit.zip` holds the real code, storyboards and voice requests. Give both files to the assistant that will rebuild it.

---

## 0. Prompt to paste into ChatGPT (or any assistant)

> I'm a Dubai physician-creator making Gulf-Arabic medical short videos. Attached are a full handoff document and a source-code zip from a pipeline that already works. Rebuild exactly the same pipeline and visual style; don't redesign it. Follow the "Locked decisions" section strictly. For a new voice note: (1) transcribe it and rewrite it as a flowing Gulf-Arabic script that keeps my meaning, (2) I generate the voice in ElevenLabs with the locked settings and give you the audio + timestamps, (3) you write the storyboard JSON in the documented schema, (4) build and render using the attached code. Flag any line you're unsure you transcribed correctly, and never add medical claims I didn't make.

Be aware: ChatGPT can only *run* this code if it has a code environment with Node.js, Chromium and ffmpeg. Otherwise it can write the scripts and storyboards, and you render them on a computer.

---

## 1. What was made

| # | File | Topic | Length | Voice pace |
|---|------|-------|--------|-----------|
| 01 | 01_ice_water_motion_4K.mp4 | Ice baths / cold water immersion and muscle growth | 44.2 s | ~140 WPM |
| 02 | 02_phone_hemorrhoids_motion_4K.mp4 | Phone on the toilet and hemorrhoids | 33.9 s | ~140 |
| 03 | 03_iv_nad_motion_4K.mp4 | Vitamin IV drips and NAD | 40.6 s | ~136 |
| 04 | 04_weekend_sleep_motion_4K.mp4 | Catching up on sleep at the weekend | 53.2 s | ~131 |
| 05 | 05_jet_lag_motion_4K.mp4 | Jet lag | 57.7 s | ~150 |
| 06 | 06_caffeine_motion_4K.mp4 | Caffeine and thinking | 47.4 s | ~135 |
| 07 | 07_pimple_motion_4K.mp4 | A pimple before an event | 36.5 s | ~140 |

Output: 9:16, 2160×3840 (4K), 30 fps, H.264, AAC audio. 1080×1920 versions also exist.
Drive destination: Arabic → **Motion graphic** folder (uploaded by hand; the Drive connector can't upload large videos).

---

## 2. Locked decisions (don't change without deciding to)

1. **Format:** kinetic typography motion graphics, vertical 9:16. Every spoken word appears on screen at the moment it is spoken. There's no presenter footage, stock footage or photos.
2. **Voice:** your own **ElevenLabs voice clone**, re-voicing a cleaned-up script of your voice note. Your raw voice note isn't used in the final video.
   - Model: **`eleven_v4_turbo`** (Eleven v4 Turbo).
   - Voice settings: stability **0.4**, similarity_boost **0.8**, speed 1.2. Based on our tests, v4 effectively ignores the speed value, so pace comes from how the script is written.
   - Voice ID used: `czZ4QIPS4BGjseYaUp36` (your clone in "abdulla's Workspace"; this ID is not a secret).
   - Endpoint: `POST /v1/text-to-speech/{voice_id}/with-timestamps?output_format=mp3_44100_128`. It returns the audio plus a per-character timing alignment, which drives the word animation.
3. **Pace:** about **140 words per minute, natural, with no artificial speed-up.** You rejected time-stretched or sped-up audio ("not like a speed up voice quality"). Your original target was 165 WPM. The 140 WPM v4 Turbo take is the one you chose ("let's stick with this one").
4. **The only audio edit allowed:** pauses longer than 0.25 s are shortened to **0.15 s**. Speech is never cut, there's no tempo change, and loudness is normalised to **−16 LUFS** (−1.5 dBTP, linear gain only, no compression).
5. **Script style:** Gulf (Emirati) Arabic, the same wording as your voice note, rewritten into **flowing, joined sentences**. Don't use comma-heavy, chopped lines: the voice slows down and sounds stilted. Write numbers out as words for the voice (e.g. «ثلاث دقايق»), but show them as Western digits on screen (e.g. «٣ دقايق» → 3, «2.5%»).
6. **Visual style:** the style shown in section 4, applied identically to all videos. You approved it ("I loved it… apply this on all").
7. **No music or sound effects** so far, voice only. That hasn't been decided yet; it's an option, not a decision.

---

## 3. Pipeline: step by step

### Step 1: Get the voice note
Original m4a voice notes come from Google Drive (Arabic medical content list).

### Step 2: Transcribe → clean script
- Transcribe the Gulf Arabic. Keep your words and meaning; only remove false starts and repetitions.
- **Flag every word you're not sure you heard correctly.** In our run, several lines were guesses (see section 7).
- Write two versions:
  - **Caption lines:** short on-screen lines, about 2–7 words each (see `lines` in the storyboards).
  - **Voice script:** the same words joined into flowing sentences, with numbers written as words.
- Examples of final voice scripts are in `source_kit/tts_requests/*.json`.

### Step 3: Generate the voice (ElevenLabs)
- Send the voice script with the locked settings to the `with-timestamps` endpoint. We did this through Zapier's "API Request" action because the session couldn't reach ElevenLabs directly.
- Save `audio_base64` → mp3 and `alignment` → `.align.json` (`tts_extract.py` does this and prints the WPM).
- If the pace is far below about 135 WPM, rewrite the script more fluidly. Don't speed up the audio.
- **Security:** never paste API keys into a chat. Keys go only into Zapier or ElevenLabs' own connection forms.

### Step 4: Clean the audio
`PAUSE=0.15 python3 pace_165.py voice.mp3 final.wav <word_count> 100`
(The low target of 100 guarantees no tempo change is applied. The script only shortens pauses and normalises loudness.) It writes `final.wav.map.json`, which records how timestamps shift after pauses are shortened.

### Step 5: Storyboard (one JSON per video)
Write `stories/<name>.json`. See the schema in section 5. This is the creative step: choose which visual metaphor appears on which word.

### Step 6: Build the project
`ALIGN=voice.align.json python3 build_note.py stories/<name>.json final.wav proj/<name> motion_src final.wav.map.json`
- Maps every caption word to its exact spoken time from the ElevenLabs alignment, adjusted for the shortened pauses.
- Converts the storyboard's word cues (e.g. `[3, "غلط"]` = the word containing «غلط» in line 3) into seconds.
- Writes `timeline.json`, `project.json` and `scenes/all.js` (= `lib.js` + the scene data + `kit.js`).
- If a caption line's word count differs from what was spoken (numbers), that line's words are spread evenly over its real time span.
- Prints a warning if not all spoken words were matched; it should be 0 unmatched.

### Step 7: Render
Uses the open-source engine **github.com/majedphotos/video-ad-editor** (folder `motion/`, Node + headless Chrome via puppeteer-core):
- 1080p: `node render.js proj/<name> all --fresh`
- 4K: `node render.js proj/<name> all --fresh --scale 2`
- Patch we made in `render.js`: add `--no-sandbox` when running as root (Linux servers only).

### Step 8: Add the voice and export
`ffmpeg -i video.mp4 -i final.wav -map 0:v -map 1:a -c:v copy -af apad -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart out_4K.mp4`

For sending by chat (30 MB limit): two-pass x264 at a bitrate of `(27.5 MB × 8 / duration) − 192 kbps`, AAC 192k. The result is still 2160×3840, and we checked a close-up frame for sharpness.

---

## 4. Visual style spec (the "look")

**Canvas:** 1080×1920 design units (rendered ×2 for 4K), 30 fps.

**Background**
- Vertical gradient from navy `#0B1626` (top) to `#143552` (bottom).
- 46 small teal dots drifting slowly upward, opacity 5–15%.
- Film grain 0.03, vignette 0.3.
- A small grey «مسودة للمراجعة» (draft for review) tag at the top right. **Remove it for the final publish.**

**Colour palette**
| Role | Colour |
|---|---|
| Text | white `#F7F9FC` |
| Default highlight | gold `#FFD23F` |
| Wrong / myth / warning | red `#FF4D5A` |
| Correct / recommended | green `#3DDC84` |
| Neutral accent | teal `#2EC4B6` |
| Secondary text | grey-blue `#8DA2BC` |

**Fonts**
- Tajawal (Arabic body, weight 900 for captions)
- Lalezar (Arabic display)
- Inter (numbers, Latin)

**Kinetic caption (the core effect)**
- One caption line at a time, centred at y≈1290 (lower-middle third). Size 84, Tajawal Black, max width 900, line height 1.25, soft drop shadow.
- **Each word rises 90 px into place** with a clip-up reveal mask. The rise runs from 0.10 s before the word is spoken to 0.22 s after, with expo-out easing.
- **Hot (keyword) words** pop instead: scale 0.5→1 with a back-out overshoot over 0.4 s, in a highlight colour (gold by default; red for myths, green for advice, teal for neutral).
- A line exits 0.22 s before the next line's first word: fades and rises 70 px over 0.25 s.

**Scene transitions** (0.35 s each, chosen per scene)
- `push`: slides up
- `wipe`: right-to-left wipe
- `zoom`

**Graphic elements** (the upper half of the screen, above the caption), each triggered on a specific spoken word:
| Type | What it does |
|---|---|
| `icon` | White line-art icon (9 px stroke, round caps) that grows in with a back-out bounce. Optional ✗ or ✓ drawn on a later word. Icons: ice, dumbbell, phone, toilet, clock, moon, sun, plane, bus, coffee, bulb, face (optionally with a red pimple), toothpaste, patch, concealer, study (document), alarm, suitcase, bed, ivbag, muscle. |
| `stamp` | Rubber-stamp slam: a word in a rounded box drops from 2.2× to 1× in 0.22 s, slightly tilted, with a short screen shake (22 px, decaying). Red for "wrong", gold for caveats, green for "best". |
| `counter` | A big number (e.g. "2.5%", "×4–5") pops in, with a subtitle under it. |
| `eq` | Three-part equation (A, operator, B), e.g. "less pain ≠ less growth". |
| `cards` | Stacked rounded cards slide in from the side. Each has a label, an icon and a ✓ or ✗ ticked on a cue word; a ticked ✓ card gets a faint green tint. |
| `pair` | Two big side-by-side cards (comparison, e.g. toothpaste ✗ vs squeezing ✗). |
| `gauge` | Horizontal level bar that animates between levels on cue words; turns red when low; optional green target zone and notes. |
| `week` | Seven day bars (Sun→Sat, right-to-left) that grow and change colour in phases, with optional ✗ on days. |
| `clock` | Analogue clock whose hands sweep from one hour to another, with labels. |
| `daybar` | Day timeline bar with a green "allowed window" that grows in, and labelled marks (e.g. the caffeine window). |
| `pills` | Floating pill-shaped tags (e.g. supplement names) that pop in staggered, then fall away, with an optional big red ✗. |

**Design rules**
- **One idea per scene:** 1–4 caption lines per scene. Each graphic reacts to a word in the voice, never at random times.
- ✗ marks always appear on the word that says it's wrong, and ✓ on the word that gives the advice.
- All text stays inside the safe area.
- Western digits only.
- No images of women and no fire icon (rules from the engine's README).

The IV/NAD video (03) has hand-written custom scenes (IV bag with dripping fluid, pills, recap card). They're in `source_kit/ivnad_project/scenes/`. The other six use the generic storyboard kit above.

---

## 5. Storyboard schema (what to write per video)

```json
{
  "title": "حبة قبل المناسبة",
  "lines": ["طلعت لك حبّة قبل المناسبة؟", "إنك تحط عليها معجون أسنان", "هذا غلط كبير", "..."],
  "flags": {"4": "unverified"},
  "scenes": [
    {"lines": [1], "hot": {"1": ["حبّة", "المناسبة"]},
     "fx": [{"t": "icon", "name": "face", "y": 620, "s": 1.6, "at": [1, 0], "pimple": true}]},
    {"lines": [2, 3], "tr": "push", "hot": {"3": ["غلط"]}, "hotColor": {"3": "red"},
     "fx": [{"t": "stamp", "text": "غلط", "at": [3, "غلط"], "y": 760, "color": "red"}]}
  ]
}
```

- `lines`: caption lines in order. `..` inside a line marks a spoken pause that isn't shown on screen.
- `flags`: line numbers whose transcription is uncertain.
- `scenes[].lines`: 1-based caption line numbers in that scene.
- `tr`: transition into the scene (`push` / `wipe` / `zoom`).
- `hot`: keywords per line that pop in colour. `hotColor` sets that colour per line (`red` / `green` / `teal` / `gold`).
- **Cue format:** `[lineNumber, wordIndex]` or `[lineNumber, "substring of the word"]`. It's used in `at`, `markAt`, `until`, `zoneAt`, `crossAt`, `fallAt`, `atA`/`atOp`/`atB`, and gauge `keys`.
- `fx`: list of graphic elements, as in the table above. All seven real storyboards are in `source_kit/stories/`. Copy their patterns.

---

## 6. Things tried and rejected (don't repeat)

| Tried | Result |
|---|---|
| Speeding the voice to 165 WPM with time-stretch (rubberband) | Rejected; it sounded artificially sped up. |
| ElevenLabs Multilingual v2 at speed 1.2 (~143 WPM) | Worked, but you preferred v4 Turbo's delivery. |
| v4 with the speed setting | v4 ignored the speed value. |
| A comma-heavy script split exactly like the captions | The voice got slower and choppier; joined sentences fixed it. |
| You noticed the voice sounding "a bit off" in tone in one take | You compared takes and chose the v4 Turbo 140 WPM take. Tone isn't fully solved; stability and style may need tuning if it bothers you again. |
| Burned-in ASS subtitles via ffmpeg | Coloured Arabic words came out in the wrong order (needed Encoding −1, letter spacing 0). Replaced by the canvas motion engine. |

---

## 7. Open issues to fix before publishing

1. **Remove the «مسودة للمراجعة» draft tag** (one line in `motion_src/lib.js`, function `bg`) and re-render.
2. **Lines I'm not sure I transcribed correctly.** Check them against your original voice notes:
   - Pimple: lines 4–5 («يهيّج المنطقة ويزيد الاحمرار», «ولا تعصرها.. بتخلّي أثر أو ندبة»)
   - Weekend sleep: the ending
   - Caffeine: «ما يحسّنها ولا يغيّر فيها»
   - Ice water: the ending
   - Jet lag: «من دبي لمنطقة بتوقيت ثاني»
3. **IV/NAD:**
   - your original closing line was dropped
   - the recap card's wording is mine, not yours
4. **Medical claims haven't been fact-checked.** They're your statements from the voice notes. Examples: the 4–5× sitting-time study, 7–9 h of sleep, the caffeine window from 1 h after waking to 6 h before sleep, and benzoyl peroxide 2.5%.
5. **Options not done yet:**
   - your name or handle and an end card
   - background music and sound effects
   - a 60 fps version

---

## 8. Tools and accounts used

- **ElevenLabs** (Creator plan, "abdulla's Workspace"): voice clone + v4 Turbo.
- **Zapier:** the bridge to call the ElevenLabs API.
- **Google Drive:** source voice notes and the output folder.
- **video-ad-editor** (GitHub, majedphotos): canvas motion engine and renderer. Requires Node.js, Chromium and ffmpeg. Python 3 runs the build scripts.
- **Fonts:** Tajawal, Lalezar, Inter (Google Fonts; bundled in the engine's `fonts/`).

## 9. Contents of `motion_vlog_source_kit.zip`

| Path | What it is |
|---|---|
| `build_note.py` | Storyboard + audio + alignment → engine project |
| `pace_165.py` | Pause shortening + loudness (run with PAUSE=0.15 and a low target so there's no tempo change) |
| `tts_extract.py` | Saved ElevenLabs response → mp3 + alignment + WPM report |
| `motion_src/lib.js` | Background, kinetic caption line, cards, ✗/✓, stamp, IV bag, pill |
| `motion_src/kit.js` | Icon set + all `fx` types + scene renderer |
| `motion_src/scenes.js` | Custom IV/NAD scenes |
| `stories/*.json` | The six storyboards |
| `tts_requests/*.json` | Exact final voice scripts + settings for all 7 |
| `ivnad_project/` | Finished IV/NAD project (timeline + scenes) |
| `render/*.sh` | Render + mux scripts (1080p and 4K) |
