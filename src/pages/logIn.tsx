import React from "react";
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
import { NextPage } from "next";
import Unauthenticated from "../components/Unauthenticated";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import config from "../config";

const SignIn: NextPage = () => {
  const { theme } = useTheme();
  const { login, user } = useAuth();

  const submit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { refresh_token, access_token, ...rest } = await apiLogIn(values);

      login(rest, access_token);
      setSubmitting(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
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
    } catch (error) {
      toast.error("Something went wrong:(");
    }
  };

  return (
    <>
      <Head>
        <title>LogIn | Scribio</title>
      </Head>
      <Unauthenticated
        redirectPath="/"
        redirectQuery={
          // Remind user to upload an avatar
          // Note. If the user didn't upload an avatar, the key is an empty string.
          user && !user.avatar?.key
            ? { showUploadAvatarModal: true }
            : undefined
        }
      >
        <div className="flex items-center justify-center h-full">
          <div className="hidden w-1/2 md:block">
            <Lottie
              style={{ cursor: "default", width: "100%" }}
              options={{ animationData: loginAnim, loop: true, autoplay: true }}
              isClickToPauseDisabled
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full px-2 md:w-1/2">
            <LogInForm onSubmit={submit} />
            {config.googleClientId && (
              <>
                <div className="relative flex justify-center w-full max-w-xs mt-3 mb-5 text-black dark:text-white">
                  <h2 className="relative z-[1] px-3 text-center bg-gray-100 dark:bg-gray-800">
                    Or
                  </h2>
                  <hr className="absolute w-full top-[60%] border-t-2" />
                </div>
                <GoogleLogin
                  clientId={config.googleClientId}
                  buttonText="Continue with Google"
                  onSuccess={googleLogin}
                  onFailure={(d) => console.log(d)}
                  theme={theme}
                />
              </>
            )}
          </div>
        </div>
      </Unauthenticated>
    </>
  );
};

export default SignIn;
