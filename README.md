# APEX — The Racing Works

**Mockup 3** in the client-demos series (siblings: `pelagic/`, `solstice/`): a
scroll-storytelling, award-site style single page for a fictional independent
GP racing team. Pinned sections, a horizontal-scroll season, text masking,
and image parallax.

Deliberately unlike the other two: Swiss racing-poster look with alternating
chalk-white and carbon-black plates, one signal red, and condensed uppercase
Anton headlines over Space Grotesk body and IBM Plex Mono timing labels.

## Stack (latest versions from npmjs.com at build time, 2026-07-14)

| Library | Version | Role |
|---|---|---|
| next | 16.2.10 | App Router, TypeScript, Turbopack |
| react / react-dom | 19.2.x | UI runtime |
| tailwindcss | 4.x | Styling (`@theme` tokens in `globals.css`) |
| motion | 12.42.2 | All scroll choreography (`useScroll` + `useTransform`) |
| lenis | 1.3.25 | Smooth scroll |

Fonts (next/font/google): Anton · Space Grotesk · IBM Plex Mono.

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

## The scroll tricks

- **Text masking** (`Hero.tsx`) — the APEX wordmark is transparent text with
  an animated livery gradient painted inside the letterforms via
  `background-clip: text`.
- **Pinned word-fill** (`Manifesto.tsx`) — a 280vh region pins the creed while
  scroll floods each word with ink, one after another.
- **Horizontal scroll** (`Season.tsx`) — a 420vh region whose sticky viewport
  translates a train of circuit chapters sideways; the travel distance is
  measured from the real track width so it ends exactly on the last chapter
  at any screen size. Each circuit outline draws itself with an SVG
  `pathLength` animation on arrival.
- **Image parallax** (`Works.tsx`) — abstract livery plates drift at their own
  speeds against the scroll direction.
- Plus a signal-red lap-progress bar, timing-board marquees between plates,
  and a `mix-blend-difference` nav that stays legible over every section.
