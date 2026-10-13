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

Round 1 render: `node scripts/render.mjs videos STYLE-Picker STYLE-B-Kinetic STYLE-C-Whiteboard STYLE-D-Paper STYLE-E-Microscope`

## Prompt source

Reference prompts: [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos)
(MIT, © 2026 yihui-dev), 513 prompts as of 13 Oct 2026. Use them for visual
ideas only. That library has no medical content, almost no vertical or Arabic
examples, and many prompts are partial. Clinical wording always comes from the
approved speech, never from a borrowed prompt.

Fonts: IBM Plex Sans Arabic and Caveat (both SIL OFL), bundled in `public/fonts`.
