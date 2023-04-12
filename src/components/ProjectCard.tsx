import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";

interface projectCardProps {
  title: string;
  description: ReactNode;
  status: "live" | "in development" | "on hold" | "deprecated";
  carouselItems: {
    src: string;
    alt: string;
  }[];
  onImageClick?: (src: string, description: string) => void;
}

const ProjectCard = (props: projectCardProps) => {
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
        <div>
          <Carousel
            showThumbs={false}
            infiniteLoop
            emulateTouch
            autoPlay
            interval={1000 * 12}
            dynamicHeight
            onClickItem={(index) => {
              if (props.onImageClick) {
                props.onImageClick(
                  props.carouselItems[index]!.src,
                  props.carouselItems[index]!.alt
                );
              }
            }}
          >
            {props.carouselItems &&
              props.carouselItems.map((item, index) => {
                return (
                  <div key={index} className="relative h-64 w-full">
                    <Image
                      src={item.src}
                      className="rounded-t-lg object-cover"
                      fill
                      alt={item.alt}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className="flex-1 rounded-b-lg bg-slate-800 p-4 text-left font-mono">
          <div className="relative inline-flex h-48 w-full flex-col items-center justify-end rounded-md bg-gray-900 py-3 shadow-md shadow-gray-900">
            <div className="absolute top-0 left-0 h-full w-full bg-[url(/images/grid_card.svg)] bg-repeat" />
            <span className="flex flex-1 items-center justify-center py-3 text-center font-mono text-3xl font-bold text-gray-100">
              {props.title}
            </span>
            <TrafficLight
              status={
                props.status === "live"
                  ? "green"
                  : props.status === "in development"
                  ? "yellow"
                  : props.status === "on hold"
                  ? "yellow"
                  : "red"
              }
              statusText={props.status}
            />
          </div>
          <div className="mt-3">{props.description}</div>
        </div>
      </div>
    </motion.div>
  );
};

interface TrafficLightProps {
  status: "red" | "yellow" | "green";
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
        <div className="z-10 flex h-8 w-fit items-center justify-center gap-x-2 rounded-full border border-gray-800 bg-slate-900 p-2 shadow-lg">
          {/* <div className="flex items-center justify-center">
              Status:&nbsp;{props.status}
            </div> */}
          {
            {
              red: (
                <>
                  <div className="h-4 w-4 rounded-full bg-red-600 shadow-inner shadow-red-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                </>
              ),
              yellow: (
                <>
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-yellow-400 shadow-inner shadow-yellow-100" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                </>
              ),
              green: (
                <>
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-gray-700 shadow-inner shadow-gray-300" />
                  <div className="h-4 w-4 rounded-full bg-green-500 shadow-inner shadow-green-100" />
                </>
              ),
            }[props.status]
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
