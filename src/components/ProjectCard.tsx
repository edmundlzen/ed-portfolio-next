import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";

interface projectCardProps {
  title: string;
  description: ReactNode;
  status: ReactNode;
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
    >
      <div className="rounded-t-lg shadow-lg">
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
                  <div key={index} className="">
                    <Image
                      src={item.src}
                      className="rounded-t-lg"
                      height={648}
                      width={1152}
                      alt={item.alt}
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
        <div className="rounded-b-lg bg-slate-800 p-4 text-left font-mono">
          <span className="flex items-center justify-center text-center text-3xl text-gray-100 underline">
            {props.title}
          </span>
          <div className="flex items-center justify-around">
            <div className="flex items-center justify-center">
              Status:&nbsp;{props.status}
            </div>
          </div>
          <div className="mt-3">{props.description}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
