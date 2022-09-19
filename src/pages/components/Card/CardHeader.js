import { Chip } from "@material-tailwind/react";
import React from "react";
import TeamMenu from "../../team/components/TeamMenu";

const CardHeader = ({ menu, team }) => {
  const { id, name, color } = team;

  return (
    <div className="flex justify-between items-center w-full">
      <Chip value={name} className={` bg-${color}-100 text-${color}-500`} />
      {menu && <TeamMenu id={id} />}
    </div>
  );
};

export default CardHeader;
