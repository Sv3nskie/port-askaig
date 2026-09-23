# Port Askaig Hotel — homepage redesign

A static, single-page redesign of the homepage for [Port Askaig Hotel](https://www.portaskaig.co.uk),
a family-run Highland Inn on the Sound of Islay. Built from the Claude design handoff;
all copy is carried over from the existing site.

**Live preview:** https://sv3nskie.github.io/port-askaig/

## Stack

Plain HTML, CSS and JavaScript — no build step, no dependencies. Open `index.html`
or serve the folder:

```bash
npx serve .          # or: python -m http.server
```

## Structure

```
index.html      the page
css/styles.css  design tokens + all styles
js/main.js      hero slider
img/            photography (WebP)
```

## The design

- **Sections** are colour-coded: 01 Stay (teal `#2f5359` on `#e7ecea`), 02 Malts &
  Seafood (brass `#d49a5a` on `#2a201a`), 03 Explore Islay (olive `#565c30` on
  `#ecebdd`), 04 Harbour & Travel (brass on `#2d1c1b`).
- **Type**: Cormorant Garamond 500 for display, Inter 400/500 for body and UI.
- **Slider**: 4 slides, crossfade with a slow Ken Burns zoom, autoplay every 6s,
  pauses on hover / focus / hidden tab. Dots, arrows, ← → keys and swipe.
  `prefers-reduced-motion` disables autoplay and the zoom.
- **Responsive**: every two-column grid stacks rather than squeezing; 4-up grids
  break 4 / 2 / 1, never 3 + 1.
- Flat and editorial — no shadows on content, 4px radius on images and panels.

## Images

All photography is the client's, converted to WebP (22 MB → 3 MB). Originals are
in the design handoff bundle. Three notes carried over from the handoff:

- `interior01`, `interior02`, `malts-in-bar`, `jura-ferry` are only ~1000×200 —
  higher-resolution originals would help.
- `Slide2` and `Water` carry a "© Fred R Bowman" watermark — confirm usage rights.
- `Distillery-2` shows Sullivans Cove (Tasmania) casks and `Fly-fishing` looks
  non-local — both should be replaced with Islay imagery.

## Still to do

- Nav links currently jump to sections on this page; point them at the real inner
  pages (Hotel, Bar & Restaurant, Lounge, Rooms, Travel) once those are built.
- The seasonal offer strip and the top bar are the two blocks meant to be
  editable — in the prototype they were `showOffer` / `showTopBar` flags.
