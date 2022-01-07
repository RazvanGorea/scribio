import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import React from "react";
import Button from "../form/Button";
import Input from "../form/Input";
import * as Yup from "yup";

// Validation
const valuesSchema = Yup.object({
  username: Yup.string()
    .required("Required")
    .min(4, "Username must be longer than 3 characters"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Password must be longer than 4 characters")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

// Form values
export type SignUpFormValues = Yup.InferType<typeof valuesSchema>;

interface SignUpFormProps {
  onSubmit: (
    values: SignUpFormValues,
    helpers: FormikHelpers<SignUpFormValues>
  ) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full">
      <h1 className="text-center mb-7">Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
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
              placeholder="john.doe@example.com"
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
              required
            />
            <Input
              placeholder="JohnDoe"
              label="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={errors.username && touched.username && errors.username}
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
            <Input
              label="Password Confirmation"
              type="password"
              name="passwordConfirmation"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordConfirmation}
              error={
                errors.passwordConfirmation &&
                touched.passwordConfirmation &&
                errors.passwordConfirmation
              }
              required
            />
            <Button
              type="submit"
              loading={isSubmitting}
              style={{ marginTop: 15, marginBottom: 3 }}
            >
              Submit
            </Button>
            <span className="self-start dark:text-white">
              Have an account?&nbsp;
              <Link href="/logIn">
                <a className="text-blue-700 dark:text-blue-500">Log In here!</a>
              </Link>
            </span>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
