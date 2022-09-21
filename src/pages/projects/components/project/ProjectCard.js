import { useGetProjectQuery } from "../../../../features/projects/projectsApi";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import Loading from "../../../components/Loading";
import ProjectMenu from "./ProjectMenu";

const ProjectCard = ({ id }) => {
  const {
    data: {
      title,
      createdAt,
      createdBy,
      section,
      team: { name, color } = {},
    } = {},
    isLoading,
    error,
  } = useGetProjectQuery(id);

  if (isLoading) {
    return (
      <div>
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
    <Card id={id}>
      <CardHeader
        name={name}
        color={color}
        Menu={() =>
          section === "backlog" && <ProjectMenu id={id} color={color} />
        }
      />
      <CardBody text={title} />
      <CardFooter user={createdBy} date={createdAt} avatar />
    </Card>
  );
};

export default ProjectCard;
