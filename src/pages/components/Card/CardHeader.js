import { Chip } from "@material-tailwind/react";
import React from "react";

const CardHeader = ({ Menu, name, color = {} }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Chip value={name} style={color} />
      {Menu && <Menu />}
    </div>
  );
};

export default CardHeader;
