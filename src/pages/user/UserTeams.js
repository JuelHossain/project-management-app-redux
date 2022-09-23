import { Alert, Card, CardBody } from "@material-tailwind/react";
import ScrollBar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import { useGetUserProjectsQuery } from "../../features/projects/projectsApi";
import Loading from "../components/Loading";

const UserTeams = () => {
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
        className="flex p-2 items-center rounded-md bg-blue-100/50 hover:bg-blue-200/50 justify-between gap-2 "
      >
        <div className="flex items-center gap-2">
          <p className="py-0.5 px-2 rounded-md bg-blue-500 text-white">
            {project.team.name}
          </p>
          <p className="py-0.5 px-2 rounded-md bg-gray-500/50 ">
            {project.title}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="py-0.5 px-2 rounded-md bg-green-200">
            {project.section}
          </p>
        </div>
      </div>
    ));
  } else {
    content = <Alert color="green">You have not created any project yet</Alert>;
  }
  return (
    <Card className="bg-white/80 flex-1 ">
      <Loading visible={gettingProjects} />

      <CardBody className="flex flex-col gap-4 max-h-[500px]  overflow-auto">
        <div>
          <h4 className="text-2xl font-bold text-center">
            Teams You are member of
          </h4>
        </div>
        <ScrollBar className="space-y-2 ">{content}</ScrollBar>
        {/* {(deleteError || deleted) && (
          <div
            className={`p-2 rounded-md  flex justify-between items-center ${
              deleted ? "bg-green-100 tex-green-500" : "bg-red-100 text-red-500"
            }`}
          >
            <p className="text-sm">
              {deleted
                ? `${deletedproject} Deleted Successfully`
                : " There was some error Deleting project"}
            </p>
            <IconButton
              className="w-5 h-5"
              variant="text"
              color={deleted ? "green" : "red"}
              onClick={() => {
                reset();
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </IconButton>
          </div>
        )} */}
      </CardBody>
    </Card>
  );
};

export default UserTeams;
