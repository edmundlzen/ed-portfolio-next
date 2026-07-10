import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "~/data/projects";

interface TermLine {
  kind: "in" | "out" | "accent" | "err";
  text: string;
}

const EMAIL = "edmundlzen@gmail.com";

const INFO_JSON = `{
  "name": "Edmund",
  "location": "Johor, Malaysia",
  "skills": [
    "TypeScript", "JavaScript", "Python",
    "React", "Node.js", "HTML", "CSS"
  ],
  "open_to_work": true
}`;

const LINE_STYLES: Record<TermLine["kind"], string> = {
  in: "text-fg",
  out: "text-muted",
  accent: "text-accent",
  err: "text-red-400",
};

export default function Terminal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [lines, setLines] = useState<TermLine[]>([
    { kind: "accent", text: "edmundlzen.dev — type `help` to get started." },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines, open]);

  function print(...newLines: TermLine[]) {
    setLines((prev) => [...prev, ...newLines]);
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    print({ kind: "in", text: `$ ${raw.trim()}` });

    switch (cmd) {
      case "":
        break;
      case "help":
        print(
          { kind: "out", text: "available commands:" },
          { kind: "out", text: "  whoami      who are you (and who am I)" },
          { kind: "out", text: "  ls          look around" },
          { kind: "out", text: "  cat info.json" },
          { kind: "out", text: "  projects    jump to the projects" },
          { kind: "out", text: "  github      open my github" },
          { kind: "out", text: "  resume      open my résumé" },
          { kind: "out", text: "  email       say hi" },
          { kind: "out", text: "  sudo hire_me" },
          { kind: "out", text: "  clear / exit" }
        );
        break;
      case "whoami":
        print(
          { kind: "out", text: "you: guest — the person this site was built for." },
          {
            kind: "out",
            text: "me: Edmund, student & developer from Johor, Malaysia.",
          }
        );
        break;
      case "ls":
        print({
          kind: "out",
          text: "projects/   info.json   resume.pdf   secrets/",
        });
        break;
      case "ls secrets":
      case "ls secrets/":
      case "cd secrets":
        print({ kind: "err", text: "permission denied (nice try)" });
        break;
      case "cat info.json":
        INFO_JSON.split("\n").forEach((line) =>
          print({ kind: "out", text: line })
        );
        break;
      case "ls projects":
      case "ls projects/":
      case "projects":
        projects.forEach((p) =>
          print({ kind: "out", text: `  ${p.title}  [${p.status}]` })
        );
        if (cmd === "projects") {
          print({ kind: "accent", text: "taking you there…" });
          window.location.hash = "#projects";
        }
        break;
      case "github":
        print({ kind: "accent", text: "opening github…" });
        window.open("https://github.com/edmundlzen");
        break;
      case "resume":
      case "cat resume.pdf":
        print({ kind: "accent", text: "opening résumé…" });
        window.open("https://resume.edmundlzen.dev");
        break;
      case "email":
      case "contact":
        print({ kind: "accent", text: `drafting mail to ${EMAIL}…` });
        window.location.href = `mailto:${EMAIL}`;
        break;
      case "hire_me":
      case "hire me":
        print({ kind: "err", text: "hire_me: permission denied — try sudo." });
        break;
      case "sudo hire_me":
      case "sudo hire me":
        print({ kind: "out", text: "[sudo] requesting elevated privileges…" });
        setTimeout(
          () => print({ kind: "out", text: "access granted. excellent decision." }),
          500
        );
        setTimeout(() => {
          print({ kind: "accent", text: `opening mail client → ${EMAIL}` });
          window.location.href = `mailto:${EMAIL}?subject=Let's%20work%20together`;
        }, 1200);
        break;
      case "spin":
        print({ kind: "accent", text: "you asked for this…" });
        setTimeout(() => (window.location.href = "/spin"), 600);
        break;
      case "rm -rf /":
      case "rm -rf /*":
        print({ kind: "err", text: "no. we've all been hurt enough." });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        print({ kind: "out", text: "bye 👋" });
        setTimeout(onClose, 350);
        break;
      default:
        print({
          kind: "err",
          text: `command not found: ${cmd} — try \`help\``,
        });
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl overflow-hidden rounded-lg border border-line bg-raised/95 shadow-2xl shadow-black/60 backdrop-blur-md"
        >
          <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="ml-2 font-mono text-xs text-muted">
              guest@edmundlzen: ~
            </span>
            <button
              onClick={onClose}
              aria-label="Close terminal"
              className="ml-auto font-mono text-xs text-faint transition-colors hover:text-fg"
            >
              esc ✕
            </button>
          </div>
          <div
            ref={scrollRef}
            className="h-60 overflow-y-auto p-4 font-mono text-[13px] leading-6"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className={LINE_STYLES[line.kind]}>
                {line.text}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="select-none text-accent">$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    run(value);
                    setValue("");
                  } else if (event.key === "Escape") {
                    onClose();
                  }
                }}
                className="flex-1 bg-transparent font-mono text-[13px] text-fg caret-accent outline-none placeholder:text-faint"
                placeholder="help"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
