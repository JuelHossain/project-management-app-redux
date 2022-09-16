import React from "react";

const TeamCardContainer = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 mt-4 gap-6 overflow-auto">
      {children}
    </div>
  );
};

export default TeamCardContainer;
