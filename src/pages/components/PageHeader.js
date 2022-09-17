import { IconButton } from "@material-tailwind/react";
import React from "react";

const PageHeader = ({ title, children, add = false }) => {
  return (
    <div className="px-5 sm:px-10 mt-6 flex justify-between">
      <h1 className="text-2xl font-bold">{children || title}</h1>
      {add && (
        <IconButton className="w-7 h-7">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </IconButton>
      )}
    </div>
  );
};

export default PageHeader;
