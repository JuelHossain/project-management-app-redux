import React from "react";

const PageHeader = ({ title, children, Add }) => {
  return (
    <div className="px-5 sm:px-10 mt-6 flex justify-between">
      <h1 className="text-2xl font-bold">{children || title}</h1>
      {Add && <Add />}
    </div>
  );
};

export default PageHeader;
