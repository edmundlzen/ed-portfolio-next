interface projectCardProps {
  title: string;
  description: string;
  image: string;
  github: string | null;
  className?: string;
}

const ProjectCard = (props: projectCardProps) => {
  return (
    <div className="w-72 rounded-t-lg">
      <div
        className={`h-48 rounded-t-lg bg-black bg-cover bg-center shadow-lg
        ${props.className || ""}`}
        style={{ backgroundImage: `url(${props.image})` }}
      />
      <div className="rounded-b-lg bg-slate-800 p-4 text-left font-mono">
        <span className="text-3xl text-gray-100 underline">Scan & Go</span>
        <p className="mt-1 text-sm text-gray-300">
          &gt; A cross-platform mobile app built using{" "}
          <span className="font-bold text-blue-400">react-native</span> &
          <span className="font-bold text-orange-500"> firebase</span>.
        </p>
        <p className="mt-1 text-sm text-gray-300">
          &gt; Allows shoppers to use their phones to scan items to{" "}
          <span className="text-green-400">check prices </span>
          and add them to a shopping cart for{" "}
          <span className="text-yellow-300">fast checkouts</span>.
        </p>
        <p className="mt-1 text-sm text-gray-300">&gt; Freelance project</p>
      </div>
    </div>
  );
};

export default ProjectCard;
