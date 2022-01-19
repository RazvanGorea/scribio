import { Formik, FormikHelpers } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "../form/Button";
import Input from "../form/Input";

// Validation
const valuesSchema = Yup.object({
  title: Yup.string()
    .required("required")
    .matches(/^[a-zA-Z0-9  !]+$/, "Only alphanumeric characters are allowed!"),
  minutesToRead: Yup.string()
    .required("required")
    .matches(/^[0-9]*$/, "Only numbers are allowed")
    .max(2, "Length must be at most 2 characters"),
});

// Infer form values
export type NewPostFormValues = Yup.InferType<typeof valuesSchema>;

interface NewPostFormProps {
  onSubmit: (
    values: NewPostFormValues,
    helpers: FormikHelpers<NewPostFormValues>
  ) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
  return (
    <div className="flex justify-center ">
      <Formik
        initialValues={{
          title: "",
          minutesToRead: "",
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
              label="Title"
              name="title"
              placeholder="Your title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={errors.title && touched.title && errors.title}
              required
            />

            <Input
              label="Minutes to read"
              type="number"
              placeholder="Ex 10"
              name="minutesToRead"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.minutesToRead}
              error={
                errors.minutesToRead &&
                touched.minutesToRead &&
                errors.minutesToRead
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

export default NewPostForm;
