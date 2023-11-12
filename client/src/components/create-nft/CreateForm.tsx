"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../partials/Button";

interface Props {
  onSubmit: (
    value: FormFields,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}

interface FormFields {
  name: string;
  description: string;
  price: string;
}

export default function CreateForm(props: Props) {
  const handleValidation = (values: FormFields) => {
    const errors: {
      name?: string;
      description?: string;
      price?: string;
    } = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }
    if (!values.description) {
      errors.description = "Required";
    } else if (values.description.length > 200) {
      errors.description = "Must be 200 characters or less";
    }
    if (!values.price) {
      errors.price = "Required";
    } else if (Number(values.price) <= 0) {
      errors.price = "Price must be a positive integer";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        price: "",
      }}
      validate={handleValidation}
      onSubmit={(values, { setSubmitting }) =>
        props.onSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting }) => (
        <Form className="max-w-[550px] mx-auto">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <Field
              className="bg-transparent shadow border-gray-700 appearance-none border rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              placeholder="Name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-xs ml-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <Field
              className="bg-transparent shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              placeholder="Description"
              rows={6}
              as="textarea"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-xs ml-1 mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <Field
              className="bg-transparent shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="string"
              name="price"
              placeholder="Price"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-xs ml-1 mt-1"
            />
          </div>

          <div className="flex gap-4 justify-end mt-8">
            <Button variant="secondary" type="reset">
              Reset
            </Button>
            <Button loading={isSubmitting} variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
