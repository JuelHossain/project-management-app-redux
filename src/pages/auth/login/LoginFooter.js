import { Button, CardFooter } from "@material-tailwind/react";
import { useGetUsersQuery } from "../../../features/auth/authApi";
import { randomUser } from "../../../utils/lib";
import Error from "../../components/alert/Error";
import Loading from "../../components/Loading";

export default function LoginFooter({ setValue }) {
  // getting users
  const {
    data: users,
    isLoading: gettingUsers,
    error: { error: usersError, data: usersError2 } = {},
  } = useGetUsersQuery();

  // auto login handler
  const handleAutoLogin = (admin) => {
    setValue("email", randomUser(users, admin).email);
    setValue("password", "hello");
  };
  return (
    <CardFooter className="pt-0 space-y-2">
      <Button type="submit" variant="gradient" fullWidth>
        Sign In
      </Button>
      <Loading visible={gettingUsers} />
      <div className="flex items-center justify-between gap-2">
        <div className="w-full h-1 rounded-full bg-blue-500" />
        <p className="flex-shrink-0 text-sm">Demo User's</p>
        <div className="w-full h-1 rounded-full bg-blue-500" />
      </div>
      <Error show={usersError || usersError2}>
        {usersError || usersError2}
      </Error>
      <div className="flex gap-2 ">
        <Button
          disabled={!!usersError}
          size="sm"
          className="flex-grow"
          onClick={() => handleAutoLogin(true)}
        >
          Login As Admin
        </Button>
        <Button
          disabled={!!usersError}
          size="sm"
          className="flex-grow"
          onClick={() => handleAutoLogin(false)}
        >
          Login As Random User
        </Button>
      </div>
    </CardFooter>
  );
}
