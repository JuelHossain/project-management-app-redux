import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import { BlockPicker, CirclePicker, SliderPicker, TwitterPicker } from "react-color";
import { useSelector } from "react-redux";
import tailColors from "tailwindcss/colors";
import {
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import AddMember from "./AddMember";
import Members from "./Members";
const colors = Object.keys(tailColors).slice(10, 26);

const TeamMenu = ({ id, status, toggle }) => {
  const myEmail = useSelector((state) => state.auth.user.email);

  const { data: { color, name, createdBy } = {} } = useGetTeamQuery(id);

  const [editTeam] = useEditTeamMutation();

  return (
    <Popover
      placement="bottom"
      open={status}
      handler={toggle}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
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
      <PopoverContent className="flex gap-2">
        <div className="flex flex-col gap-2">
          <p className={`text-lg text-${color}-500 font-bold`}>Team {name}</p>
          <AddMember id={id} />
          {createdBy === myEmail && (
            <div className="flex max-w-[200px] flex-wrap gap-1 justify-center items-center">
              <CirclePicker
                onChange={(e) => {
                  console.log(e);
                }}
              />
              {/* {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => {
                    editTeam({ id, data: { color } });
                  }}
                  className={`w-5 h-5 bg-${color}-500 rounded-full hover:bg-${color}-700`}
                ></div>
              ))} */}
            </div>
          )}
        </div>
        <div className={`bg-${color}-500 w-0.5`}></div>
        <Members id={id} />
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;
