import { useGetProjectQuery } from "../../../../features/projects/projectsApi";

import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import Loading from "../../../components/Loading";
import ProjectMenu from "./ProjectMenu";

const ProjectCard = ({ id }) => {
  const { data, isLoading, error } = useGetProjectQuery(id);

  const {
    title,
    createdAt,
    createdBy,
    team: { name, color } = {},
  } = data ?? {};

  if (isLoading) {
    return (
      <div className="relative flex flex-col items-start p-4 mt-3  rounded-lg">
        <Loading visible={true} />
        <CardHeader name="Loading..." />
        <CardBody text="Loading..." />
        <CardFooter date="Loading..." />
      </div>
    );
  } else if (error) {
    return (
      <div>
        <CardHeader name="error" color="red" />
        <CardBody text="There was some error Loading this team" />
        <CardFooter date="not found" />
      </div>
    );
  }

  return (
    <Card id={id} data={data}>
      <CardHeader
        name={name}
        color={color}
        Menu={() => <ProjectMenu id={id} />}
      />
      <CardBody text={title} />
      <CardFooter user={createdBy} date={createdAt} avatar />
    </Card>
  );
};

export default ProjectCard;
