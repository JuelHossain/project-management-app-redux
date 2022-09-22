import PerfectScrollbar from "react-perfect-scrollbar";

const ProjectContainer = ({ children, ...props }) => {
  return (
    children && (
      <PerfectScrollbar
        {...props}
        className="flex flex-col pb-2 overflow-auto gap-3"
      >
        {children}
      </PerfectScrollbar>
    )
  );
};

export default ProjectContainer;
