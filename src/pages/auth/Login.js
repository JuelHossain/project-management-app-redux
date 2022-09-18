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
import { useLoginMutation } from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";
import Loading from "../components/Loading";
import PageContainer from "../components/PageContainer";
import Unprotected from "./Unprotected";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { error, isSuccess, isLoading }] = useLoginMutation();

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
          className="container mx-auto flex justify-center items-center h-screen"
          onSubmit={handleSubmit(loginHandler)}
        >
          <Card className="w-96">
            <Loading visible={isLoading} />
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
                className="text-center text-sm bg-gray-200 text-red-500  p-2 rounded-md"
              >
                {error?.error ||
                  error?.data ||
                  " Only Registered User Can sign in."}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>
      </PageContainer>
    </Unprotected>
  );
}
