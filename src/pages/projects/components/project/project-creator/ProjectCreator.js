import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import moment from "moment";
import React, { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../features/auth/authSelector";
import { useCreateProjectMutation } from "../../../../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../../../../features/team/teamApi";
import Loading from "../../../../components/Loading";
import CreateActions from "../../../../components/shared/CreateActions";
import PlusButton from "../../../../components/shared/PlusButton";
import TeamSelector from "./TeamSelector";
import Title from "./Title";

const ProjectCreator = () => {
  const user = useSelector(selectUser);
  const [open, toggle] = useReducer((status) => !status, false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamError, setSelectedTeamError] = useState("");

  const {
    data: teams,
    isLoading: gettingTeams,
    error: { error: teamsError, data: teamsErrorData } = {},
  } = useGetTeamsQuery(user.email);

  const [
    createProject,
    {
      isLoading: creating,
      error: { error: creatingError, data: creatingErrorData } = {},
      isSuccess: created,
    },
  ] = useCreateProjectMutation();

  const error =
    teamsError || teamsErrorData || creatingError || creatingErrorData;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors: { title: { message: titleError } = {} } = {} },
  } = useForm();

  const createHandler = (data) => {
    if (selectedTeam) {
      setSelectedTeamError("");
      createProject({
        ...data,
        team: selectedTeam,
        createdAt: moment().format("MMM D"),
        createdBy: user,
        section: "backlog",
      });
    } else {
      setSelectedTeamError("Oops, Team is Required too");
    }
  };

  useEffect(() => {
    if (created) {
      setSelectedTeam(null);
      reset();
      toggle();
    }
  }, [created, reset, toggle]);
  useEffect(() => {
    if (!open) {
      setSelectedTeam("");
      reset();
    }
  }, [open, reset]);

  return (
    <>
      <PlusButton color="indigo" variant="text" onClick={toggle} />
      <Dialog
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
        open={open}
        handler={toggle}
        className="min-w-[320px] max-w-md "
      >
        <Loading visible={creating || gettingTeams} />
        <form onSubmit={handleSubmit(createHandler)}>
          <DialogHeader>Create A Project</DialogHeader>
          <DialogBody className="flex-col gap-2">
            <Title titleError={titleError} register={register} />
            <TeamSelector
              teams={teams}
              selectedTeam={selectedTeam}
              selectedTeamError={selectedTeamError}
              setSelectedTeam={setSelectedTeam}
            />
          </DialogBody>
          <CreateActions error={error} toggle={toggle} />
        </form>
      </Dialog>
    </>
  );
};

export default ProjectCreator;
