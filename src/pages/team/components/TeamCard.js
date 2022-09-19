import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import TeamMenu from "./TeamMenu";

const TeamCard = ({ team }) => {
  const { about, createdAt } = team;
  return (
    <Card>
      <CardHeader team={team} Menu={() => <TeamMenu team={team} />} />
      <CardBody text={about} />
      <CardFooter date={createdAt} />
    </Card>
  );
};

export default TeamCard;
