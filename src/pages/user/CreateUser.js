import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../features/auth/authApi";
import {isValidEmail} from "../../utils/lib";
import Loading from "../components/Loading";

export default function CreateUser() {
  // getting hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // create user mutation
  const [createUser, { error, isSuccess, isLoading, reset: resetData }] =
    useCreateUserMutation();

  // navigate option
  const navigate = useNavigate();

  // resetting after creating user
  useEffect(() => {
    if (isSuccess) {
      reset();
      setTimeout(resetData, 3000);
    }
  }, [isSuccess, reset, navigate, resetData]);

  // handling create user
  const createUserHandler = (data) => {
    createUser(data);
  };

  return (
    <form
      onSubmit={handleSubmit(createUserHandler)}
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

          <Alert
            show={error || isSuccess}
            color={error ? "red" : "green"}
            className={` text-center text-sm  p-2 rounded-md`}
          >
            {!!error ? error.error || error.data : "User Created Successfully"}
          </Alert>
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
