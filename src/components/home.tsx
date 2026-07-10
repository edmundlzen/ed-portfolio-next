import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className="w-full max-w-sm overflow-hidden rounded-lg border border-line bg-surface shadow-2xl shadow-black/40"
    >
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
          I&apos;m <span className="italic text-accent">Edmund</span>
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
    <section id="projects" className="mx-auto w-full max-w-6xl px-5 py-24">
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
    <section id="contact" className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-5 py-24">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          ## contact
        </span>
        <h2 className="font-serif text-5xl leading-tight text-fg md:text-7xl">
          Let&apos;s build <span className="italic">something</span>.
        </h2>
        <a
          href={`mailto:${EMAIL}`}
          className="group flex items-center gap-2 font-mono text-lg text-muted transition-colors hover:text-accent md:text-2xl"
        >
          {EMAIL}
          <ArrowIcon />
        </a>
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
        <Nav />
        <Hero />
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
