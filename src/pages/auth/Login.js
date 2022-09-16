import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import isValidEmail from "../../utils/isValidEmail";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);

  const [login, { error, isSuccess }] = useLoginMutation();

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess,navigate]);

  const loginHandler = () => {
    if (email && pass) {
      login({ email, password: pass });
    }
  };
  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <Card className="w-96">
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
            onChange={(e) => {
              if (isValidEmail(e.target.value)) {
                setEmailError("");
                setEmailSuccess(true);
                setEmail(e.target.value);
              } else {
                setEmailSuccess(false);
                setEmailError("Invalid Email");
              }
            }}
            type="email"
            required
            label={emailError || "Email"}
            size="lg"
            error={!!emailError}
            success={emailSuccess}
          />
          <Input
            onChange={(e) => {
              if (e.target.value.length < 5) {
                setPassSuccess(false);
                setPassError("Minimum six character Required");
              } else {
                setPassSuccess(true);
                setPassError("");
                setPass(e.target.value);
              }
            }}
            type="password"
            required
            label={passError || "Password"}
            size="lg"
            error={!!passError}
            success={passSuccess}
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
          <Button onClick={loginHandler} variant="gradient" fullWidth>
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
