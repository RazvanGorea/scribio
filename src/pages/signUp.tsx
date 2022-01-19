import React, { useState } from "react";
import Lottie from "react-lottie";
import * as signUpAnim from "../assets/lottie/signUp.json";
import { FormikHelpers } from "formik";
import { useAuth } from "../context/AuthContext";
import { finishSignUp, initSignUp } from "../api/auth";
import SignUpForm, { SignUpFormValues } from "../components/forms/SignUpForm";
import ConfirmSignUpForm from "../components/forms/ConfirmCodeForm";
import { NextPage } from "next";
import Unauthenticated from "../components/Unauthenticated";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
  const [isAuthInitialized, setAuthInitialized] = useState<{
    value: boolean;
    email: string;
  }>({ value: false, email: "" });

  const { login, user } = useAuth();

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
    <Unauthenticated
      redirectPath="/"
      redirectQuery={
        // Remind user to upload an avatar
        // Note. If the user didn't upload an avatar, the key is an empty string.
        user && !user.avatar?.key ? { showUploadAvatarModal: true } : undefined
      }
    >
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
    </Unauthenticated>
  );
};

export default SignUp;
