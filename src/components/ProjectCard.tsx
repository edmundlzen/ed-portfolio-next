import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { type Project, type ProjectStatus } from "~/data/projects";

const STATUS_STYLES: Record<ProjectStatus, { dot: string; text: string }> = {
  live: { dot: "bg-accent", text: "text-accent" },
  "in development": { dot: "bg-amber-400", text: "text-amber-400" },
  "on hold": { dot: "bg-amber-400", text: "text-amber-400" },
  deprecated: { dot: "bg-red-400/80", text: "text-red-400/90" },
};

interface ProjectCardProps {
  project: Project;
  onMediaClick?: (src: string, description: string) => void;
}

const ProjectCard = ({ project, onMediaClick }: ProjectCardProps) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const media = project.media[mediaIndex] ?? project.media[0];
  const status = STATUS_STYLES[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className={
        "group flex h-full flex-col overflow-hidden rounded-lg border bg-surface " +
        (project.highlight ? "border-accent/40" : "border-line")
      }
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-line bg-ink">
        {media && (
          <button
            className="absolute inset-0 h-full w-full cursor-zoom-in"
            aria-label={`Enlarge: ${media.alt}`}
            onClick={() => onMediaClick?.(media.src, media.alt)}
          >
            {media.src.endsWith(".webm") ? (
              <video
                key={media.src}
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
          </button>
        )}
        {project.media.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1.5 rounded-full bg-ink/70 px-2 py-1.5 backdrop-blur-sm">
            {project.media.map((m, i) => (
              <button
                key={m.src}
                aria-label={`Show media ${i + 1}: ${m.alt}`}
                onClick={() => setMediaIndex(i)}
                className={
                  "h-1.5 w-1.5 rounded-full transition-colors " +
                  (i === mediaIndex ? "bg-accent" : "bg-faint hover:bg-muted")
                }
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest ${status.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.dot} ${
                project.status === "live" ? "animate-pulse" : ""
              }`}
            />
            {project.status}
          </span>
          {project.highlight && (
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
              ★ proudest
            </span>
          )}
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
