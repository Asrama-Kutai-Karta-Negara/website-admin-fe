const ProjectTextOrdering = ({ name, width = null }: { name: string, width: string | null; }) => {
  return (
    <div className={`flex flex-row items-center gap-3 py-1 cursor-pointer group ${width ? `w-${width}` : ''}`}>
      <h1 className="font-normal text-sm hover:border-b hover:border-primary border-b border-transparent w-fit">
        {name}
      </h1>
    </div>
  );
};

export default ProjectTextOrdering;