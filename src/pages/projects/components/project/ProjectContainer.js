import React from "react";

const ProjectContainer = ({ children, ...props }) => {
  return (
    <div {...props} className="flex flex-col pb-2 overflow-auto">
      {children}
    </div>
  );
};

export default ProjectContainer;
