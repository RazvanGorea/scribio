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
});

// Infer form values
export type NewPostFormValues = Yup.InferType<typeof valuesSchema>;

interface NewPostFormProps {
  onSubmit: (
    values: NewPostFormValues,
    helpers: FormikHelpers<NewPostFormValues>
  ) => void;
  initialValue?: string;
}

const NewPostForm: React.FC<NewPostFormProps> = ({
  onSubmit,
  initialValue = "",
}) => {
  return (
    <div className="flex justify-center ">
      <Formik
        initialValues={{
          title: initialValue,
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
