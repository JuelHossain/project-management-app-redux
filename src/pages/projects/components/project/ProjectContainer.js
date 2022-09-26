import ScrollBar from "react-perfect-scrollbar";

const ProjectContainer = ({ children, ...props }) => {
  return (
    children && (
      <ScrollBar {...props} className="flex flex-col pb-2 overflow-auto gap-3">
        {children}
      </ScrollBar>
    )
  );
};

export default ProjectContainer;
