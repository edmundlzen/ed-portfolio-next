import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";

const MysteryProjectCard = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        rotate: 180,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="flex h-full flex-col rounded-t-lg shadow-lg">
        <div className="relative overflow-hidden rounded-t-md bg-gray-900">
          <div className="absolute top-0 left-0 h-full w-full animate-bg bg-[url(/images/grid_card.svg)] bg-repeat" />
          <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-30" />
          <div className="relative flex h-64 w-full items-center justify-center font-serif text-5xl">
            ? ? ?
          </div>
        </div>
        <div className="flex-1 rounded-b-lg bg-slate-800 p-4 text-left font-mono">
          <div className="relative inline-flex h-48 w-full flex-col items-center justify-end rounded-md bg-gray-900 py-3 shadow-md shadow-gray-900">
            <div className="absolute top-0 left-0 h-full w-full bg-[url(/images/grid_card.svg)] bg-repeat" />
            <span
              className={
                "flex flex-1 items-center justify-center py-3 text-center font-mono text-3xl font-bold"
              }
            >
              What could be next?
            </span>
            <TrafficLight status={"unknown"} statusText={"???"} />
          </div>
          <div className="mt-3">&gt; Coming soon?</div>
        </div>
      </div>
    </motion.div>
  );
};

interface TrafficLightProps {
  status: "red" | "yellow" | "green" | "unknown";
  statusText: string;
}

const TrafficLight = (props: TrafficLightProps) => {
  return (
    <div className="relative inline-flex w-full flex-col items-center justify-center gap-y-2">
      <div className="absolute flex h-5/6 w-8 items-center justify-center border-2 border-gray-500" />
      <div className="relative inline-flex w-full items-center justify-center gap-x-4">
        <div className="absolute flex h-1 w-full items-center justify-center border-2 border-dotted border-gray-600" />
        <div className="z-10 flex h-8 w-fit gap-x-2 rounded-md border border-gray-800 bg-slate-900 p-1 shadow-lg">
          <div className="relative flex w-28 items-center justify-center overflow-hidden rounded-sm bg-black py-2 text-sm shadow-inner shadow-gray-700">
            <div className="w-full animate-marquee whitespace-nowrap text-center">
              <span
                className={
                  "font-bold" +
                  {
                    red: " text-red-600",
                    yellow: " text-yellow-400",
                    green: " text-green-500",
                    unknown: " text-gray-500",
                  }[props.status]
                }
              >
                {props.statusText.slice(0, 1).toUpperCase() +
                  props.statusText.slice(1)}
              </span>
            </div>
            <div className="absolute w-full animate-marquee2 whitespace-nowrap text-center">
              <span
                className={
                  "font-bold" +
                  {
                    red: " text-red-600",
                    yellow: " text-yellow-400",
                    green: " text-green-500",
                    unknown: " text-gray-500",
                  }[props.status]
                }
              >
                {props.statusText.slice(0, 1).toUpperCase() +
                  props.statusText.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative inline-flex w-full items-center justify-center gap-x-4">
        {/* <div className="absolute flex h-1 w-full items-center justify-center border-2 border-dotted border-gray-600" /> */}
        <div className="z-10 flex h-8 w-fit items-center justify-center gap-x-2 rounded-full border border-gray-700 bg-slate-900 p-2 shadow-lg">
          {/* <div className="flex items-center justify-center">
              Status:&nbsp;{props.status}
            </div> */}
          {
            {
              deprecated: (
                <>
                  <div className="h-4 w-4 rounded-full bg-red-600 shadow-inner shadow-red-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                </>
              ),
              "in development": (
                <>
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-yellow-400 shadow-inner shadow-yellow-100" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                </>
              ),
              "on hold": (
                <>
                  <div className="h-4 w-4 rounded-full bg-red-600 shadow-inner shadow-red-300" />
                  <div className="h-4 w-4 rounded-full bg-yellow-400 shadow-inner shadow-yellow-100" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                </>
              ),
              live: (
                <>
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-green-500 shadow-inner shadow-green-100" />
                </>
              ),
              "???": (
                <>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-xs shadow-inner shadow-gray-300">
                    ?
                  </div>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-xs shadow-inner shadow-gray-300">
                    ?
                  </div>
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-xs shadow-inner shadow-gray-300">
                    ?
                  </div>
                </>
              ),
            }[props.statusText]
          }
        </div>
      </div>
    </div>
  );
};

export default MysteryProjectCard;
