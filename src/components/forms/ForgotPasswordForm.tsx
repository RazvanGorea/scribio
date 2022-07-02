import { Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "../form/Button";
import Input from "../form/Input";

// Validation
const valuesSchema = Yup.object({
  email: Yup.string().required("Required"),
});

// Infer form values
export type ForgotPasswordFormValues = Yup.InferType<typeof valuesSchema>;

interface ForgotPasswordFormProps {
  onSubmit: (
    values: ForgotPasswordFormValues,
    helpers: FormikHelpers<ForgotPasswordFormValues>
  ) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full md:w-1/2">
      <h1 className="text-center mb-7">Password reset</h1>
      <Formik
        initialValues={{
          email: "",
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
              label="E-mail"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email && touched.email && errors.email}
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

export default ForgotPasswordForm;
