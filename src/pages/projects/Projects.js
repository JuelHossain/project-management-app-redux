import React from "react";
import { useSelector } from "react-redux";
import { selectSection } from "../../features/projects/projectSelectors";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import Section from "./components/project/ProjectSection";
import SectionContainer from "./components/section/SectionContainer";

const Projects = () => {
  const sections = useSelector(selectSection);
  return (
    <PageContainer>
      <PageHeader title={"Project Board"} />
      <SectionContainer>
        {sections.map((section) => (
          <Section key={section} section={section} />
        ))}
      </SectionContainer>
    </PageContainer>
  );
};

export default Projects;
