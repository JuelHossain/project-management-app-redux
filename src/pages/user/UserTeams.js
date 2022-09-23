import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  IconButton,
} from "@material-tailwind/react";
import ScrollBar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetTeamsQuery } from "../../features/team/teamApi";
import Loading from "../components/Loading";

const UserTeams = () => {
  const { email } = useSelector((state) => state.auth.user);
  const {
    data: teams,
    isLoading: gettingTeams,
    error: teamsError,
  } = useGetTeamsQuery(email);

  let content;
  if (teamsError) {
    content = (
      <Alert color="red">There was some error getting your Teams</Alert>
    );
  } else if (teams?.length > 0) {
    content = teams?.map((team) => (
      <div
        key={team.id}
        className="flex p-2 items-center rounded-md bg-blue-200/50 hover:bg-blue-300/50 gap-2 "
      >
        <IconButton color={team.color.name}>
          {team.createdBy.email === email ? (
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          ) : (
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
        </IconButton>
        <div>
          <p>Team {team.name}</p>
          <p className="py-0.5 px-2 text-xs rounded-md bg-green-200">
            {team.createdBy.email === email
              ? "Created by You"
              : "You are A Member"}
          </p>
        </div>
      </div>
    ));
  } else {
    content = <Alert color="green">You are not member of any team</Alert>;
  }

  const navigate = useNavigate();
  return (
    <Card className="bg-white/80 flex-1 ">
      <Loading visible={gettingTeams} />

      <CardBody className="flex flex-col gap-4 max-h-[425px] overflow-auto">
        <div>
          <h4 className="text-2xl font-bold text-center">
            Teams You are member of
          </h4>
        </div>
        <ScrollBar className="space-y-2 ">{content}</ScrollBar>
      </CardBody>
      <CardFooter className="pt-0" onClick={() =>
      {
        navigate('/')
  }}>
        <Button fullWidth>See All Teams</Button>
      </CardFooter>
    </Card>
  );
};

export default UserTeams;
