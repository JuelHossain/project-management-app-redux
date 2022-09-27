import { CodeBracketIcon } from "@heroicons/react/24/solid";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import ScrollBar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../features/auth/authSelector";
import { useGetUserProjectsQuery } from "../../features/projects/projectsApi";
import Loading from "../components/Loading";

const UserProjects = () => {
  // logged in user
  const { email } = useSelector(selectUser);

  // getting projects
  const {
    data: projects,
    isLoading: gettingProjects,
    error: projectsError,
  } = useGetUserProjectsQuery(email);

  // content holder
  let content;

  // deciding what to render
  if (projectsError) {
    content = (
      <Alert color="red">There was some error getting your projects</Alert>
    );
  } else if (projects?.length > 0) {
    content = projects?.map((project) => (
      <ProjectList key={project.id} project={project} />
    ));
  } else {
    content = <Alert color="green">You have not created any project yet</Alert>;
  }

  const navigate = useNavigate();
  return (
    <Card className="bg-white/80 flex-1">
      <Loading visible={gettingProjects} />

      <CardBody className="flex flex-col gap-4  flex-1">
        <div>
          <h4 className="text-2xl font-bold text-center">
            Projects You Have Created
          </h4>
        </div>
        <ScrollBar className="space-y-2 max-h-[350px]">{content}</ScrollBar>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          fullWidth
          onClick={() => {
            navigate("/projects");
          }}
        >
          See All Projects
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProjects;

function ProjectList({ project }) {
  const { team: { name: teamName } = {}, section, title } = project;

  return (
    <div className="flex p-2  rounded-md bg-blue-200/50 hover:bg-blue-300/50  gap-2  ">
      <div className="p-2 bg-blue-500 text-white rounded-md flex items-center">
        <CodeBracketIcon className="w-6 h-6" />
      </div>
      <div className="gap-1 flex flex-col items-start ">
        <div className="flex  gap-2 text-xs ">
          <p className="py-0.5 px-2 rounded-md bg-blue-500 text-white">
            {teamName}
          </p>
          <p className="py-0.5 px-2 rounded-md bg-green-500 text-white">
            {section}
          </p>
        </div>
        <p>{title}</p>
      </div>
    </div>
  );
}
