import { Popover, PopoverContent } from "@material-tailwind/react";
import React, { useEffect, useReducer, useState } from "react";
import {
  useEditProjectMutation,
  useGetProjectQuery,
} from "../../../../../features/projects/projectsApi";
import Loading from "../../../../components/Loading";
import MenuButton from "../../../../components/shared/MenuButton";
import DeleteProject from "./DeleteProject";
import EditProjectTitle from "./EditProjectTitle";
import ProjectCreator from "./ProjectCreator";
import ProjectSections from "./ProjectSections";
import ProjectTitle from "./ProjectTitle";

const ProjectMenu = ({ id }) => {
  // popover opener
  const [open, toggle] = useReducer((state) => !state, false);
  const [deleteOpen, deleteToggle] = useReducer((state) => !state, false);

  // necessary states
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  // getting project
  const {
    data: project,
    isLoading: gettingProject,
    error: projectError,
  } = useGetProjectQuery(id);

  // edit project mutation
  const [editProject, { isLoading: editing, error: editingError }] =
    useEditProjectMutation();

  // destructuring values from projects
  const {
    title,
    section,
    team: {
      color,
      name: teamName,
      createdBy: { email: teamCreatorEmail } = {},
    } = {},
    createdBy: { email: creatorEmail, name: creatorName } = {},
  } = project ?? {};

  // setting error based on some logic
  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
    if (projectError) {
      setError("There was some error while getting project");
    }
    if (editingError) {
      setError("There was some error editing Project");
    }
  }, [title, projectError, editingError]);

  // editing the title of the project
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
        setError("Minimum 10 character Needed");
      }
    }
  };

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
      <MenuButton color={color} />
      <PopoverContent className="flex gap-3 flex-col sm:flex-row -ml-3">
        <Loading visible={gettingProject || editing} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-2 items-center">
            <ProjectTitle teamName={teamName} color={color} />
            {section === "backlog" ? (
              <DeleteProject
                id={id}
                color={color}
                deleteOpen={deleteOpen}
                deleteToggle={deleteToggle}
                creatorEmail={creatorEmail}
                teamCreatorEmail={teamCreatorEmail}
              />
            ) : (
              <ProjectCreator creatorName={creatorName} color={color} />
            )}
          </div>
          <ProjectSections currentSection={section} project={project} />
          <EditProjectTitle
            color={color}
            setNewTitle={setNewTitle}
            newTitle={newTitle}
            error={error}
            toggle={toggle}
            editHandler={editHandler}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProjectMenu;
