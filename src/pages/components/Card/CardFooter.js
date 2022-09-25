import { CalendarIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@material-tailwind/react";
import React from "react";
import { image } from "../../../utils/defaults";

const CardFooter = ({ avatar, date, user }) => {
  return (
    <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400 justify-between">
      <div className="flex items-center">
        <CalendarIcon className="w-4 h-4" />
        <span className="ml-1 leading-none">{date}</span>
      </div>

      {avatar && (
        <Avatar
          className="ring-1 p-1 w-7 h-7"
          variant="circular"
          src={image(user?.name)}
        />
      )}
    </div>
  );
};

export default CardFooter;
