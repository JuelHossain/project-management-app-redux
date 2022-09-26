import { Card } from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../features/auth/authApi";
import Loading from "../../components/Loading";
import PageContainer from "../../components/PageContainer";
import Unprotected from "../Unprotected";
import LoginBody from "./LoginBody";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";

export default function Login() {
  // getting useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // getting login mutation
  const [
    login,
    {
      error: { error: loginError, data: loginError2 } = {},
      isSuccess: loggedIn,
      isLoading: loggingIn,
    },
  ] = useLoginMutation();

  // login handler
  const loginHandler = (data) => {
    login(data);
  };

  // navigating to the home page after successfull login.
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  // returning the login component
  return (
    <Unprotected>
      <PageContainer>
        <form
          className="container mx-auto flex justify-center items-center h-screen px-2"
          onSubmit={handleSubmit(loginHandler)}
        >
          <Card className="w-96">
            <Loading visible={loggingIn} />
            <LoginHeader />
            <LoginBody
              register={register}
              errors={errors}
              loginError={loginError || loginError2}
            />
            <LoginFooter setValue={setValue} />
          </Card>
        </form>
      </PageContainer>
    </Unprotected>
  );
}
