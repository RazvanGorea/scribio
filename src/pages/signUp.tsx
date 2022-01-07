import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as signUpAnim from "../assets/lottie/signUp.json";
import { FormikHelpers } from "formik";
import { useAuth } from "../context/AuthContext";
import { finishSignUp, initSignUp } from "../api/auth";
import SignUpForm, { SignUpFormValues } from "../components/forms/SignUpForm";
import ConfirmSignUpForm from "../components/forms/ConfirmCodeForm";
import Router from "next/router";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [isAuthInitialized, setAuthInitialized] = useState<{
    value: boolean;
    email: string;
  }>({ value: false, email: "" });

  const { login, user } = useAuth();

  /*
  NOTE:
  Redirect is also enabled server side in next.config.js
  */
  useEffect(() => {
    // If user is already logged, redirect to main page
    if (user) Router.replace("/");
  }, [user]);

  const signUpFormSubmit = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      await initSignUp(values);
      setAuthInitialized({ value: true, email: values.email });
      setSubmitting(false);
    } catch (error: any) {
      console.log(error.response.data);
      setSubmitting(false);
    }
  };

  const confirmSignUpFormSubmit = async (confirmation_code: string) => {
    try {
      const { refresh_token, access_token, ...user } = await finishSignUp({
        email: isAuthInitialized.email,
        confirmation_code,
      });

      login(user, access_token);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex items-center h-full">
      <Lottie
        style={{ cursor: "default", width: "50%" }}
        options={{ animationData: signUpAnim, loop: true, autoplay: true }}
        isClickToPauseDisabled
      />
      {isAuthInitialized.value ? (
        <ConfirmSignUpForm onSubmit={confirmSignUpFormSubmit} />
      ) : (
        <SignUpForm onSubmit={signUpFormSubmit} />
      )}
    </div>
  );
};

export default SignUp;
