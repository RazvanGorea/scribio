import React, { useEffect } from "react";
import Lottie from "react-lottie";
import * as loginAnim from "../assets/lottie/login.json";
import { FormikHelpers } from "formik";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { googleAuth, logIn as apiLogIn } from "../api/auth";
import LogInForm, { LoginFormValues } from "../components/forms/LogInForm";
import Router from "next/router";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const { theme } = useTheme();
  const { login, user } = useAuth();

  /*
  NOTE:
  Redirect is also enabled server side in next.config.js
  */
  useEffect(() => {
    // If user is already logged, redirect to main page
    if (user) Router.replace("/");
  }, [user]);

  const submit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { refresh_token, access_token, ...rest } = await apiLogIn(values);

      login(rest, access_token);
      setSubmitting(false);
    } catch (error: any) {
      console.log(error.response.data);
      setSubmitting(false);
    }
  };

  const googleLogin = async (
    data: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    try {
      if ("accessToken" in data) {
        const { access_token, refresh_token, ...user } = await googleAuth({
          token: data.accessToken,
        });
        login(user, access_token);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex items-center h-full">
      <Lottie
        style={{ cursor: "default", width: "50%" }}
        options={{ animationData: loginAnim, loop: true, autoplay: true }}
        isClickToPauseDisabled
      />
      <div className="flex flex-col items-center justify-center w-1/2 h-full">
        <LogInForm onSubmit={submit} />
        <div className="relative flex justify-center w-full max-w-xs mt-3 mb-5 text-black dark:text-white">
          <h2 className="relative z-[1] px-3 text-center bg-gray-100 dark:bg-gray-800">
            Or
          </h2>
          <hr className="absolute w-full top-[60%] border-t-2" />
        </div>
        <GoogleLogin
          clientId="354641229420-jlplpfo84luiaevi1v4o15kea9d216h4.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={googleLogin}
          onFailure={(d) => console.log(d)}
          theme={theme}
        />
      </div>
    </div>
  );
};

export default SignIn;
