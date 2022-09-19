import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";

const TeamCard = ({ team }) => {
  const { about, createdAt } = team;
  return (
    <Card>
      <CardHeader team={team} menu />
      <CardBody text={about} />
      <CardFooter date={createdAt} />
    </Card>
  );
};

export default TeamCard;
