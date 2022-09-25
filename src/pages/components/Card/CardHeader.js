import { Chip } from "@material-tailwind/react";
import React from "react";
import { defaultColor } from "../../../utils/colors";

const CardHeader = ({ Menu, name, color = defaultColor }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <Chip value={name} style={color?.common} />
      {Menu && <Menu />}
    </div>
  );
};

export default CardHeader;
