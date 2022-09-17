import React from "react";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import Section from "./components/project/ProjectSection";
import SectionContainer from "./components/section/SectionContainer";

const Projects = () => {
  return (
    <PageContainer>
      <PageHeader title={"Project Board"} />
      <SectionContainer>
        <Section />
      </SectionContainer>
    </PageContainer>
  );
};

export default Projects;
