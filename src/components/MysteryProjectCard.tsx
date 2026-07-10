import { motion } from "framer-motion";

const MysteryProjectCard = () => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="flex h-full min-h-[280px] cursor-help flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-transparent p-5 text-center"
    >
      <span className="font-serif text-4xl italic text-faint">? ? ?</span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-faint">
        what could be next
      </span>
      <span className="text-sm text-muted">Coming soon, probably.</span>
    </motion.article>
  );
};

export default MysteryProjectCard;
