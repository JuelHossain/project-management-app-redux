import React from "react";

const ProjectContainer = ({ children }) => {
  return <div className="flex flex-col pb-2 overflow-auto">{children}</div>;
};

export default ProjectContainer;
