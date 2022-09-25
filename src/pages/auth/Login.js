import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useLoginMutation,
} from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import Unprotected from "./Unprotected";

export default function Login() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {
    data: users,
    isLoading: gettingUsers,
    error: usersError,
  } = useGetUsersQuery();

  const randomUser = () => {
    const onlyUsers = users?.filter((user) => !user.admin);
    const randomIndex = Math.floor(Math.random() * (onlyUsers?.length - 1));
    return onlyUsers?.length > 0 ? onlyUsers[randomIndex] : "User Not Found";
  };
  const randomAdmin = () => {
    const onlyAdmin = users?.filter((user) => user.admin);
    const randomIndex = Math.floor(Math.random() * (onlyAdmin?.length - 1));
    return onlyAdmin?.length > 0 ? onlyAdmin[randomIndex] : "Admin Not Found";
  };
  const [login, { error: loginError, isSuccess, isLoading }] =
    useLoginMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const loginHandler = (data) => {
    login(data);
  };
  return (
    <Unprotected>
      <PageContainer>
        <form
          className="container mx-auto flex justify-center items-center h-screen px-2"
          onSubmit={handleSubmit(loginHandler)}
        >
          <Card className="w-96">
            <Loading visible={isLoading || gettingUsers} />
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!isValidEmail(value)) {
                      return "Invalid Email";
                    }
                  },
                })}
                type="email"
                label={errors?.email?.message || "Email"}
                size="lg"
                error={!!errors?.email}
              />
              <Input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 5,
                    message: "Minimum 5 Digit Required",
                  },
                })}
                type="password"
                label={errors?.password?.message || "Password"}
                size="lg"
                error={!!errors?.password}
              />
              <Typography
                variant="paragraph"
                className={`${
                  loginError
                    ? " bg-red-50 text-red-500"
                    : " bg-green-50 text-green-500"
                } text-center text-sm  p-2 rounded-md`}
              >
                {loginError
                  ? loginError?.error || loginError?.data
                  : " Only Registered User Can sign in."}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0 space-y-2">
              <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button>
              <div className="flex items-center justify-between gap-2">
                <div className="w-full h-1 rounded-full bg-blue-500" />
                <p className="flex-shrink-0 text-sm">Demo User's</p>
                <div className="w-full h-1 rounded-full bg-blue-500" />
              </div>
              {usersError && (
                <Typography
                  variant="paragraph"
                  className={` bg-red-50 text-red-500 text-center text-sm  p-2 rounded-md`}
                >
                  There was some error getting user's
                </Typography>
              )}
              <div className="flex gap-2 ">
                <Button
                  disabled={!!usersError}
                  size="sm"
                  className="flex-grow"
                  onClick={() => {
                    setValue("email", randomAdmin().email);
                    setValue("password", "hello");
                  }}
                >
                  Login As Admin
                </Button>
                <Button
                  disabled={!!usersError}
                  size="sm"
                  className="flex-grow"
                  onClick={() => {
                    setValue("email", randomUser().email);
                    setValue("password", "hello");
                  }}
                >
                  Login As Random User
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </PageContainer>
    </Unprotected>
  );
}
