import { Input } from "@material-tailwind/react";
import { useGetTeamsQuery } from "../../../../features/team/teamApi";
import { isTeamExist } from "../../../../utils/isTeamExists";

export default function TeamNameInput({ error, register }) {
  // getting teams
  const {
    data: teams,
    isLoading: gettingTeams,
    isError: isGettingTeamsError,
  } = useGetTeamsQuery("");

  return (
    <Input
      error={!!error}
      {...register("name", {
        required: "Name Is Required",
        minLength: {
          value: 3,
          message: "Name Is Short",
        },
        validate: (value) => {
          if (gettingTeams) {
            return "Wait Getting Teams";
          } else if (isGettingTeamsError) {
            return "Can't Get Teams";
          } else if (isTeamExist(teams, value)) {
            return "Team Already Exists";
          } else {
            return true;
          }
        },
      })}
      type={"text"}
      label={error || "Name"}
    />
  );
}
