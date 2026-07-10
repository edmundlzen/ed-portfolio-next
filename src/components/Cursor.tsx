import { motion } from "framer-motion";

// Spring animated live-presence cursor for other visitors
export default function Cursor({
  color,
  name,
  x,
  y,
}: {
  color: string;
  name: string;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 z-40"
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <CursorSvg color={color} />
      <div
        className="ml-3 -mt-1 w-fit rounded-full border border-line bg-raised px-2 py-0.5 shadow-lg"
        style={{ color }}
      >
        <div className="font-mono text-xs">{name}</div>
      </div>
    </motion.div>
  );
}

// SVG cursor shape
function CursorSvg({ color }: { color: string }) {
  return (
    <svg width="24" height="33" viewBox="0 0 24 36" fill="none">
      <path
        fill={color}
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
      />
    </svg>
  );
}
