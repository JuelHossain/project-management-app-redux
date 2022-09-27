import { Popover, PopoverContent } from "@material-tailwind/react";
import { useReducer } from "react";
import { useGetTeamQuery } from "../../../../features/team/teamApi";
import MenuButton from "../../../components/shared/MenuButton";
import AddMember from "./add-member/AddMember";
import DeleteTeam from "./delete-team/DeleteTeam";
import Members from "./members/Members";
import MenuHeader from "./MenuHeader";
import UpdateColorPicker from "./UpdateColorPicker";

const TeamMenu = ({ id, status, toggle }) => {
  // delete opener state
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);

  // getting team data
  const { data: { color, name } = {} } = useGetTeamQuery(id);

  return (
    <Popover
      dismiss={{ enabled: !deleteOpen }}
      placement="bottom"
      open={status}
      handler={toggle}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <MenuButton color={color} />
      <PopoverContent className="flex gap-3 flex-col sm:flex-row -ml-3">
        <div className="flex flex-col gap-2  max-w-[220px]">
          <MenuHeader color={color} name={name}>
            <DeleteTeam
              id={id}
              deleteOpen={deleteOpen}
              deleteToggle={deleteToggle}
            />
          </MenuHeader>
          <AddMember id={id} />
          <UpdateColorPicker id={id} />
        </div>
        <div style={{ backgroundColor: color?.["500"], width: "1px" }} />
        <Members id={id} />
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;
