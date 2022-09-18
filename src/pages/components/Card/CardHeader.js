import {
  Button,
  Chip,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";

const CardHeader = ({ menu = true, color = "red", tag = "design" }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Chip value={tag} className={` bg-${color}-100 text-${color}-500`} />
      {menu && (
        <Popover placement="bottom">
          <PopoverHandler>
            <IconButton className="w-7 h-7" variant="text">
              <svg
                className="w-3.5 h-3.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </IconButton>
          </PopoverHandler>
          <PopoverContent className="flex flex-col gap-2">
            <button size="sm">Add Member</button>
            <button size="sm" className="bg-red-500 rounded text-white">
              Delete
            </button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default CardHeader;
