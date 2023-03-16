interface projectCardProps {
  title: string;
  description: string;
  image: string;
  github: string | null;
}

const ProjectCard = (props: projectCardProps) => {
  return (
    <>
      <div
        className={`h-48 w-full rounded-lg bg-black bg-cover bg-center shadow-lg`}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <div className="h-full w-full rounded-lg bg-black bg-opacity-50">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-white">{props.title}</h1>
            <p className="text-white">{props.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
