import { FormikHelpers } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
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
      setState((val) => ({ ...val, email, step: "confirm" }));
      setSubmitting(false);
    } catch (error: any) {
      console.log(error.response.data);
      setSubmitting(false);
    }
  };

  const forgotPasswordConfirmationSubmit = async (
    confirmation_code: string
  ) => {
    try {
      await checkResetPasswordCode({ confirmation_code, email: state.email });

      setState((val) => ({ ...val, step: "finish", confirmation_code }));
    } catch (error: any) {
      console.log(error.response.data);
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
    } catch (error: any) {
      console.log(error.response.data);
      setSubmitting(false);
    }
  };

  let form = <ForgotPasswordForm onSubmit={forgotPasswordSubmit} />;
  if (state.step === "confirm")
    form = <ConfirmCodeForm onSubmit={forgotPasswordConfirmationSubmit} />;
  else if (state.step === "finish")
    form = <NewPasswordForm onSubmit={finishPasswordResetSubmit} />;

  return (
    <div className="flex items-center h-full">
      <Lottie
        style={{ cursor: "default", width: "50%", maxHeight: "75vh" }}
        options={{ animationData: forgotAnim, loop: true, autoplay: true }}
        isClickToPauseDisabled
      />

      {form}
    </div>
  );
};

export default ForgotPassword;
