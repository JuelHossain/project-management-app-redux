import { CardBody, Input } from "@material-tailwind/react";
import isValidEmail from "../../../utils/isValidEmail";
import Error from "../../components/alert/Error";
import Success from "../../components/alert/Success";
export default function LoginBody({ register, errors, loginError }) {
  return (
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
      <Success show={!loginError}>Only Registered User Can sign in.</Success>
      <Error show={loginError}>{loginError}</Error>
    </CardBody>
  );
}
