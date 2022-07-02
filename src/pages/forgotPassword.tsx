import axios from "axios";
import { FormikHelpers } from "formik";
import { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import {
  checkResetPasswordCode,
  finishResetPassword,
  initResetPassword,
} from "../api/auth";
import * as forgotAnim from "../assets/lottie/forgotPassword.json";
import ConfirmCodeForm from "../components/forms/ConfirmCodeForm";
import ForgotPasswordForm, {
  ForgotPasswordFormValues,
} from "../components/forms/ForgotPasswordForm";
import NewPasswordForm, {
  NewPasswordFormValues,
} from "../components/forms/NewPasswordForm";
import Unauthenticated from "../components/Unauthenticated";
import { useAuth } from "../context/AuthContext";

interface IState {
  email: string;
  confirmation_code: string;
  step: "init" | "confirm" | "finish";
}

const ForgotPassword: NextPage = () => {
  const [state, setState] = useState<IState>({
    email: "",
    confirmation_code: "",
    step: "init",
  });

  const { login } = useAuth();

  const forgotPasswordSubmit = async (
    { email }: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      await initResetPassword({ email });

      toast.success("Check your email!");

      setState((val) => ({ ...val, email, step: "confirm" }));
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const forgotPasswordConfirmationSubmit = async (
    confirmation_code: string
  ) => {
    try {
      await checkResetPasswordCode({ confirmation_code, email: state.email });

      setState((val) => ({ ...val, step: "finish", confirmation_code }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const finishPasswordResetSubmit = async (
    { password }: NewPasswordFormValues,
    { setSubmitting }: FormikHelpers<NewPasswordFormValues>
  ) => {
    try {
      const { access_token, refresh_token, ...user } =
        await finishResetPassword({
          email: state.email,
          confirmation_code: state.confirmation_code,
          new_password: password,
        });

      login(user, access_token);

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  let form = <ForgotPasswordForm onSubmit={forgotPasswordSubmit} />;
  if (state.step === "confirm")
    form = <ConfirmCodeForm onSubmit={forgotPasswordConfirmationSubmit} />;
  else if (state.step === "finish")
    form = <NewPasswordForm onSubmit={finishPasswordResetSubmit} />;

  return (
    <>
      <Head>
        <title>Password reset | Scribio</title>
      </Head>
      <Unauthenticated redirectPath="/">
        <div className="flex items-center justify-center h-full px-2 sm:px-0">
          <div className="hidden md:block">
            <Lottie
              style={{ cursor: "default", width: "100%", maxHeight: "75vh" }}
              options={{
                animationData: forgotAnim,
                loop: true,
                autoplay: true,
              }}
              isClickToPauseDisabled
            />
          </div>

          {form}
        </div>
      </Unauthenticated>
    </>
  );
};

export default ForgotPassword;
