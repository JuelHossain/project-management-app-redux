import { useGetProjectQuery } from "../../../../features/projects/projectsApi";

import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import Loading from "../../../components/Loading";
import ProjectMenu from "./ProjectMenu";

const ProjectCard = ({ id, color }) => {
  const { data, isLoading, error } = useGetProjectQuery(id);

  const {
    title,
    createdAt,
    createdBy,
    team: { name, color: dynamicColor } = {},
  } = data ?? {};

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-start p-4 mt-3  rounded-lg bg-white">
        <Loading visible={true} />
        <CardHeader name="Loading..." color={color} />
        <CardBody text="Loading..." />
        <CardFooter date="Loading..." />
      </div>
    );
  } else if (error) {
    return (
      <div className="relative flex flex-col items-start p-4 mt-3  rounded-lg bg-white">
        <CardHeader name="error" color={color} />
        <CardBody text="There was some error Loading this team" />
        <CardFooter date="not found" />
      </div>
    );
  }

  return (
    <Card id={id} data={data}>
      <CardHeader
        name={name}
        color={dynamicColor}
        Menu={() => <ProjectMenu id={id} />}
      />
      <CardBody text={title} />
      <CardFooter user={createdBy} date={createdAt} avatar />
    </Card>
  );
};

export default ProjectCard;
