import React from "react";

const SectionContainer = ({ children }) => {
  return (
    <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
      {children}
    </div>
  );
};

export default SectionContainer;
