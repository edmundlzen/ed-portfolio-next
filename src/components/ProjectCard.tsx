import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { type Project } from "~/data/projects";

interface ProjectCardProps {
  project: Project;
  onMediaClick?: (src: string, description: string) => void;
}

const ProjectCard = ({ project, onMediaClick }: ProjectCardProps) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = project.media[mediaIndex] ?? project.media[0];
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const justSwiped = useRef(false);

  const stepMedia = (direction: number) => {
    const count = project.media.length;
    setMediaIndex((i) => (i + direction + count) % count);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || project.media.length < 2) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      justSwiped.current = true;
      stepMedia(dx < 0 ? 1 : -1);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface transition-[border-color,box-shadow] duration-300 hover:border-fg/25 hover:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.8)]"
    >
      <div
        className="relative aspect-video w-full touch-pan-y overflow-hidden border-b border-line bg-ink"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {media && (
          <button
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            aria-label={`Enlarge: ${media.alt}`}
            onClick={() => {
              if (justSwiped.current) {
                justSwiped.current = false;
                return;
              }
              onMediaClick?.(media.src, media.alt);
            }}
          >
            <div key={media.src} className="media-fade absolute inset-0">
              {media.src.endsWith(".webm") ? (
                <video
                  src={media.src}
                  className="h-full w-full object-cover object-top"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              )}
            </div>
          </button>
        )}
        {project.media.length > 1 && (
          <div className="absolute bottom-1.5 right-1.5 flex rounded-full bg-ink/70 px-1 py-0.5 backdrop-blur-sm">
            {project.media.map((m, i) => (
              <button
                key={m.src}
                aria-label={`Show media ${i + 1}: ${m.alt}`}
                onClick={() => setMediaIndex(i)}
                className="group/dot flex h-6 w-3.5 items-center justify-center"
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full transition-colors " +
                    (i === mediaIndex
                      ? "bg-accent"
                      : "bg-faint group-hover/dot:bg-muted")
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
          <span className="truncate text-faint">
            <span className="text-accent/70">~/projects/</span>
            {project.slug}
          </span>
          <span className="shrink-0 uppercase tracking-widest text-muted">
            {project.kind}
          </span>
        </div>
        <h3 className="font-serif text-2xl text-fg">{project.title}</h3>
        <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-muted">
          {project.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="select-none text-faint">–</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
