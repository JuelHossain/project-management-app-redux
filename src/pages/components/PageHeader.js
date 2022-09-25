import { PlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";

const PageHeader = ({ title, children, add = false }) => {
  return (
    <div className="px-5 sm:px-10 mt-6 flex justify-between">
      <h1 className="text-2xl font-bold">{children || title}</h1>
      {add && (
        <IconButton className="w-7 h-7">
          <PlusIcon className="w-5 h-5" />
        </IconButton>
      )}
    </div>
  );
};

export default PageHeader;
