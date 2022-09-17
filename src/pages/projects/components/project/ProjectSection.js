import React from "react";
import Section from "../section/Section";
import ProjectCard from "./ProjectCard";

import SectionHeader from "../section/SectionHeader";
import ProjectContainer from "./ProjectContainer";

const ProjectSection = () => {
  return (
    <Section>
      <SectionHeader />
      <ProjectContainer>
        <ProjectCard />
      </ProjectContainer>
    </Section>
  );
};

export default ProjectSection;
