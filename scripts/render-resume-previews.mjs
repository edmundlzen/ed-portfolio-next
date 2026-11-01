// Regenerates public/resume/preview/*.webp from the resume PDFs.
// Run after updating either PDF: npm run resume:previews
//
// Uses PDFium (Chrome's PDF engine) rather than pdf.js — the fancy resume
// contains a shading type pdf.js can't render (it paints a pink block).
import { PDFiumLibrary } from "@hyzyla/pdfium";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "resume", "preview");
await mkdir(OUT, { recursive: true });

const FILES = [
  { slug: "full", filename: "Edmund_Resume_old.pdf" },
  { slug: "simple", filename: "Edmund_Resume_Simple.pdf" },
];

const library = await PDFiumLibrary.init();

for (const { slug, filename } of FILES) {
  const pdfPath = path.join(ROOT, "public", "resume", filename);
  const doc = await library.loadDocument(await readFile(pdfPath));
  let n = 0;
  for (const page of doc.pages()) {
    n += 1;
    const img = await page.render({
      scale: 2,
      render: (opts) =>
        sharp(opts.data, {
          raw: { width: opts.width, height: opts.height, channels: 4 },
        })
          .webp({ quality: 92 })
          .toBuffer(),
    });
    await sharp(img.data).toFile(path.join(OUT, `${slug}-${n}.webp`));
    console.log(`${slug} page ${n}: ${img.width}x${img.height}`);
  }
  doc.destroy();
}
library.destroy();

console.log(
  "\nIf any dimensions changed, update the preview width/height in src/pages/resume.tsx.",
);
