import React from "react";
import PageContainer from "../components/PageContainer";
import TeamCard from "./components/TeamCard";
import TeamCardContainer from "./components/TeamCardContainer";
import TeamHeader from "./components/TeamHeader";

const Team = () => {
  return (
    <PageContainer>
      <TeamHeader />
      <TeamCardContainer>
        <TeamCard />
      </TeamCardContainer>
    </PageContainer>
  );
};

export default Team;
