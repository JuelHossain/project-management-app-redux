import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import ScrollBar from "react-perfect-scrollbar";
import { useGetUsersQuery } from "../../features/auth/authApi";
import Loading from "../components/Loading";

const ManageUsers = () => {
  const {
    data: users,
    isLoading: gettingUsers,
    error: usersError,
  } = useGetUsersQuery();
  return (
    <Card className="w-96 m-10 ">
      <Loading visible={gettingUsers} />
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Manage Users
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 max-h-64 overflow-auto">
        <ScrollBar>
          {users?.map((user) => (
            <div>{user?.email}</div>
          ))}
        </ScrollBar>
      </CardBody>
    </Card>
  );
};

export default ManageUsers;
