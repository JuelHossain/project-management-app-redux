import React from "react";
import { useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/team/teamApi";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import TeamCard from "./components/TeamCard";
import TeamCardContainer from "./components/TeamCardContainer";
import TeamHeader from "./components/TeamHeader";

const Team = () => {
  const { email } = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetTeamsQuery(email);
  let content;
  if (data?.length > 0) {
    content = data.map((team) => {
      return <TeamCard key={team.id} team={team} />;
    });
  } else {
    content =
      "You are not a member of any team yet. But you can create your own team .";
  }
  if (!!error) {
    content = "Oops, There was some error loading your teams";
  }
  return (
    <PageContainer>
      <Loading visible={isLoading} />
      <TeamHeader />
      <TeamCardContainer>{content}</TeamCardContainer>
    </PageContainer>
  );
};

export default Team;
