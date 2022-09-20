import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import { CirclePicker } from "react-color";
import { useSelector } from "react-redux";
import {
  useDeleteTeamMutation,
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import { colors } from "../../../utils/colors";
import AddMember from "./AddMember";
import Members from "./Members";

const TeamMenu = ({ id, status, toggle }) => {
  const myEmail = useSelector((state) => state.auth.user.email);

  const { data: { color, name, createdBy } = {} } = useGetTeamQuery(id);

  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

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
        <IconButton
          className="w-7 h-7"
          variant="text"
          style={{ color: color.color }}
        >
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
      <PopoverContent className="flex gap-2 flex-col sm:flex-row -ml-3">
        <div className="flex flex-col gap-2  max-w-[220px]">
          <div className="flex justify-between">
            <p className={`text-lg  font-bold`} style={{ color: color.color }}>
              Team {name}
            </p>
            <IconButton
              className={`w-7 h-7 text-red-500 bg-red-100`}
              onClick={() => {
                deleteTeam({ id, email: myEmail });
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </IconButton>
          </div>
          <AddMember id={id} />
          {createdBy === myEmail && (
            <div
              className=" p-2 flex border rounded-md"
              style={{ borderColor: color.backgroundColor }}
            >
              <CirclePicker
                circleSize={18}
                circleSpacing={8}
                colors={colors}
                onChange={(value) => {
                  const { r, g, b, a } = value.rgb;
                  const color = {
                    backgroundColor: `rgb(${r},${g},${b},${0.2})`,
                    color: `rgb(${r},${g},${b},${a})`,
                  };
                  editTeam({ id, data: { color } });
                }}
              />
            </div>
          )}
        </div>
        <div style={{ ...color, width: "1px" }}></div>
        <Members id={id} />
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;
