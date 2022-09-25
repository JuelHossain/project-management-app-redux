import { ShieldCheckIcon, UserIcon } from "@heroicons/react/24/solid";
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
  const { email: myEmail } = useSelector((state) => state.auth.user);
  const {
    data: teams,
    isLoading: gettingTeams,
    error: teamsError,
  } = useGetTeamsQuery(myEmail);

  let content;
  if (teamsError) {
    content = (
      <Alert color="red">There was some error getting your Teams</Alert>
    );
  } else if (teams?.length > 0) {
    content = teams?.map((team) => <UserTeamList key={team.id} team={team} />);
  } else {
    content = <Alert color="green">You are not member of any team</Alert>;
  }

  const navigate = useNavigate();
  return (
    <Card className="bg-white/80 flex-1 ">
      <Loading visible={gettingTeams} />

      <CardBody className="flex flex-col gap-4 max-h-[425px] overflow-auto flex-1">
        <div>
          <h4 className="text-2xl font-bold text-center">
            Teams You are member of
          </h4>
        </div>
        <ScrollBar className="space-y-2 ">{content}</ScrollBar>
      </CardBody>
      <CardFooter
        className="pt-0"
        onClick={() => {
          navigate("/");
        }}
      >
        <Button fullWidth>See All Teams</Button>
      </CardFooter>
    </Card>
  );
};

export default UserTeams;

function UserTeamList({ team }) {
  const { email: myEmail } = useSelector((state) => state.auth.user);
  const { createdBy: { email: creatorEmail } = {}, name, color } = team ?? {};
  return (
    <div className="flex p-2 items-center rounded-md bg-blue-200/50 hover:bg-blue-300/50 gap-2 ">
      <IconButton color={color.name}>
        {creatorEmail === myEmail ? (
          <ShieldCheckIcon className="w-6 h-6" />
        ) : (
          <UserIcon className="w-6 h-6" />
        )}
      </IconButton>
      <div>
        <p>Team {name}</p>
        <p className="py-0.5 px-2 text-xs rounded-md bg-green-200">
          {creatorEmail === myEmail ? "Created by You" : "You are A Member"}
        </p>
      </div>
    </div>
  );
}
