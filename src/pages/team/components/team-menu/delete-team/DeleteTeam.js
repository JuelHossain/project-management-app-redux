import { Popover } from "@material-tailwind/react";

import DeleteCard from "./DeleteCard";
import DeleteTeamButton from "./DeleteTeamButton";

const DeleteTeam = ({ deleteOpen, deleteToggle, id }) => {
  return (
    <Popover
      open={deleteOpen}
      handler={deleteToggle}
      placement="bottom"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <DeleteTeamButton id={id} />
      <DeleteCard deleteToggle={deleteToggle} id={id} />
    </Popover>
  );
};

export default DeleteTeam;
