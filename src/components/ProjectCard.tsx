import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";

interface projectCardProps {
  title: string;
  description: ReactNode;
  carouselItems: ReactNode[];
}

const ProjectCard = (props: projectCardProps) => {
  return (
    <div className="w-full rounded-t-lg shadow-lg">
      <div>
        <Carousel
          showThumbs={false}
          infiniteLoop
          emulateTouch
          autoPlay
          interval={1000 * 12}
        >
          {props.carouselItems &&
            props.carouselItems.map((item, index) => {
              return <div key={index}>{item}</div>;
            })}
        </Carousel>
      </div>
      <div className="rounded-b-lg bg-slate-800 p-4 text-left font-mono">
        <span className="text-3xl text-gray-100 underline">Scan & Go</span>
        <div>{props.description}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
