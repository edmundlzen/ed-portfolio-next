import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Cursor, MysteryProjectCard, ProjectCard } from "~/components";
import { useOthers, useUpdateMyPresence } from "liveblocks.config";
import { projects } from "~/data/projects";

const CURSOR_COLORS = ["#F87171", "#FBBF24", "#6EE7A0", "#A78BFA", "#F472B6"];

const GREETINGS = [
  "Hi!",
  "你好！",
  "Apa khabar?",
  "வணக்கம்",
  "こんにちは",
  "안녕하세요",
];

const EMAIL = "edmundlzen@gmail.com";
const GITHUB_URL = "https://github.com/edmundlzen";
const RESUME_URL = "https://resume.edmundlzen.dev";

function useLiveCursors() {
  const updateMyPresence = useUpdateMyPresence();

  useEffect(() => {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    let lastPosition: { x: number; y: number } | null = null;

    function transformPosition(cursor: { x: number; y: number }) {
      return {
        x: cursor.x / window.innerWidth,
        y: cursor.y,
      };
    }

    function onPointerMove(event: PointerEvent) {
      const position = {
        x: event.pageX,
        y: event.pageY,
      };
      lastPosition = position;
      updateMyPresence({
        cursor: transformPosition(position),
      });
    }

    function onPointerLeave() {
      lastPosition = null;
      updateMyPresence({ cursor: null });
    }

    function onDocumentScroll() {
      if (lastPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastPosition.x + offsetX,
          y: lastPosition.y + offsetY,
        };
        lastPosition = position;
        updateMyPresence({
          cursor: transformPosition(position),
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    }

    document.addEventListener("scroll", onDocumentScroll);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      document.removeEventListener("scroll", onDocumentScroll);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [updateMyPresence]);

  const others = useOthers();

  const cursors = [];

  for (const { connectionId, presence } of others) {
    if (presence.cursor) {
      cursors.push({
        x: presence.cursor.x * window.innerWidth,
        y: presence.cursor.y,
        name: presence.name,
        connectionId,
      });
    }
  }

  return cursors;
}

// Layered background: masked grid + two soft accent glows. Static, so it
// costs one paint — all the atmosphere of the old parallax without the lag.
function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid absolute inset-x-0 top-0 h-[130vh] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-48 right-[6%] h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute top-[28%] -left-48 h-[26rem] w-[26rem] rounded-full bg-accent/[0.06] blur-[120px]" />
    </div>
  );
}

// Cursor-following glow. Writes styles straight to the DOM behind rAF, so it
// never triggers a React re-render.
function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;

    function onPointerMove(event: PointerEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (ref.current) {
          ref.current.style.background = `radial-gradient(34rem circle at ${event.clientX}px ${event.clientY}px, rgba(110,231,160,0.05), transparent 65%)`;
        }
      });
    }

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-0" />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 z-50 h-0.5 origin-left bg-accent/80"
    />
  );
}

const MARQUEE_ITEMS = [
  "TypeScript",
  "JavaScript",
  "Python",
  "React",
  "React Native",
  "Next.js",
  "Node.js",
  "Firebase",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, "open_to_work: true"];

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface/40 py-3.5">
      <div className="flex w-max animate-marquee-scroll">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item) => (
              <span
                key={item}
                className="flex items-center font-mono text-xs uppercase tracking-widest"
              >
                <span
                  className={
                    item.startsWith("open_to_work") ? "text-accent" : "text-muted"
                  }
                >
                  {item}
                </span>
                <span className="mx-6 select-none text-faint">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

function GreetingRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % GREETINGS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-7 items-center gap-2 font-mono text-base text-accent">
      <span className="select-none text-faint">$</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={GREETINGS[index]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {GREETINGS[index]}
        </motion.span>
      </AnimatePresence>
      <span className="inline-block h-4 w-2 animate-blink bg-accent" />
    </div>
  );
}

function PresenceBadge() {
  const others = useOthers();
  const count = others.length + 1;

  return (
    <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {count} online
    </span>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 z-30 w-full border-b border-line bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-mono text-sm text-fg">
          <span className="text-accent">~/</span>edmundlzen
        </a>
        <div className="flex items-center gap-5">
          <a
            href="#projects"
            className="hidden font-mono text-xs text-muted transition-colors hover:text-fg sm:block"
          >
            projects
          </a>
          <a
            href="#contact"
            className="hidden font-mono text-xs text-muted transition-colors hover:text-fg sm:block"
          >
            contact
          </a>
          <PresenceBadge />
        </div>
      </nav>
    </header>
  );
}

const INFO_JSON_LINES: { indent: number; content: JSX.Element }[] = [
  { indent: 0, content: <span className="text-faint">{"{"}</span> },
  {
    indent: 1,
    content: (
      <>
        <span className="text-muted">&quot;name&quot;</span>
        <span className="text-faint">: </span>
        <span className="text-accent">&quot;Edmund&quot;</span>
        <span className="text-faint">,</span>
      </>
    ),
  },
  {
    indent: 1,
    content: (
      <>
        <span className="text-muted">&quot;location&quot;</span>
        <span className="text-faint">: </span>
        <span className="text-accent">&quot;Johor, Malaysia&quot;</span>
        <span className="text-faint">,</span>
      </>
    ),
  },
  {
    indent: 1,
    content: (
      <>
        <span className="text-muted">&quot;skills&quot;</span>
        <span className="text-faint">: [</span>
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-accent/90">&quot;TypeScript&quot;</span>
        <span className="text-faint">, </span>
        <span className="text-accent/90">&quot;JavaScript&quot;</span>
        <span className="text-faint">, </span>
        <span className="text-accent/90">&quot;Python&quot;</span>
        <span className="text-faint">,</span>
      </>
    ),
  },
  {
    indent: 2,
    content: (
      <>
        <span className="text-accent/90">&quot;React&quot;</span>
        <span className="text-faint">, </span>
        <span className="text-accent/90">&quot;Node.js&quot;</span>
        <span className="text-faint">, </span>
        <span className="text-accent/90">&quot;HTML&quot;</span>
        <span className="text-faint">, </span>
        <span className="text-accent/90">&quot;CSS&quot;</span>
      </>
    ),
  },
  { indent: 1, content: <span className="text-faint">],</span> },
  {
    indent: 1,
    content: (
      <>
        <span className="text-muted">&quot;open_to_work&quot;</span>
        <span className="text-faint">: </span>
        <span className="text-amber-300">true</span>
      </>
    ),
  },
  { indent: 0, content: <span className="text-faint">{"}"}</span> },
];

function InfoJsonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
      className="relative w-full max-w-sm"
    >
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-full bg-accent/[0.07] blur-3xl"
      />
      <div className="overflow-hidden rounded-lg border border-line bg-surface/90 shadow-2xl shadow-black/50 backdrop-blur-sm transition-transform duration-500 ease-out md:-rotate-2 md:hover:rotate-0">
        <div
          aria-hidden
          className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
        <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="ml-2 font-mono text-xs text-muted">info.json</span>
        </div>
        <div className="p-4 font-mono text-[13px] leading-6">
          {INFO_JSON_LINES.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 shrink-0 select-none text-right text-faint/60">
                {i + 1}
              </span>
              <span className="ml-3" style={{ paddingLeft: line.indent * 16 }}>
                {line.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function HeroLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      className="group flex items-center gap-1.5 border-b border-transparent font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
      <ArrowIcon />
    </a>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-5 pt-36 pb-24 md:min-h-screen md:flex-row md:justify-between md:gap-8 md:pt-14 md:pb-0"
    >
      <div className="flex max-w-xl flex-col items-start gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <GreetingRotator />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="font-serif text-6xl leading-none text-fg md:text-8xl"
        >
          I&apos;m{" "}
          <span className="relative italic text-accent">
            Edmund
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
              className="absolute -bottom-2 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0"
            />
          </span>
          <span className="text-faint">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="text-lg leading-relaxed text-muted"
        >
          A student and developer from Johor, Malaysia. I love creating things
          and I&apos;m always looking for new opportunities to learn and grow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap items-center gap-6 pt-2"
        >
          <HeroLink href={GITHUB_URL} label="github" />
          <HeroLink href={`mailto:${EMAIL}`} label="email" />
          <HeroLink href={RESUME_URL} label="résumé" />
        </motion.div>
      </div>
      <InfoJsonCard />
    </section>
  );
}

interface LightboxState {
  src: string;
  description: string;
}

function Lightbox({
  media,
  onClose,
}: {
  media: LightboxState | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-ink/90 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex max-h-[75vh] w-full max-w-3xl flex-1 items-center justify-center"
          >
            {media.src.endsWith(".webm") ? (
              <video
                src={media.src}
                className="max-h-full max-w-full rounded-md"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={media.src}
                alt={media.description}
                fill
                className="rounded-md object-contain"
              />
            )}
          </motion.div>
          <p className="font-mono text-sm text-muted">{media.description}</p>
          <button
            className="font-mono text-xs text-faint transition-colors hover:text-fg"
            onClick={onClose}
          >
            esc / click anywhere to close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Projects({
  onMediaClick,
}: {
  onMediaClick: (src: string, description: string) => void;
}) {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-6xl px-5 py-24"
    >
      <span
        aria-hidden
        className="ghost-number absolute right-5 top-10 hidden font-serif text-[11rem] leading-none md:block"
      >
        01
      </span>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          ## selected work
        </span>
        <h2 className="font-serif text-5xl text-fg">Projects</h2>
        <p className="text-muted">
          Things I&apos;ve shipped, broken, or lovingly retired.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onMediaClick={onMediaClick}
          />
        ))}
        <MysteryProjectCard />
      </div>
    </section>
  );
}

function Contact() {
  const others = useOthers();

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]"
      />
      <span
        aria-hidden
        className="ghost-number absolute right-5 top-12 hidden font-serif text-[11rem] leading-none md:block"
      >
        02
      </span>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-24">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          ## contact
        </span>
        <h2 className="font-serif text-5xl leading-tight text-fg md:text-7xl">
          Let&apos;s build <span className="italic">something</span>.
        </h2>
        <p className="max-w-md text-muted">
          Got a project, an opportunity, or just want to say one of the six
          greetings above? My inbox is open.
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="group flex items-center gap-2 font-mono text-lg text-muted transition-colors hover:text-accent md:text-2xl"
        >
          {EMAIL}
          <ArrowIcon />
        </a>
        <div className="flex items-center gap-6 pt-2">
          <HeroLink href={GITHUB_URL} label="github" />
          <HeroLink href={RESUME_URL} label="résumé" />
          <span className="flex items-center gap-1.5 font-mono text-xs text-faint">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            open to work
          </span>
        </div>
      </div>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 font-mono text-xs text-faint sm:flex-row">
          <span>© {new Date().getFullYear()} Edmund Lim</span>
          <span>
            {others.length + 1} {others.length === 0 ? "person" : "people"}{" "}
            here right now — wave your cursor!
          </span>
        </div>
      </footer>
    </section>
  );
}

const Home: NextPage = () => {
  const cursors = useLiveCursors();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <>
      <Head>
        <title>edmundlzen</title>
        <meta name="description" content="Edmund's portfolio" />
      </Head>
      <main className="grain relative min-h-screen bg-ink">
        <Atmosphere />
        <Spotlight />
        <ScrollProgress />
        <Nav />
        <Hero />
        <Marquee />
        <Projects
          onMediaClick={(src, description) => setLightbox({ src, description })}
        />
        <Contact />
      </main>
      <Lightbox media={lightbox} onClose={() => setLightbox(null)} />
      {cursors.map(({ x, y, name, connectionId }) => (
        <Cursor
          key={connectionId}
          color={CURSOR_COLORS[connectionId % CURSOR_COLORS.length] || "#F87171"}
          name={name || "Anonymous"}
          x={x}
          y={y}
        />
      ))}
    </>
  );
};

export default Home;
