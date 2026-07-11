import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const FULL_RESUME = {
  name: "full.pdf",
  href: "/resume/Edmund_Resume.pdf",
  download: "Edmund_Resume.pdf",
  note: "# fancy, for screens",
  // Pre-rendered with PDFium (scratchpad render-pdfium.mjs) — the PDF plugin
  // rasterizes the fancy gradients on every scroll frame and lags badly.
  preview: { src: "/resume/preview/full-1.webp", width: 1186, height: 1678 },
};

const RESUME_FILES = [
  FULL_RESUME,
  {
    name: "simple.pdf",
    href: "/resume/Edmund_Resume_Simple.pdf",
    download: "Edmund_Resume_Simple.pdf",
    note: "# plain, for printers",
    preview: { src: "/resume/preview/simple-1.webp", width: 1190, height: 1684 },
  },
];

const entrance = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut", delay },
});

function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-x-0 top-0 h-[130vh] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-48 right-[6%] h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute bottom-[-10%] -left-48 h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-[120px]" />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-line bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5">
        <span className="font-mono text-sm text-fg">
          <Link href="/" className="transition-colors hover:text-accent">
            <span className="text-accent">~/</span>edmundlzen
          </Link>
          <span className="text-muted">/resume</span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-xs text-faint">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          open to work
        </span>
      </nav>
    </header>
  );
}

const ResumePage: NextPage = () => {
  const [active, setActive] = useState(FULL_RESUME);

  return (
    <>
      <Head>
        <title>edmundlzen — resume</title>
        <meta name="description" content="Edmund's resume — fancy and printer-friendly versions" />
      </Head>
      <main className="grain relative min-h-screen bg-ink">
        <Atmosphere />
        <Nav />
        <div className="relative mx-auto w-full max-w-4xl px-5 pt-28 pb-16">
          <motion.p
            {...entrance(0)}
            className="font-mono text-xs uppercase tracking-widest text-accent"
          >
            ## resume
          </motion.p>
          <motion.h1
            {...entrance(0.1)}
            className="mt-3 font-serif text-5xl leading-none text-fg md:text-6xl"
          >
            Me, on <em className="text-accent">paper</em>
            <span className="text-faint">.</span>
          </motion.h1>
          <motion.p {...entrance(0.2)} className="mt-4 text-sm text-muted">
            Two builds of the same file — pick whichever suits your reader.
          </motion.p>

          {/* Preview window */}
          <motion.div
            {...entrance(0.3)}
            className="mt-8 overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/60"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
            <div className="flex items-center justify-between border-b border-line bg-raised px-3 sm:px-4">
              <div className="flex items-center gap-4">
                {/* decorative — first thing to go when width is scarce */}
                <div className="hidden items-center gap-1.5 sm:flex">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                </div>
                <div className="flex">
                  {RESUME_FILES.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setActive(file)}
                      className={`whitespace-nowrap border-b-2 px-2.5 py-3 font-mono text-xs transition-colors sm:px-3 ${
                        active.name === file.name
                          ? "border-accent text-fg"
                          : "border-transparent text-faint hover:text-muted"
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="mr-1.5 hidden font-mono text-xs text-faint md:block">
                  {active.note}
                </span>
                <a
                  href={active.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group hidden items-center gap-1.5 rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent sm:flex"
                  title="open in new tab"
                >
                  open
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
                <a
                  href={active.href}
                  download={active.download}
                  className="group my-2 flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  download
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
            <div className="flex h-[72vh] min-h-[26rem] overflow-y-auto bg-raised p-3 sm:p-5">
              {/* m-auto centers the page when it's shorter than the pane
                  (mobile) without clipping the top when it's taller */}
              <a
                href={active.href}
                target="_blank"
                rel="noreferrer"
                title="open in new tab"
                className="m-auto block w-full"
              >
                {/* key restarts the cross-fade when the tab changes */}
                <Image
                  key={active.preview.src}
                  src={active.preview.src}
                  width={active.preview.width}
                  height={active.preview.height}
                  alt={`resume preview — ${active.name}`}
                  sizes="(max-width: 896px) 100vw, 824px"
                  priority
                  className="media-fade h-auto w-full ring-1 ring-line"
                />
              </a>
            </div>
          </motion.div>

          <motion.div {...entrance(0.4)} className="mt-8 font-mono text-xs leading-relaxed">
            <p className="text-muted">
              <span className="text-accent">$</span> diff full.pdf simple.pdf
            </p>
            <p className="text-faint"># same person, fewer colors</p>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ResumePage;
