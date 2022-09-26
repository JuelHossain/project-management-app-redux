import {
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React, { useEffect, useReducer, useState } from "react";

import { useSelector } from "react-redux";
import {
  useDeleteProjectMutation,
  useGetProjectByTeamQuery,
} from "../../../features/projects/projectsApi";
import {
  useDeleteTeamMutation,
  useEditTeamMutation,
  useGetTeamQuery,
} from "../../../features/team/teamApi";
import { colors } from "../../../utils/colors";
import AddMember from "./add-member/AddMember";
import Members from "./members/Members";

const TeamMenu = ({ id, status, toggle }) => {
  const [error, setError] = useState("");
  const myEmail = useSelector((state) => state.auth.user.email);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteProjects, setDeleteProjects] = useState(false);

  const { data: { color, name, createdBy: { email: createdBy } } = {} } =
    useGetTeamQuery(id);
  const { data: projectsOfThisTeam } = useGetProjectByTeamQuery(id);

  const [editTeam] = useEditTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);

  useEffect(() => {
    if (projectsOfThisTeam) {
      if (projectsOfThisTeam.length > 0) {
        setDeleteProjects(false);
        setShowDelete(false);
        setError(
          `There is ${projectsOfThisTeam?.length} project of this team going on `
        );
        if (
          projectsOfThisTeam?.some((project) => project.section !== "backlog")
        ) {
          setShowDelete(false);
          setDeleteProjects(false);
          setError(
            (error) =>
              (error +=
                "and some of the projects is already started so You cannot delete this team now")
          );
        } else {
          setDeleteProjects(true);
          setShowDelete(true);
          setError(
            (error) =>
              (error +=
                "and all of the projects is in backlog stage if you delete this team all of the project related to this team will be deleted too.")
          );
        }
      } else {
        setDeleteProjects(false);
        setShowDelete(true);
        setError("");
      }
    } else {
      setDeleteProjects(false);
      setShowDelete(true);
      setError("");
    }
  }, [projectsOfThisTeam, showDelete]);

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
      <PopoverHandler>
        <IconButton className="w-7 h-7" variant="text" color={color.name}>
          <EllipsisVerticalIcon className="w-5 h-5" />
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
              placement="bottom"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <PopoverHandler>
                <IconButton
                  disabled={createdBy !== myEmail}
                  style={{
                    backgroundColor: color?.["200"],
                    color: color?.["600"],
                  }}
                  className={`w-6 h-6  `}
                >
                  <TrashIcon className="w-4 h-4" />
                </IconButton>
              </PopoverHandler>
              <PopoverContent
                className={`-mt-8 p-0 ${error ? "bg-red-500 text-white" : ""}`}
              >
                <div
                  className="flex flex-col gap-2 py-2 px-4 shadow-md  rounded "
                  style={
                    error
                      ? {}
                      : {
                          backgroundColor: color["50"],
                          color: color["500"],
                        }
                  }
                >
                  {error ? (
                    <p className="max-w-[280px]">{error}</p>
                  ) : (
                    <p className="max-w-xs">Are You Sure ?</p>
                  )}

                  {showDelete ? (
                    <div className="flex gap-2 justify-end">
                      <Button
                        className="py-1 px-3 bg-red-400 text-red-50"
                        color="red"
                        onClick={() => {
                          if (deleteProjects) {
                            projectsOfThisTeam.forEach((project) =>
                              deleteProject({
                                id: project.id,
                                section: project.section,
                              })
                            );
                          }
                          deleteTeam({ id, email: myEmail });
                        }}
                      >
                        Yes Delete
                      </Button>
                      <Button
                        className="py-1 px-3 bg-green-400 text-green-50"
                        color="green"
                        onClick={deleteToggle}
                      >
                        No
                      </Button>
                    </div>
                  ) : (
                    <IconButton
                      ripple={false}
                      color="white"
                      onClick={deleteToggle}
                      className="w-5 h-5 p-0.5 absolute bottom-1 right-1"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </IconButton>
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
