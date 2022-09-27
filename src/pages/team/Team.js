import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSelector";
import { useGetTeamsQuery } from "../../features/team/teamApi";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import TeamCreator from "./components/team-creator/TeamCreator";
import TeamCard from "./components/TeamCard";
import TeamCardContainer from "./components/TeamCardContainer";

const Team = () => {
  // logged in user
  const { email } = useSelector(selectUser);

  // getting teams
  const { data, isLoading, isError } = useGetTeamsQuery(email, {
    refetchOnMountOrArgChange: true,
  });

  // content holder
  let content;

  // decide what to render
  if (data?.length > 0) {
    content = data.map((team) => {
      const { id, color } = team;
      return <TeamCard key={id} id={id} color={color} />;
    });
  } else if (data?.length === 0) {
    content =
      "You are not a member of any team yet. But you can create your own team .";
  } else if (isError) {
    content = "Oops, There was some error loading your teams";
  }
  
  return (
    <PageContainer>
      <Loading visible={isLoading} />
      <PageHeader title={"Teams"} Add={TeamCreator} />
      <TeamCardContainer>{content}</TeamCardContainer>
    </PageContainer>
  );
};

export default Team;
