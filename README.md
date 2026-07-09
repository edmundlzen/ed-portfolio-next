# Edmund's Portfolio

A personal portfolio site for Edmund Lim, built with Next.js, that combines an animated, story-style hero with a project showcase and a real-time, multiplayer layer showing who else is currently browsing the site.

## Key Features

- **Multiplayer presence via Liveblocks** — every visitor is assigned a randomly generated name (via `faker-js`, localized to Chinese or English based on browser language) and rendered as a live, spring-animated cursor on other visitors' screens in real time, with a running count of how many people are currently on the page.
- **Animated, parallax-driven hero section** — combines `react-scroll-parallax` and `react-parallax-mouse` with Framer Motion spring animations for a scroll- and mouse-reactive landing section, including a typewriter intro (`react-typing-effect`) and a rotating multilingual greeting ("Hi!", "你好！", "Apa khabar?", "வணக்கம்", "こんにちは", "안녕하세요").
- **Project showcase** — a responsive grid of project cards, each with an auto-playing image/video carousel (`react-responsive-carousel`), a rich description, and a retro traffic-light style status indicator (live / in development / on hold / deprecated). Includes a "mystery" card teasing future projects.
- **Image/video lightbox** — clicking any carousel item opens a full-screen modal with a download link for the asset.
- **Dynamic Open Graph image generation** — `/api/dyn_images/home` uses `@vercel/og` on the Edge runtime to render a branded share-preview image on the fly, wired up as the `og:image` / `twitter:image` for link previews.
- **Resume redirect** — a "Download my resume" button that opens a dedicated resume subdomain.
- **Vercel Analytics** integration for lightweight, privacy-friendly visitor analytics.
- **Experimental/hidden pages** — a `/spin` page (a spinning image over a looping YouTube embed) and a `/test/[text]` page rendering custom text on an LED dot-matrix-style display, driven by a hand-built pixel font (`src/res/letters.ts`).

## Tech Stack

- **Framework:** [Next.js 13](https://nextjs.org/) (Pages Router) with TypeScript
- **UI:** [Chakra UI](https://chakra-ui.com/), Tailwind CSS, Emotion
- **Animation:** [Framer Motion](https://www.framer.com/motion/), `react-scroll-parallax`, `react-parallax-mouse`, `react-typing-effect`
- **Real-time collaboration:** [Liveblocks](https://liveblocks.io/) (`@liveblocks/client`, `@liveblocks/react`) for shared presence and storage
- **Media:** `react-responsive-carousel` for image/video carousels
- **Dynamic images:** [`@vercel/og`](https://vercel.com/docs/functions/og-image-generation) for Edge-rendered Open Graph images
- **Analytics:** `@vercel/analytics`
- **Utilities:** `@faker-js/faker`, `moment`, `zod`
- **Tooling:** ESLint, Prettier (with `prettier-plugin-tailwindcss`), PostCSS/Autoprefixer

## Setup / Run Locally

**Requirements:** Node.js and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Environment variables are validated on startup via `src/env.mjs` (using `zod`). No custom secrets are required to run the project locally beyond the standard Next.js environment.

3. Run the development server:

   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:3000](http://localhost:3000).

4. Build for production:

   ```bash
   npm run build
   npm run start
   ```

Other available scripts:

```bash
npm run lint   # Run ESLint
```
