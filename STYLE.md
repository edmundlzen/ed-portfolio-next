# edmundlzen.dev — Style Guide

The design language of this site: **a refined terminal**. Dark editor
atmosphere, editorial serif headlines, one signature green, and small
interactive jokes for people who poke around. Calm by default, playful when
touched.

Use this guide when adding pages, components, or content so everything keeps
feeling like one hand made it.

---

## 1. Philosophy

1. **Terminal voice, editorial body.** Structure and labels speak like a
   shell (`~/projects/`, `## contact`, `$`, `git:(main)`); headlines speak
   like a magazine (large serif, italics for emphasis).
2. **One accent.** Green is the only color with an opinion. Everything else
   is a neutral. If two things are accent-colored and adjacent, one of them
   is wrong.
3. **Atmosphere is cheap, motion is earned.** Depth comes from static
   layers (grid, glows, grain) that paint once. Animation is reserved for
   entrances, hovers, and typing — never continuous loops that fight for
   attention (exception: the marquee and blink cursor, which are slow and
   small).
4. **Personality is opt-in.** Easter eggs reward curiosity (clicking,
   keyboard, dev tools) but never interrupt someone who just wants to read.
5. **Performance is part of the aesthetic.** No animation may cause React
   re-renders on pointer/scroll events. Write to the DOM directly behind
   `requestAnimationFrame` if you must track the pointer.

---

## 2. Color

Defined in `tailwind.config.cjs`. Dark only.

| Token     | Value                     | Role |
| --------- | ------------------------- | ---- |
| `ink`     | `#0B0D0C`                 | Page background. Near-black with a green undertone. |
| `surface` | `#111413`                 | Cards, panels. One step up from ink. |
| `raised`  | `#171B19`                 | Window chrome, title bars. Two steps up. |
| `line`    | `rgba(228,233,228,0.09)`  | Every border. Hairlines only — 1px, low contrast. |
| `fg`      | `#E4E9E4`                 | Primary text. |
| `muted`   | `#96A09A`                 | Secondary text, descriptions. |
| `faint`   | `#5C6660`                 | Tertiary: line numbers, punctuation, hints, ghost text. |
| `accent`  | `#6EE7A0`                 | The green. Links on hover, status, prompts, highlights. |

Supporting cast (used sparingly, mostly in "window chrome" contexts):
- `red-400` — close buttons, errors, the `false` that appears when someone
  clicks `open_to_work`.
- `amber-300` — minimize dots, JSON booleans.

Rules:
- Backgrounds go `ink → surface → raised`; never invent a fourth step.
- Accent at full strength only on small elements (dots, prompts, labels).
  On large areas use it at low opacity: glows are `bg-accent/[0.06–0.10]`,
  borders `accent/40–70`.
- Text hierarchy is `fg → muted → faint`. Don't use pure white or gray-500s.
- Selection is inverted: `::selection { background: accent; color: ink }`.

---

## 3. Typography

Three families, loaded via `next/font` in `_app.tsx`, exposed as CSS
variables:

| Family | Tailwind class | Use for |
| ------ | -------------- | ------- |
| **Fraunces** (`--font-serif`) | `font-serif` | Headlines, project titles, big statements. Italic + accent for the emphasized word: *"I'm **Edmund**."*, *"Let's build **something**."* |
| **Sora** (`--font-sans`) | `font-sans` | Body copy, descriptions. Default on `<body>`. |
| **Cascadia Code** (`--font-mono`, self-hosted in `public/fonts`) | `font-mono` | Everything terminal: labels, prompts, nav, tags, buttons, footers, code. |

Scale and treatments:
- Hero name: `text-6xl md:text-8xl` serif, `leading-none`.
- Section titles: `text-5xl` serif (`md:text-7xl` for the contact closer).
- Card titles: `text-2xl` serif.
- Body: `text-lg` (hero intro) or `text-sm`/`text-base` muted elsewhere.
- Mono labels: `text-xs` or `text-[11px]`, `uppercase tracking-widest` when
  they are section markers (`## selected work`) or kinds (`MOBILE APP`).
- Mono inline code/paths stay lowercase: `~/projects/scan-and-go`.
- Serif periods/punctuation after a name are `text-faint` — the sentence
  ends quietly.

Section headers always stack: mono accent label (`## contact`) above the
serif headline, optional muted one-liner below.

---

## 4. Space & Layout

- Content column: `max-w-6xl mx-auto px-5`.
- Sections breathe: `py-24`. The hero is `md:min-h-screen`.
- Cards: `rounded-lg border border-line bg-surface`, inner padding `p-5`.
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`.
- Full-bleed strips (marquee, footer) run edge to edge with `border-y
  border-line`; everything else stays in the column.
- Oversized outlined numerals (`01`, `02` — `.ghost-number`, `text-[11rem]`
  serif, stroked, transparent fill) anchor each section's top-right on
  desktop, hidden on mobile.
- One deliberate imperfection per composition: the info.json card is tilted
  `-rotate-2` and straightens on hover. Don't add a second tilted thing to
  the same view.

---

## 5. Atmosphere (backgrounds)

Layered, all static, all `pointer-events-none`:

1. **Grid** — 44px blueprint lines at 5% opacity (`.bg-grid`), masked with a
   radial gradient so it's strongest at the top and dissolves before the
   content gets dense.
2. **Glows** — 26–30rem radial blobs of `accent/[0.06–0.10]` with
   `blur-[120–140px]`, placed asymmetrically (top-right, mid-left, and one
   under the contact section).
3. **Grain** — fixed SVG noise overlay at 3.5% opacity (`.grain::before`),
   above everything, gives the dark surfaces tooth.
4. **Spotlight** — a 34rem radial glow that follows the cursor
   (`rgba(110,231,160,0.05)`), written directly to `element.style` inside
   `requestAnimationFrame`; disabled on touch devices.

Windows (info.json, terminal) get a gradient hairline across their top edge:
`h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent`.

---

## 6. Motion

Framer Motion for entrances, CSS for everything continuous.

- **Entrances:** fade + rise. `initial={{ opacity: 0, y: 16–24 }}` →
  `{ opacity: 1, y: 0 }`, `duration: 0.5, ease: "easeOut"`. Hero elements
  stagger by `delay: 0.1` steps. Scroll sections use `whileInView` with
  `viewport={{ once: true }}`. Never rotate/spring-scale into view.
- **Hovers:** small and physical — cards `whileHover={{ y: -6 }}` with a
  deepened shadow; icons nudge `translate-x-0.5`; traffic lights
  `scale-110`. 200–300ms transitions.
- **Typing:** the typewriter (greetings, tab title) types at ~90ms/char,
  holds ~1.8s, deletes at ~45ms/char. Block cursor `▮` blinks with a
  `step-end` keyframe at 1.1s.
- **Marquee:** 40s linear loop, duplicated content translating `-50%`, with
  `from-ink` gradient fades at both edges.
- **Scroll progress:** 2px accent bar, `scaleX` bound to `useScroll`.
- Media changes cross-fade via the `.media-fade` keyframe (0.35 → 1 opacity,
  300ms) — used for card media, easter egg text swaps.

Hard rule: nothing re-renders React on `pointermove`/`scroll`. The old site
died on this hill.

---

## 7. Voice & Copy

- Lowercase mono for anything the "system" says: `// the good stuff is
  below ↓`, `git:(main)`, `built with next.js, tailwind & stubbornness`.
- Comments (`//`, `#`) are how the site whispers. Hints and jokes are
  formatted as code comments in `faint`.
- Human sentences (serif/sans) use normal capitalization.
- Humor is dry and brief: "permission denied (nice try)", "no. we've all
  been hurt enough.", "ETA: soon™". One joke per moment; never explain it.
- JSON is a first-class copy format: facts about Edmund are presented as
  syntax-highlighted key/values (`"open_to_work": true`).

---

## 8. Component Recipes

**Window chrome** (info.json card, terminal): traffic-light dots
(`red-400/70`, `amber-300/70`, `accent/70`, `h-2.5 w-2.5`), mono filename
in `muted`, `bg-raised` title bar, `border-b border-line`, gradient hairline
on top. If the dots are interactive, reveal ×/−/+ glyphs on row hover.

**Terminal-path label** (card headers): accent prefix + faint path —
`<span class="text-accent/70">~/projects/</span><span class="text-faint">slug</span>`,
with the item's kind uppercase mono `muted` on the opposite side.

**Tag**: `rounded border border-line px-1.5 py-0.5 font-mono text-[11px]
text-muted`.

**Mono link**: `font-mono text-sm text-muted hover:text-accent` with a `↗`
arrow that nudges up-right on hover; underline only via `border-b` on hover.

**Presence/status dot**: `h-1.5 w-1.5 rounded-full bg-accent` with an
`animate-ping` twin behind it, inside a `border-line` pill.

**Dashed = placeholder**: not-yet-real things (mystery card) use
`border-dashed border-line` and `faint` text.

---

## 9. Easter Egg Ethos

Hidden things follow a chain — each reward hints at the next:

dev-tools console → backtick terminal → `sudo hire_me` / `spin` → Konami
code → `/spin`.

Rules: discoverable by curiosity (click, keyboard, console), never required,
never block reading, always in-voice (fake build logs, permission errors,
`soon™`). Interactive lies must self-correct: `open_to_work` flips to
`false` for 1.6s, then snaps back with `// nice try`.

---

## 10. Performance Checklist (before shipping any new element)

- [ ] No React re-render on pointermove/scroll (direct DOM writes + rAF).
- [ ] Continuous animation is CSS-only, slow, and small.
- [ ] Backgrounds are static layers; blurs/glows don't animate.
- [ ] Images through `next/image` with `sizes`; videos `muted playsInline
      preload="metadata"`.
- [ ] Decorative absolute elements can't widen the page (`overflow-x: clip`
      guards it, but don't rely on it).
- [ ] New fonts/deps: think twice — the whole personality layer costs ~6 kB.
