# AG Medical Vlog — Remotion motion kit

Native **1080×1920, 25 fps** motion graphics for AG Medical Vlog, written in
[Remotion](https://www.remotion.dev) (React → MP4). Everything here is local
code: rendering costs **AED 0 additional** and uses no Flow, HeyGen or other
paid credits.

**Status: PROPOSAL SAMPLES.** Nothing in this folder is AG-accepted footage, a
finished episode, or approved for publication. It does not change any episode
record, approval or spending scope. Clinical wording on screen is taken
unchanged from approved/prepared speeches; on-screen labels are optional and
stay separate from the clean master until AG accepts them.

## What is here

| Composition | Length | What it shows | Source of wording |
|---|---|---|---|
| `AB-GraphicsReel` | 24.72 s | The five antibiotics scenes back to back | Antibiotics V2 approved speech (R2) |
| `AB-AfterBecause` | 4.44 s | After ≠ because timeline, drawn top-to-bottom | same |
| `AB-Microbiology` | 9.84 s | 3D flu virus vs bacterium, example cell-wall target | same |
| `AB-Risks` | 4.72 s | Side effects + resistance symbols | same |
| `AB-Qualification` | 3.44 s | Bacterial complication → different decision | same |
| `AB-Closing` | 2.28 s | FLU ≠ AUTOMATIC ANTIBIOTICS | same |
| `SUGAR-Molasses` | 13.08 s | Molasses coats white sugar → colour/flavour/moisture → both cups stamped ADDED SUGAR → ending lines | Brown vs white sugar, 46-word speech (8 Oct batch) |
| `SUGAR-EndOverlay` | 2.56 s | Ending lines as a **transparent** lower-third to lay over AG's presenter shot | same |
| `FRUIT-Fiber` | 18.56 s | Juicing (pulp stays in sieve) → blending (fiber kept, pieces get smaller) → several fruits into one glass, drunk quickly | Whole fruit, original 91-word speech (8 Oct batch) |
| `TEST-ArabicShaping` | 6 s | Arabic joining, right-to-left order, English terms inside Arabic, word-by-word highlight | **Draft test wording — not approved, not for publication** |

### Antibiotics cue sheet (drops into the R2 timeline)

The five antibiotics scenes are portrait re-layouts of Codex's R2 graphics
(`motion-assets/src/Root.tsx`, 8 Oct 2026). R2 rendered them at 1920×1080 and
cropped them into the portrait review. Here they are built for 1080×1920, so
nothing is cropped and the type is phone-sized. Frame counts match
`REVIEW_R2_VISUAL_TIMELINE.json`, so each one replaces its R2 window directly.

| Scene | R2 window (s) | Frames | Spoken cue |
|---|---|---|---|
| AfterBecause | 5.64–10.08 | 111 | You felt better after taking them. That doesn’t prove you felt better because of them. |
| Microbiology | 16.16–26.00 | 246 | Blunt answer—flu is caused by a virus … won’t treat the flu itself. |
| Risks | 26.00–30.72 | 118 | Unnecessary antibiotics can cause side effects and encourage resistance. |
| Qualification | 38.84–42.28 | 86 | And if there’s a bacterial complication, that’s a different decision. |
| Closing | 42.28–44.56 | 57 | Flu doesn’t automatically mean antibiotics. |

### Sugar and fruit timing

Both explainers use **estimated** cue times at 165 WPM (0.364 s per word)
because no narration has been recorded for the 8 Oct batch. The cue start
frames sit in one constant at the top of each file (`B = {...}`). After AG's
narration is measured, change those numbers and re-render. Every animation
follows automatically.

## Why do the graphics this way

1. **Exact control.** Each word on screen, each colour and each frame is a line
   of code. A wording change is a one-line edit and a re-render, with no
   regeneration and no credits.
2. **Native portrait.** Built at 1080×1920 instead of cropping a landscape
   render, with text kept clear of the TikTok/Reels/Shorts buttons
   (`SAFE` margins in `src/theme.ts`).
3. **Timed to the speech.** Scenes are cut to measured narration windows. Swap
   estimated cues for measured ones and the whole scene re-times itself.
4. **Transparent overlays for HeyGen.** Any composition can export with an alpha
   channel (ProRes 4444), so labels can sit over AG's presenter shot
   instead of replacing it.
5. **Arabic works.** Chromium's text engine handles Arabic shaping and
   right-to-left order, including English drug names inside Arabic lines.
6. **One look across episodes.** Shared tokens (`src/theme.ts`) and parts
   (`src/ui.tsx`) keep every episode in the same visual family as the R2
   graphics AG liked.
7. **Versioned.** The code lives in Git, so every revision is preserved and can
   be compared or rolled back.

## Run it

```bash
cd motion
npm install
npm run studio                         # live preview in the browser, scrub the timeline
node scripts/render.mjs stills         # contact frames → out/stills/
node scripts/render.mjs videos         # all sample MP4s → out/
node scripts/render.mjs videos FRUIT-Fiber
node scripts/render.mjs overlay        # SUGAR-EndOverlay with alpha → out/*.mov
```

The scripts use the Playwright Chromium at `/opt/pw-browsers` on Linux.
Elsewhere (for example AG's Windows PC), Remotion downloads its own Chrome
Headless Shell on the first render. 3D scenes use software WebGL (`swangle`),
so no GPU is needed.

## Rules this kit follows

- Approved speech is never altered. Graphics illustrate the spoken claim only;
  no added numbers, doses, effects or rankings.
- Every illustration that could be mistaken for measurement carries a small
  disclosure line ("not to scale", "not a measured comparison").
- Clean masters stay caption-free unless the episode asks for captions.
- Output is 1080×1920. Upscaled sources are never presented as native detail.
- No playback starts automatically. Review previews start muted.

## Licence notes

- Remotion: free for individuals and for-profit organisations with **up to 3
  employees**. A company licence is required for 4 or more employees (check
  [remotion.dev/license](https://www.remotion.dev/docs/license) before using it
  for the clinic).
- IBM Plex Sans Arabic: SIL Open Font License, bundled in `public/fonts`.
- Three.js: MIT.
