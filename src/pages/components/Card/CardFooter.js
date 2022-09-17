import { Avatar } from "@material-tailwind/react";
import React from "react";
import { image } from "../../../utils/defaults";

const CardFooter = ({ avatar, date = "Dec 12", user = { name: "Juel" } }) => {
  return (
    <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400 justify-between">
      <div className="flex items-center">
        <svg
          className="w-4 h-4 text-gray-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
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
