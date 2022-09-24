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
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);
  const sections = useSelector((state) => state.projects.sections);
  const {
    data: project,
    isLoading: gettingProject,
    error: projectError,
  } = useGetProjectQuery(id);
  const [editProject, { isLoading: editing, error: editingError }] =
    useEditProjectMutation();

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
          <div className="flex justify-between gap-2 items-center">
            <p
              className={`font-bold flex-shrink-0 py-0.5 px-2 rounded-md capitalize`}
              style={{
                backgroundColor: project?.team?.color["500"],
                color: project?.team?.color["50"],
              }}
            >
              Project Of {project?.team?.name} Team
            </p>

            {project?.section === "backlog" ? (
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
                  <div className="flex items-center gap-2 py-0.5 px-2 rounded-md bg-red-500 text-red-50 hover:bg-red-700 duration-300 cursor-pointer ">
                    <p className="text-sm font-bold">Delete</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </PopoverHandler>
                <PopoverContent className="-mt-8 p-0">
                  <div
                    className="flex flex-col gap-2 py-2 px-4 shadow-md  rounded"
                    style={{
                      backgroundColor: color["50"],
                      color: color["500"],
                    }}
                  >
                    <p>Are You Sure ?</p>
                    <div className="flex gap-2">
                      <Button
                        className="py-1 px-3 bg-green-400 text-green-50"
                        color="green"
                        onClick={() => {
                          deleteToggle();
                          toggle();
                        }}
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
            ) : (
              <div
                className="flex items-center gap-2 py-0.5 px-2 rounded-md "
                style={project?.team?.color.common}
              >
                <p className="text-sm font-bold">{project?.createdBy.name}</p>
                <IconButton
                  className="w-6 h-6 rounded-full "
                  color={project?.team?.color.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconButton>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {sections.map((section) => (
              <Button
                ripple
                onClick={() => {
                  if (project?.section !== section) {
                    stageProject({
                      data: project,
                      patch: { section: section },
                    });
                  }
                }}
                className={`!break-normal text-xs py-0.5 px-1  capitalize rounded flex-1 ${
                  project.section === section
                    ? "bg-green-500 text-green-50"
                    : "bg-green-100 text-green-900 hover:bg-green-500 hover:text-green-50 duration-300"
                }`}
              >
                {section}
              </Button>
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
