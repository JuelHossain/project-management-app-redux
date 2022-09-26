import React from "react";
import Section from "../section/Section";
import ProjectCard from "./ProjectCard";

import { useGetProjectsQuery } from "../../../../features/projects/projectsApi";
import Loading from "../../../components/Loading";
import ProjectCreator from "../project/project-creator/ProjectCreator";
import SectionHeader from "../section/SectionHeader";
import ProjectContainer from "./ProjectContainer";

const ProjectSection = ({ section }) => {
  const { data, isLoading, isError } = useGetProjectsQuery(section, {
    refetchOnMountOrArgChange: true,
  });

  let content;
  if (isLoading) {
    content = <Loading visible={true} />;
  } else if (isError) {
    content = <div>There was some error getting {section} project</div>;
  } else if (data.length > 0) {
    content = data.map((project) => {
      const { id, team: { color } = {} } = project;
      return <ProjectCard key={id} id={id} color={color} />;
    });
  }
  return (
    <Section section={section}>
      <SectionHeader
        count={data?.length}
        name={section}
        Add={section === "backlog" && ProjectCreator}
      />
      <ProjectContainer>{content}</ProjectContainer>
    </Section>
  );
};

export default ProjectSection;
