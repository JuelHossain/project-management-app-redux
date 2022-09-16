import React from "react";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import Section from "./components/Section";

const Projects = () => {
  return (
    <PageContainer>
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        <Section />
        <Section />
        <Section />
        <Section />
        <Section />
      </div>
    </PageContainer>
  );
};

export default Projects;
