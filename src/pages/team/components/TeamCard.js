import React from "react";
import { useGetTeamQuery } from "../../../features/team/teamApi";
import ErrorCard from "../../components/cards/ErrorCard";
import LoadingCard from "../../components/cards/LoadingCard";
import TeamDataCard from "./TeamDataCard";

const TeamCard = ({ id, color }) => {
  // getting teams
  const { data, isLoading, isError } = useGetTeamQuery(id);

  // decide what to render
  if (isLoading) {
    return <LoadingCard color={color} />;
  } else if (isError) {
    return <ErrorCard name="team" />;
  } else {
    return <TeamDataCard data={data} />;
  }
};

export default TeamCard;
