import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card, CardBody, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/auth/authApi";
import Loading from "../components/Loading";
import UserList from "./UserList";

const ManageUsers = () => {
  // necessary states
  const [deletedUser, setDeletedUser] = useState("");

  // getting users
  const {
    data: users,
    isLoading: gettingUsers,
    error: usersError,
  } = useGetUsersQuery();

  // delete user mutation
  const [
    deleteUser,
    { isLoading: deleting, error: deleteError, isSuccess: deleted, reset },
  ] = useDeleteUserMutation();

  // resetting after successfully delete
  useEffect(() => {
    if (deleted || deleteError) {
      setTimeout(reset, 3000);
    }
  }, [deleted, deleteError, reset]);

  // users content holder
  let content;

  // decide what to render
  if (usersError) {
    content = "there was some error getting users";
  } else if (users?.length > 0) {
    content = users?.map(
      (user) =>
        !user.admin && (
          <UserList
            key={Math.random()}
            user={user}
            setDeletedUser={setDeletedUser}
            deleteUser={deleteUser}
          />
        )
    );
  } else {
    content = "nothing found";
  }

  return (
    <Card className="bg-white/80 flex-1 ">
      <Loading visible={gettingUsers || deleting} />

      <CardBody className="flex flex-col gap-4  max-h-[323px]  overflow-auto ">
        <h4 className="text-2xl font-bold text-center">Manage Users</h4>

        <ScrollBar className="space-y-2">{content}</ScrollBar>
        {(deleteError || deleted) && (
          <div
            className={`p-2 rounded-md  flex justify-between items-center ${
              deleted ? "bg-green-100 tex-green-500" : "bg-red-100 text-red-500"
            }`}
          >
            <p className="text-sm">
              {deleted
                ? `${deletedUser} Deleted Successfully`
                : " There was some error Deleting User"}
            </p>
            <IconButton
              className="w-5 h-5"
              variant="text"
              color={deleted ? "green" : "red"}
              onClick={() => {
                reset();
              }}
            >
              <XMarkIcon className="w-4 h-4" />
            </IconButton>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ManageUsers;
