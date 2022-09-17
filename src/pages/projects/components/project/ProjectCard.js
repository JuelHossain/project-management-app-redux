import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardFooter from "../../../components/Card/CardFooter";
import CardHeader from "../../../components/Card/CardHeader";

const ProjectCard = ({ menu }) => {
  return (
    <Card>
      <CardHeader menu={menu} />
      <CardBody />
      <CardFooter avatar />
    </Card>
  );
};

export default ProjectCard;
