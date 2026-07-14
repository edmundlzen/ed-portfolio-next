// Regenerates the site favicon — the "signature" mark: Fraunces italic e
// with an accent block cursor, on an ink tile with the window hairline.
// The glyph is baked into a <path> so the SVG needs no font at view time.
//
//   node scripts/make-favicon.mjs
//
// Writes public/favicon.svg, favicon-32.png, favicon-192.png,
// apple-touch-icon.png. Fraunces italic 600 is fetched from Google Fonts
// (same face _app.tsx loads via next/font).
import { writeFileSync } from "node:fs";
import opentype from "opentype.js";
import sharp from "sharp";

const CSS_URL =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,600&display=swap";

// A plain UA makes Google Fonts serve TTF, which opentype.js can parse.
const css = await (await fetch(CSS_URL, { headers: { "user-agent": "curl" } })).text();
const ttfUrl = css.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
if (!ttfUrl) throw new Error("no ttf url in Google Fonts css");
const font = opentype.parse(await (await fetch(ttfUrl)).arrayBuffer());

// Draw the e at a working size, measure it, then center the composition
// (e + gap + cursor) inside the 64x64 tile.
const BOX = 64;
const SIZE = 54;
const glyphPath = font.getPath("e", 0, 0, SIZE); // baseline at y=0
const bb = glyphPath.getBoundingBox();

const GAP = 5.5;
const CURSOR_W = 10;
const CURSOR_H = 30;
const cursorX = bb.x2 + GAP;
const cursorTop = 1 - CURSOR_H; // cursor bottom sits 1px below baseline

const compTop = Math.min(bb.y1, cursorTop);
const compBottom = Math.max(bb.y2, 1);
const dx = (BOX - (cursorX + CURSOR_W - bb.x1)) / 2 - bb.x1;
const dy = (BOX - (compBottom - compTop)) / 2 - compTop;

const d = font.getPath("e", dx, dy, SIZE).toPathData(2);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BOX} ${BOX}">
  <defs>
    <linearGradient id="h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6EE7A0" stop-opacity="0"/>
      <stop offset=".5" stop-color="#6EE7A0" stop-opacity=".6"/>
      <stop offset="1" stop-color="#6EE7A0" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${BOX}" height="${BOX}" rx="14" fill="#0B0D0C"/>
  <rect x="6" y="0" width="${BOX - 12}" height="1" fill="url(#h)"/>
  <path d="${d}" fill="#E4E9E4"/>
  <rect x="${(cursorX + dx).toFixed(2)}" y="${(cursorTop + dy).toFixed(2)}" width="${CURSOR_W}" height="${CURSOR_H}" fill="#6EE7A0"/>
</svg>
`;

writeFileSync("public/favicon.svg", svg);

const outputs = [
  { file: "favicon-32.png", px: 32 },
  { file: "favicon-192.png", px: 192 },
  { file: "apple-touch-icon.png", px: 180 },
];
for (const { file, px } of outputs) {
  await sharp(Buffer.from(svg), { density: (72 * px) / BOX })
    .resize(px, px)
    .png()
    .toFile(`public/${file}`);
  console.log(`wrote public/${file}`);
}
console.log("wrote public/favicon.svg");
