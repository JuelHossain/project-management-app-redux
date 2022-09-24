import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useReducer, useState } from "react";

import { useSelector } from "react-redux";
import { useGetProjectByTeamQuery } from "../../../features/projects/projectsApi";
import {
  useDeleteTeamMutation,
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import { colors } from "../../../utils/colors";
import AddMember from "./AddMember";
import Members from "./Members";

const TeamMenu = ({ id, status, toggle }) => {
  const [error, setError] = useState("");
  const myEmail = useSelector((state) => state.auth.user.email);

  const { data: { color, name, createdBy: { email: createdBy } } = {} } =
    useGetTeamQuery(id);
  const { data: projectsOfThisTeam } = useGetProjectByTeamQuery(id);

  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);

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
        <IconButton className="w-7 h-7" variant="text" color={color.name}>
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
      <PopoverContent className="flex gap-3 flex-col sm:flex-row -ml-3">
        <div className="flex flex-col gap-2  max-w-[220px]">
          <div className="flex justify-between gap-2">
            <p
              className={`text-lg  font-bold`}
              style={{ color: color?.common?.color }}
            >
              Team {name}
            </p>
            <Popover
              open={deleteOpen}
              handler={deleteToggle}
              placement="bottom-end"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <PopoverHandler
                onClick={() => {
                  if (projectsOfThisTeam?.length > 0) {
                  }
                  setError(
                    `There is ${
                      projectsOfThisTeam?.length
                    } project of this team going on ${
                      projectsOfThisTeam?.some(
                        (project) => project.section !== "backlog"
                      )
                        ? "and some of the projects is already started so You cannot delete this team now"
                        : "and all projects is in backlog stage if you delete this team the projects will be deleted too."
                    }`
                  );
                }}
              >
                <IconButton
                  disabled={createdBy !== myEmail}
                  style={{
                    backgroundColor: color?.["200"],
                    color: color?.["600"],
                  }}
                  className={`w-6 h-6  `}
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
              </PopoverHandler>
              <PopoverContent className="-mt-8 p-0">
                <div
                  className="flex flex-col gap-2 py-2 px-4 shadow-md  rounded"
                  style={{
                    backgroundColor: color["50"],
                    color: color["500"],
                  }}
                >
                  <p className="max-w-xs">
                    {!!error ? (
                      <span> {error}</span>
                    ) : (
                      <span>Are You Sure ?</span>
                    )}
                  </p>
                  {error || (
                    <div className="flex gap-2">
                      <Button
                        className="py-1 px-3 bg-green-400 text-green-50"
                        color="green"
                        onClick={deleteToggle}
                      >
                        No
                      </Button>
                      <Button
                        className="py-1 px-3 bg-red-400 text-red-50"
                        color="red"
                        onClick={() => {
                          deleteTeam({ id, email: myEmail });
                        }}
                      >
                        Yes Delete
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <AddMember id={id} />
          {createdBy === myEmail && (
            <div
              className=" p-2 flex border rounded-md flex-wrap gap-1 justify-between"
              style={{ borderColor: color?.["500"] }}
            >
              {Object.keys(colors).map((key) => {
                const color = {
                  name: key,
                  ...colors[key],
                  common: {
                    backgroundColor: colors[key]["100"],
                    color: colors[key]["500"],
                  },
                };
                return (
                  <div
                    key={key}
                    onClick={() => {
                      editTeam({ id, data: { color } });
                    }}
                    style={{ backgroundColor: color?.["500"] }}
                    className={`hover:scale-150 rounded-full capitalize  w-[18px] h-[18px] duration-200 `}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div style={{ backgroundColor: color?.["500"], width: "1px" }} />
        <Members id={id} />
      </PopoverContent>
    </Popover>
  );
};

export default TeamMenu;
