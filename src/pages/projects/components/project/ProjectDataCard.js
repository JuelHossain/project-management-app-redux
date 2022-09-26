import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";
import ProjectMenu from "./project-menu/ProjectMenu";

export default function ProjectDataCard({ data }) {
  const {
    id,
    title,
    createdAt,
    createdBy,
    team: { name, color } = {},
  } = data ?? {};
  return (
    <Card data={data}>
      <CardHeader
        name={name}
        color={color}
        Menu={() => <ProjectMenu id={id} />}
      />
      <CardBody text={title} />
      <CardFooter user={createdBy} date={createdAt} avatar />
    </Card>
  );
}
