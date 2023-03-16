interface projectCardProps {
  title: string;
  description: string;
  image: string;
  github: string | null;
  className?: string;
}

const ProjectCard = (props: projectCardProps) => {
  return (
    <div>
      <div
        className={`h-48 w-72 rounded-t-lg bg-black bg-cover bg-center shadow-lg
        ${props.className || ""}`}
        style={{ backgroundImage: `url(${props.image})` }}
      />
    </div>
  );
};

export default ProjectCard;
