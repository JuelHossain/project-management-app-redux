import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";
import Loading from "../components/Loading";

export default function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createUser, { error, isSuccess, isLoading, reset: resetData }] =
    useCreateUserMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      reset();
      setTimeout(resetData, 3000);
    }
  }, [isSuccess, reset, navigate, resetData]);

  const loginHandler = (data) => {
    createUser(data);
  };
  return (
    <form
      onSubmit={handleSubmit(loginHandler)}
      className=" flex flex-col flex-1 "
    >
      <Card className=" bg-white/80 flex-1 ">
        <Loading visible={isLoading} />
        <CardBody className="flex flex-col gap-4 max-h-[500px]">
          <div>
            <h4 className="text-2xl font-bold text-center">Create a User</h4>
          </div>
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
            {...register("password")}
            readOnly
            value={"hello"}
            type="password"
            label={"Password"}
            size="lg"
          />
          {error ||
            (isSuccess && (
              <Typography
                variant="paragraph"
                className={`${
                  error
                    ? " bg-red-50 text-red-500"
                    : " bg-green-50 text-green-500"
                } text-center text-sm  p-2 rounded-md`}
              >
                {error
                  ? "There was a Error Creating User"
                  : "User Created Successfully"}
              </Typography>
            ))}
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
