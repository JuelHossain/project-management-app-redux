import { PlusIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React, { useReducer } from "react";
import TeamCreator from "./TeamCreator";

const TeamHeader = () => {
  const [open, toggle] = useReducer((state) => !state, false);

  return (
    <div className="px-5 sm:px-10 mt-6 flex justify-between">
      <h1 className="text-2xl font-bold">Teams</h1>
      <IconButton onClick={toggle} className="w-7 h-7">
        <PlusIcon className="w-5 h-5 " />
      </IconButton>
      <TeamCreator open={open} toggle={toggle} />
    </div>
  );
};

export default TeamHeader;
