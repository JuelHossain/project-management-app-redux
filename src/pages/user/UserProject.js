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
import { useGetUserProjectsQuery } from "../../features/projects/projectsApi";
import Loading from "../components/Loading";

const UserProjects = () => {
  const { email } = useSelector((state) => state.auth.user);
  const {
    data: projects,
    isLoading: gettingProjects,
    error: projectsError,
  } = useGetUserProjectsQuery(email);

  let content;
  if (projectsError) {
    content = (
      <Alert color="red">There was some error getting your projects</Alert>
    );
  } else if (projects?.length > 0) {
    content = projects?.map((project) => (
      <div
        key={project.id}
        className="flex p-2  rounded-md bg-blue-200/50 hover:bg-blue-300/50  gap-2  "
      >
        <div className="p-2 bg-blue-500 text-white rounded-md flex items-center">
          <CodeBracketIcon className="w-6 h-6" />
        </div>
        <div className="gap-1 flex flex-col items-start ">
          <div className="flex  gap-2 text-xs ">
            <p className="py-0.5 px-2 rounded-md bg-blue-500 text-white">
              {project.team.name}
            </p>
            <p className="py-0.5 px-2 rounded-md bg-green-500 text-white">
              {project.section}
            </p>
          </div>
          <p>{project.title}</p>
        </div>
      </div>
    ));
  } else {
    content = <Alert color="green">You have not created any project yet</Alert>;
  }

  const navigate = useNavigate();
  return (
    <Card className="bg-white/80 flex-1">
      <Loading visible={gettingProjects} />

      <CardBody className="flex flex-col gap-4  overflow-auto  max-h-[425px]">
        <div>
          <h4 className="text-2xl font-bold text-center">
            Projects You Have Created
          </h4>
        </div>
        <ScrollBar className="space-y-2 ">{content}</ScrollBar>
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
