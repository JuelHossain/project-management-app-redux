import React, { useReducer } from "react";
import { useGetTeamQuery } from "../../../features/team/teamApi";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import Loading from "../../components/Loading";
import TeamMenu from "./TeamMenu";

const TeamCard = ({ id, color }) => {
  const [status, toggle] = useReducer((status) => !status, false);
  const {
    data: { name, color: dynamicColor, about, createdAt } = {},
    isLoading: teamLoading,
    error: teamError,
  } = useGetTeamQuery(id);
  if (teamLoading) {
    return (
      <Card>
        <Loading visible={true} />
        <CardHeader name="Loading..." color={color} />
        <CardBody text="Loading..." />
        <CardFooter date="Loading..." />
      </Card>
    );
  } else if (teamError) {
    return (
      <Card>
        <CardHeader name="error" />
        <CardBody text="There was some error Loading this team" />
        <CardFooter date="not found" />
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader
        name={name}
        color={dynamicColor}
        Menu={() => <TeamMenu id={id} status={status} toggle={toggle} />}
      />
      <CardBody text={about} />
      <CardFooter date={createdAt} />
    </Card>
  );
};

export default TeamCard;
