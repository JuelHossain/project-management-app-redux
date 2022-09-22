import PerfectScrollbar from "react-perfect-scrollbar";

const ProjectContainer = ({ children, ...props }) => {
  return (
    children && (
      <PerfectScrollbar {...props} className="flex flex-col pb-2 overflow-auto">
        {children}
      </PerfectScrollbar>
    )
  );
};

export default ProjectContainer;
