import { type NextPage } from "next";
import { useState } from "react";

const Spin: NextPage = () => {
  const [start, setStart] = useState(false);

  if (!start) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-center bg-black">
      <iframe
        src="https://www.youtube.com/embed/CcCw1ggftuQ?autoplay=1&loop=1"
        title="Flo Rida - Right Round (feat. Ke$ha) [US Version] (Official Video)"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="absolute h-full w-full scale-150"
      />
      {/* Click blocker */}
      <div className="absolute h-full w-full" />
      <img
        src="/images/spin.jpg"
        className="pointer-events-none h-1/2 animate-spin rounded-full shadow-md shadow-black"
        alt="spin"
      />
    </div>
  );
};

export default Spin;
