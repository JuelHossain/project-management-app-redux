import React from "react";
import Section from "../section/Section";
import ProjectCard from "./ProjectCard";

import { useGetProjectsQuery } from "../../../../features/projects/projectsApi";
import SectionHeader from "../section/SectionHeader";
import ProjectContainer from "./ProjectContainer";

const ProjectSection = ({ section }) => {
  const { data: projects } = useGetProjectsQuery(section);

  return (
    <Section section={section}>
      <SectionHeader
        count={projects?.length}
        name={section}
        add={section === "backlog" && true}
      />
      <ProjectContainer>
        {projects?.map((project) => (
          <ProjectCard key={project.id} id={project.id} />
        ))}
      </ProjectContainer>
    </Section>
  );
};

export default ProjectSection;
