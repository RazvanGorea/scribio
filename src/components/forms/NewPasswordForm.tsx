import { Formik, FormikHelpers } from "formik";
import React from "react";
import Button from "../form/Button";
import Input from "../form/Input";
import * as Yup from "yup";

// Validation
const valuesSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be longer than 4 characters")
    .required("Required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

// Infer form values
export type NewPasswordFormValues = Yup.InferType<typeof valuesSchema>;

interface NewPasswordFormProps {
  onSubmit: (
    values: NewPasswordFormValues,
    helpers: FormikHelpers<NewPasswordFormValues>
  ) => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full">
      <h1 className="text-center mb-7">Password reset</h1>
      <Formik
        initialValues={{
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
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NewPasswordForm;
