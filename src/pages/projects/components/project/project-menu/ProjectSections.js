import { Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { useStageProjectMutation } from "../../../../../features/projects/projectsApi";
import { selectSection } from "../../../../../features/projects/projectSelectors";

export default function ProjectSections({ currentSection, project }) {
  const sections = useSelector(selectSection);
  const [stageProject] = useStageProjectMutation();

  return (
    <div className="flex gap-1">
      {sections.map((section) => (
        <Button
          key={section}
          ripple
          onClick={() => {
            if (currentSection !== section) {
              stageProject({
                data: project,
                patch: {
                  section: section,
                },
              });
            }
          }}
          className={`!break-normal text-xs py-0.5 px-1  capitalize rounded flex-1 ${
            currentSection === section
              ? "bg-green-500 text-green-50"
              : "bg-green-100 text-green-900 hover:bg-green-500 hover:text-green-50 duration-300"
          }`}
        >
          {section}
        </Button>
      ))}
    </div>
  );
}
