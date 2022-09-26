import { PlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";

const PlusButton = ({ ...props }) => {
  return (
    <IconButton {...props} className="w-7 h-7">
      <PlusIcon className="w-5 h-5" />
    </IconButton>
  );
};

export default PlusButton;
