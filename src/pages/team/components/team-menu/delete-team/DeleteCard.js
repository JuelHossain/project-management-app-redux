import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, PopoverContent } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/authSelector";
import {
  useDeleteProjectMutation,
  useGetProjectByTeamQuery,
} from "../../../../../features/projects/projectsApi";
import {
  useDeleteTeamMutation,
  useGetTeamQuery,
} from "../../../../../features/team/teamApi";

export default function DeleteCard({ id, deleteToggle }) {
  // necessary states
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deleteProjects, setDeleteProjects] = useState(false);

  // logged in user
  const { email: myEmail } = useSelector(selectUser);

  // mutation functions
  const [deleteTeam] = useDeleteTeamMutation();
  const [deleteProject] = useDeleteProjectMutation();

  // team and project data
  const { data: projectsOfThisTeam } = useGetProjectByTeamQuery(id);
  const { data: { color } = {} } = useGetTeamQuery(id);

  // logic to delete the team
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

                deleteTeam({
                  id,
                  email: myEmail,
                });
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
  );
}
