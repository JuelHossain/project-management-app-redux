import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateProjectMutation } from "../../../../features/projects/projectsApi";
import { useGetTeamsQuery } from "../../../../features/team/teamApi";
import Loading from "../../../components/Loading";

const ProjectCreator = ({ open, toggle }) => {
  const { user } = useSelector((state) => state.auth);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamError, setSelectedTeamError] = useState("");
  const {
    data: teams,
    isLoading: gettingTeams,
    error: teamsError,
  } = useGetTeamsQuery(user.email);

  const [
    createProject,
    { isLoading: creating, error: creatingError, isSuccess: created },
  ] = useCreateProjectMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
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

  return (
    <Dialog open={open} handler={toggle} className="min-w-[320px] max-w-md ">
      <Loading visible={creating || gettingTeams} />
      <form onSubmit={handleSubmit(createHandler)}>
        <DialogHeader>Create A Team</DialogHeader>
        <DialogBody className="flex-col gap-2" divider>
          <Textarea
            error={!!errors?.title}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 10,
                message: "Minimum 10 Character Required",
              },
            })}
            type={"text"}
            label={errors?.title?.message || "Title"}
          />
          <div className="relative">
            <Select
              color={selectedTeam?.color?.name}
              label={selectedTeamError || "Select A Team"}
              error={!!selectedTeamError}
              menuProps={{
                className: "flex flex-wrap gap-2 justify-between items-center",
              }}
            >
              {!gettingTeams &&
                teams?.map((team) => {
                  return (
                    <Option
                      onClick={() => {
                        setSelectedTeam(team);
                      }}
                      key={team.id}
                      style={team?.color?.common}
                      className={`flex-1  text-center text-sm py-1 px-3 hover:scale-105 rounded-md capitalize border`}
                    >
                      <span>{team?.name}</span>
                    </Option>
                  );
                })}
            </Select>
            {selectedTeam && (
              <span
                className="absolute top-[10px] left-3 capitalize text-sm px-2 rounded z-0 py-0.5"
                style={selectedTeam.color.common}
              >
                {selectedTeam.name}
              </span>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="justify-between">
          <p className="text-red-500 text-xs">
            {creatingError?.error || creatingError?.data}
          </p>
          <div>
            <Button
              size="sm"
              variant="text"
              color="red"
              onClick={toggle}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" variant="gradient" color="green">
              <span>Create</span>
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default ProjectCreator;
