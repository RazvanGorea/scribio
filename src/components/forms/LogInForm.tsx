import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React from "react";
import Button from "../form/Button";
import Input from "../form/Input";
import * as Yup from "yup";

// Validation
const valuesSchema = Yup.object({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

// Infer form values
export type LoginFormValues = Yup.InferType<typeof valuesSchema>;

interface LogInFormProps {
  onSubmit: (
    values: LoginFormValues,
    helpers: FormikHelpers<LoginFormValues>
  ) => void;
}

const LogInForm: React.FC<LogInFormProps> = ({ onSubmit }) => {
  return (
    <>
      <h1 className="text-center mb-7">Log In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={valuesSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            className="flex flex-col items-center justify-center w-full max-w-xs space-y-2"
            onSubmit={handleSubmit}
          >
            <Input
              label="E-mail or Username"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password && errors.password}
              required
            />

            <Link href="/forgotPassword">
              <a className="self-start text-left text-blue-700 dark:text-blue-500">
                Forgot password?
              </a>
            </Link>

            <Button
              type="submit"
              loading={isSubmitting}
              style={{ marginTop: 15, marginBottom: 3 }}
            >
              Submit
            </Button>
            <span className="self-start dark:text-white">
              Don&apos;t have an account?&nbsp;
              <Link href="/signUp">
                <a className="text-blue-700 dark:text-blue-500">
                  Sign Up here!
                </a>
              </Link>
            </span>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LogInForm;
