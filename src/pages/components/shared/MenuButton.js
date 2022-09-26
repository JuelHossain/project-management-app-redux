import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { IconButton, PopoverHandler } from "@material-tailwind/react";
import React from "react";

const MenuButton = ({ color, ...props }) => {
  return (
    <PopoverHandler>
      <IconButton className="w-7 h-7" variant="text" color={color?.name}>
        <EllipsisVerticalIcon className="w-5 h-5" />
      </IconButton>
    </PopoverHandler>
  );
};

export default MenuButton;
