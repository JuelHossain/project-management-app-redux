import { Chip } from "@material-tailwind/react";
import React from "react";

const CardHeader = ({ Menu, team, project }) => {
  const { name, color } = team || project || {};

  return (
    <div className="flex justify-between items-center w-full">
      <Chip value={name} className={` bg-${color}-100 text-${color}-500`} />
      {Menu && <Menu />}
    </div>
  );
};

export default CardHeader;
