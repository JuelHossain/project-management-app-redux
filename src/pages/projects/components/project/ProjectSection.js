import React from "react";
import Section from "../section/Section";
import ProjectCard from "./ProjectCard";

import { useGetProjectsQuery } from "../../../../features/projects/projectsApi";
import Loading from "../../../components/Loading";
import SectionHeader from "../section/SectionHeader";
import ProjectContainer from "./ProjectContainer";

const ProjectSection = ({ section }) => {
  const {
    data: projects,
    isLoading: gettingProjects,
    error: projectError,
  } = useGetProjectsQuery(section, { refetchOnMountOrArgChange: true });

  let content;
  if (gettingProjects) {
    content = <Loading visible={true} />;
  } else if (projectError) {
    content = <div>There was some error getting {section} project</div>;
  } else if (projects.length > 0) {
    content = projects?.map((project) => (
      <ProjectCard
        key={project.id}
        id={project.id}
        color={project?.team?.color}
      />
    ));
  }
  return (
    <Section section={section}>
      <SectionHeader
        count={projects?.length}
        name={section}
        add={section === "backlog" && true}
      />
      <ProjectContainer>{content}</ProjectContainer>
    </Section>
  );
};

export default ProjectSection;
