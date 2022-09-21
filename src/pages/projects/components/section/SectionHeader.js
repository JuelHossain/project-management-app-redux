import { IconButton } from "@material-tailwind/react";
import React, { useReducer } from "react";
import ProjectCreator from "../project/ProjectCreator";

const SectionHeader = ({ add, name, count }) => {
  const [status, toggle] = useReducer((status) => !status, false);
  return (
    <div className="flex items-center flex-shrink-0 h-10 px-2 justify-between">
      <div className="flex gap-2">
        <span className="block text-sm font-semibold capitalize">{name}</span>
        <span className="flex items-center justify-center w-5 h-5  text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {count}
        </span>
      </div>
      {add && (
        <>
          <IconButton
            variant="text"
            color="indigo"
            className="w-7 h-7"
            onClick={toggle}
          >
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
          <ProjectCreator open={status} toggle={toggle} />
        </>
      )}
    </div>
  );
};

export default SectionHeader;
