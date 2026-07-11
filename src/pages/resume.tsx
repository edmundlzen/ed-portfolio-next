import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const FULL_RESUME = {
  name: "full.pdf",
  href: "/resume/Edmund_Resume.pdf",
  download: "Edmund_Resume.pdf",
  note: "# fancy, for screens",
};

const RESUME_FILES = [
  FULL_RESUME,
  {
    name: "simple.pdf",
    href: "/resume/Edmund_Resume_Simple.pdf",
    download: "Edmund_Resume_Simple.pdf",
    note: "# plain, for printers",
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
            <div className="flex items-center justify-between border-b border-line bg-raised px-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                </div>
                <div className="flex">
                  {RESUME_FILES.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setActive(file)}
                      className={`border-b-2 px-3 py-3 font-mono text-xs transition-colors ${
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
                  className="group my-2 flex items-center gap-1.5 rounded border border-line px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  download
                  <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
              </div>
            </div>
            {/* key remounts the viewer when the tab changes — plugins don't
                react to a data prop update */}
            <object
              key={active.href}
              data={`${active.href}#toolbar=0&navpanes=0`}
              type="application/pdf"
              aria-label={`resume preview — ${active.name}`}
              className="media-fade h-[72vh] min-h-[26rem] w-full bg-raised"
            >
              {/* Rendered where inline PDFs aren't supported (most phones) */}
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="font-mono text-xs text-faint">
                  {"// no inline pdf viewer here — grab the file instead"}
                </p>
                <a
                  href={active.href}
                  download={active.download}
                  className="rounded border border-line px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                >
                  download {active.name} ↓
                </a>
              </div>
            </object>
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
