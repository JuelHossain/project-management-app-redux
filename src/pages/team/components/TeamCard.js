import React from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";

const TeamCard = ({ team }) => {
  const { name, about, color, createdAt } = team;
  return (
    <Card>
      <CardHeader color={color} tag={name} />
      <CardBody text={about} />
      <CardFooter date={createdAt} />
    </Card>
  );
};

export default TeamCard;
