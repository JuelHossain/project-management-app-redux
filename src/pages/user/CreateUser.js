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
import { useRegisterMutation } from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";
import Loading from "../components/Loading";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [registerUser, { error, isSuccess, isLoading }] = useRegisterMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const loginHandler = (data) => {
    register(data);
  };
  return (
    <form className="m-10" onSubmit={handleSubmit(loginHandler)}>
      <Card className="w-96">
        <Loading visible={isLoading} />
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Create User
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 digit Required",
              },
            })}
            type="text"
            label={errors?.name?.message || "Name"}
            size="lg"
            error={!!errors?.name}
          />
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
          {error && (
            <Typography
              variant="paragraph"
              className={`${
                error
                  ? " bg-red-50 text-red-500"
                  : " bg-green-50 text-green-500"
              } text-center text-sm  p-2 rounded-md`}
            >
              There was a Server Side Error
            </Typography>
          )}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Create
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
