import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 relative">
      {children}
    </div>
  );
};

export default PageContainer;
