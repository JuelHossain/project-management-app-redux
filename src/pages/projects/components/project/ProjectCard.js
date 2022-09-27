import { useGetProjectQuery } from "../../../../features/projects/projectsApi";

import ErrorCard from "../../../components/cards/ErrorCard";
import LoadingCard from "../../../components/cards/LoadingCard";
import ProjectDataCard from "./ProjectDataCard";

const ProjectCard = ({ id, color }) => {
  const {data, isLoading, isError } = useGetProjectQuery(id);

  if (isLoading) {
    return <LoadingCard color={color} />;
  } else if (isError) {
    return <ErrorCard name={"project"} />;
  } else {
    return <ProjectDataCard data={data} />;
  }
};

export default ProjectCard;
