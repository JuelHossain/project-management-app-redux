import {
  EllipsisVerticalIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
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

const ProjectMenu = ({ id }) => {
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  const [open, toggle] = useReducer((state) => !state, false);
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);
  const sections = useSelector((state) => state.projects.sections);
  const { email: myEmail } = useSelector((state) => state.auth.user);
  const {
    data: project,
    isLoading: gettingProject,
    error: projectError,
  } = useGetProjectQuery(id);
  const [editProject, { isLoading: editing, error: editingError }] =
    useEditProjectMutation();
  const {
    title,
    section,
    team: {
      color,
      name: teamName,
      createdBy: { email: teamCreatorEmail },
    } = {},
    createdBy: { email: creatorEmail, name: creatorName } = {},
  } = project ?? {};

  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
    if (projectError) {
      setError("There was some error while getting projects");
    }
    if (editingError) {
      setError("There was some error editing Project");
    }
  }, [title, projectError, editingError]);

  const editHandler = () => {
    if (newTitle === "") {
      setError("Sorry Title is required");
    } else {
      if (newTitle.length >= 10) {
        if (newTitle === title) {
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
      dismiss={{
        enabled: !deleteOpen,
      }}
      open={open}
      handler={toggle}
      placement="bottom"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <IconButton className="w-7 h-7" variant="text" color={color?.name}>
          <EllipsisVerticalIcon className="w-5 h-5" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="flex gap-3 flex-col sm:flex-row -ml-3">
        <Loading visible={gettingProject || editing} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2 items-center">
            <p
              className={`font-bold flex-shrink-0 py-0.5 px-2 rounded-md capitalize`}
              style={{
                backgroundColor: color["500"],
                color: color["50"],
              }}
            >
              Project Of {teamName} Team
            </p>

            {section === "backlog" ? (
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
                    <XCircleIcon className="w-4 h-4" />
                  </div>
                </PopoverHandler>
                <PopoverContent className="-mt-8 p-0">
                  {creatorEmail === myEmail || teamCreatorEmail === myEmail ? (
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
                  ) : (
                    <div className="flex items-center justify-between gap-2 py-2 px-3  shadow-md  rounded bg-red-500 text-white ">
                      <p>You Are not Authorized to Delete this project</p>
                      <IconButton
                        className="w-5 h-5"
                        color="white"
                        onClick={deleteToggle}
                      >
                        <XMarkIcon className="w-4 h-4 " />
                      </IconButton>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            ) : (
              <div
                className="flex items-center gap-2 py-0.5 px-2 rounded-md "
                style={color.common}
              >
                <p className="text-sm font-bold">{creatorName}</p>
                <IconButton
                  className="w-6 h-6 rounded-full "
                  color={color.name}
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                </IconButton>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {sections.map((sectionToStage) => (
              <Button
                key={sectionToStage}
                ripple
                onClick={() => {
                  if (section !== sectionToStage) {
                    stageProject({
                      data: project,
                      patch: { section: sectionToStage },
                    });
                  }
                }}
                className={`!break-normal text-xs py-0.5 px-1  capitalize rounded flex-1 ${
                  section === sectionToStage
                    ? "bg-green-500 text-green-50"
                    : "bg-green-100 text-green-900 hover:bg-green-500 hover:text-green-50 duration-300"
                }`}
              >
                {sectionToStage}
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
              style={{ borderColor: color["500"] }}
            />
            <Alert
              icon={<QuestionMarkCircleIcon className="w-5 h-5 -mt-3.5" />}
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
                <XMarkIcon className="w-4 h-4" />
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
