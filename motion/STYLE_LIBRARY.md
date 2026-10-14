# Style library

The style picker (`src/styles/Styles.tsx`) renders the **same approved antibiotics
beat** in five looks, so AG can choose one house style. Wording on screen is
only the approved R2 text. All are illustrations, not to scale.

| Option | Look | Comes from |
|---|---|---|
| A | R2 teal 3D (current) | Codex's antibiotics R2 graphics |
| B | Kinetic type: big words slam in on a dark grid | kinetic-typography prompts (e.g. `incognitoprince-849212`, `noah-z-zhang-765393`) |
| C | Whiteboard: hand-drawn marker lines write themselves | whiteboard / one-line drawing prompts (e.g. `tak3sh8-441895`, `paripune-657175`) |
| D | Paper cut-out: layered paper with soft shadows | paper cut-out 9:16 prompts (e.g. `x4b47x-034026`, `jrayon-054015`) |
| E | Microscope glow: dark lens, glowing particles, labelled leaders | scientific canvas explainers (e.g. `rashadmirza404-020971`, `cagrimbakirci-842869`) |

## Round 2 — variations on A and B (AG liked both, 13 Oct 2026)

| Option | Look |
|---|---|
| F | 3D + kinetic hybrid: big words slam over the 3D models, which then move aside |
| G | Versus split: virus half vs bacteria half, with ✓ / ✗ verdict stamps |
| H | Cinematic 3D: camera pushes in and out, letterbox, quiet captions |
| I | Kinetic captions: word-by-word captions over the presenter area (for HeyGen layering) |
| J | Colour-block wipes: kinetic words on sliding brand-colour panels |

Render: `node scripts/render.mjs videos STYLE-Picker2 STYLE-F-Hybrid STYLE-G-Versus STYLE-H-Cinematic STYLE-I-Captions STYLE-J-Blocks`

## Round 3 — variations on F and G (AG's top two, 13 Oct 2026)

| Option | Look |
|---|---|
| K | Split + kinetic: G's virus/bacteria halves with F's slamming words in each half, closing banner |
| L | Diagonal swipe: full-frame virus, diagonal wipe to bacteria, ends on a diagonal split with ✗ / ✓ |
| M | Orbit parallax: camera orbits the 3D models behind kinetic words for depth |
| N | Showdown cards: two framed cards; the antibiotic hits the bacteria and bounces off the virus |
| O | Punch edit: F with hard cuts, zoom punches and flash frames |

Render: `node scripts/render.mjs videos STYLE-Picker3 STYLE-K-SplitKinetic STYLE-L-Diagonal STYLE-M-Orbit STYLE-N-Showdown STYLE-O-Punch`

Round 1 render: `node scripts/render.mjs videos STYLE-Picker STYLE-B-Kinetic STYLE-C-Whiteboard STYLE-D-Paper STYLE-E-Microscope`

## K–O on a real film — Burn (14 Oct 2026)

`src/burn/BurnOverlays.tsx` lays each of K, L, M, N and O over the Burn R5
review film (36.36 s, 909 frames). The film stays untouched underneath, with
its own soundtrack.

The cue times were measured from the film audio, not estimated. The locked
100-word speech was force-aligned to the soundtrack word by word with
PocketSphinx and checked against ffmpeg `silencedetect` pauses.

The film is not in this public repo. To render:

1. Put the film at `public/burn_r5.mp4` (`public/*.mp4` is gitignored).
2. Run `node scripts/render.mjs videos BURN-K BURN-L BURN-M BURN-N BURN-O`.
3. Run `scripts/finalize.sh out/BURN-*.mp4`.

## House style (locked by AG, 14 Oct 2026)

**Kinetic words + visuals, with M or N motion.** The rest of this file is the
history of how it was chosen. The full method is in Chief-of-Staff:
`PROJECTS/P004_AG_MEDICAL_VLOG/CLAUDE/2026-10-14_P004_Motion_House_Style_Method_v01_CLAUDE.md`.

The style has these elements:

- every word moves in on its spoken time
- key words burst
- full-colour illustrations act out each idea
- no panels
- the face and the B-roll action stay clear

## Round 4 — kinetic M, N, O on the burn film (AG's picks, 14 Oct 2026)

AG chose M, N and O and asked for:

- more kinetic motion
- every word moving on its own, not just appearing
- motion graphics that act out what is said
- no solid colour areas behind bold text
- nothing covering the important footage

Built in `src/burn/Kinetic.tsx`, `src/burn/MotionIcons.tsx` and `src/burn/kineticData.ts`:

- **Every spoken word appears on its measured start time.** The word timings
  come from force-aligning the locked speech to the film audio. The groups are
  checked against the speech, so the render fails if the on-screen text drifts
  from the approved words.
- **No panels.** Text is Montserrat Black with a dark outline and shadow.
  Accent colours carry meaning:
  - teal: the action to take
  - coral: don't, or danger
  - gold: warmth or time
- **The word being spoken lights up.**
- **Shot-aware placement.** Each cut has a free zone, so the words move off the
  face and the B-roll action. Graphics only show on presenter shots, beside the
  head.
- **Graphics act out each line.** Examples:
  - the tap drips
  - the thermometer goes up on "hot" and down on "ice-cold", then settles
  - the stopwatch starts on "start"
  - the clock sweeps three hours
  - the ice cube gets wrapped, then crossed out, then the skin cracks on "damage"
  - the ring slides off, then the finger swells
  - a pull arrow gets crossed out
  - warm waves come off the body
  - the dressing lands loosely
  - the hand and face pulse

| Option | Word motion |
|---|---|
| M · Depth | Each word flies in from depth with blur; the group sways in 3D |
| N · Showdown | Words slam in from alternating sides; key words get a drawn underline; graphic flips in inside an outline frame |
| O · Punch | Words punch in with overshoot and shake; key words zoom-punch the whole frame with a light flash |

Render with `node scripts/render.mjs videos BURN-KIN-M BURN-KIN-N BURN-KIN-O`,
then `AUDIO_FROM=public/burn_r5.mp4 scripts/finalize.sh out/BURN-KIN-*.mp4`.

## Prompt source

Reference prompts: [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos)
(MIT, © 2026 yihui-dev), 513 prompts as of 13 Oct 2026. Use them for visual
ideas only. That library has no medical content, almost no vertical or Arabic
examples, and many prompts are partial. Clinical wording always comes from the
approved speech, never from a borrowed prompt.

Fonts: IBM Plex Sans Arabic and Caveat (both SIL OFL), bundled in `public/fonts`.
