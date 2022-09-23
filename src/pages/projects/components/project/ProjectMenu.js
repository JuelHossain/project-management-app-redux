import {
  Alert,
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
  useEditProjectMutation,
  useGetProjectQuery,
  useStageProjectMutation,
} from "../../../../features/projects/projectsApi";
import Loading from "../../../components/Loading";

const ProjectMenu = ({ id, color }) => {
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  const [open, toggle] = useReducer((state) => !state, false);
  const sections = useSelector((state) => state.projects.sections);
  console.log(sections);
  const {
    data: project,
    isLoading: gettingProject,
    error: projectError,
  } = useGetProjectQuery(id);
  const [
    editProject,
    { isLoading: editing, error: editingError, isSuccess: edited },
  ] = useEditProjectMutation();

  useEffect(() => {
    if (project) {
      setNewTitle(project.title);
    }
    if (projectError) {
      setError("There was some error while getting projects");
    }
    if (editingError) {
      setError("There was some error editing Project");
    }
  }, [project, projectError, editingError]);

  const editHandler = () => {
    if (newTitle === "") {
      setError("Sorry Title is required");
    } else {
      if (newTitle.length >= 10) {
        if (newTitle === project?.title) {
          setError("You Didn't Changed Anything");
        } else {
          setError("");
          editProject({ id, data: { title: newTitle } });
        }
      } else {
        setError("Minimum 10 character Needed ");
      }
    }
  };

  const [deleteProject] = useDeleteProjectMutation();
  const [stageProject] = useStageProjectMutation();
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);
  return (
    <Popover
      open={open}
      handler={toggle}
      placement="bottom"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <IconButton
          className="w-7 h-7"
          variant="text"
          color={project?.team?.color.name}
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
      <PopoverContent className="flex gap-3 flex-col sm:flex-row -ml-3">
        <Loading visible={gettingProject || editing} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2">
            <p
              className={` font-bold flex-shrink-0 py-0.5 px-2 rounded-md capitalize`}
              style={{
                backgroundColor: project?.team?.color["500"],
                color: project?.team?.color["50"],
              }}
            >
              Project Of {project?.team?.name} Team
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
              <PopoverHandler>
                <Button
                  // disabled={createdBy !== myEmail}
                  color={"red"}
                  className="py-0.5 px-2"
                >
                  Delete
                </Button>
              </PopoverHandler>
              <PopoverContent className="-mt-8 p-0">
                <div
                  className="flex flex-col gap-2 py-2 px-4 shadow-md  rounded"
                  style={{ backgroundColor: color["50"], color: color["500"] }}
                >
                  <p>Are You Sure ?</p>
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
                        deleteProject({ id, section: "backlog" });
                      }}
                    >
                      Yes Delete
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-1">
            {sections.map((section) => (
              <span
                onClick={() => {
                  stageProject({ data: project, patch: { section: section } });
                }}
                className={`text-xs py-0.5 px-1 capitalize rounded ${
                  project.section === section
                    ? "bg-green-500 text-green-50"
                    : "bg-green-100"
                }`}
              >
                {section}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <textarea
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              value={newTitle}
              className="border focus:border-2 focus:outline-none p-2 rounded-md"
              style={{ borderColor: project?.team?.color["500"] }}
            />
            <Alert
              icon={
                <svg
                  class="w-4 h-4 -mt-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              }
              color="red"
              className="py-1 px-3 text-xs "
              show={!!error}
            >
              {error}
            </Alert>
            <div className="text-right flex items-center justify-between">
              <IconButton
                color="green"
                onClick={toggle}
                className="w-5 h-5 p-0.5"
              >
                <svg
                  class="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </IconButton>
              <Button
                color="green"
                className="py-0.5 rounded-md px-2"
                onClick={editHandler}
              >
                Edit Project Title
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectMenu;
