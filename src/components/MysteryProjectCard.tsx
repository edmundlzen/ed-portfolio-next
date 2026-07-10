import { motion } from "framer-motion";
import { useState } from "react";

const STAGES = [
  "Coming soon, probably.",
  "> initializing…",
  "> gathering ideas…",
  "> npm install inspiration",
  "> ETA: soon™",
  "> ok, that's enough clicking.",
  "> fine — go look at my github instead →",
];

const MysteryProjectCard = () => {
  const [stage, setStage] = useState(0);
  const done = stage >= STAGES.length - 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      onClick={() => setStage((s) => Math.min(s + 1, STAGES.length - 1))}
      className="flex h-full min-h-[280px] cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-transparent p-5 text-center transition-colors hover:border-fg/25"
    >
      <span className="font-serif text-4xl italic text-faint">? ? ?</span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
        what could be next
      </span>
      {done ? (
        <a
          href="https://github.com/edmundlzen"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-sm text-accent underline underline-offset-4"
          onClick={(event) => event.stopPropagation()}
        >
          {STAGES[stage]}
        </a>
      ) : (
        <span
          key={stage}
          className={
            "media-fade text-sm " + (stage === 0 ? "text-muted" : "font-mono text-muted")
          }
        >
          {STAGES[stage]}
        </span>
      )}
    </motion.article>
  );
};

export default MysteryProjectCard;
