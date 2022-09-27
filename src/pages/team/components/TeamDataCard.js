import React, { useReducer } from "react";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import TeamMenu from "./team-menu/TeamMenu";

const TeamDataCard = ({ data }) => {
  const [status, toggle] = useReducer((status) => !status, false);
  const { id, name, color: dynamicColor, about, createdAt } = data ?? {};
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

export default TeamDataCard;
