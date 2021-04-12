import React from "react";
import { Form } from "formik";

interface MyFormProps {
  width?: number;
}

const MyForm: React.FC<MyFormProps> = ({ children, width = 400 }) => {
  return (
    <Form
      noValidate
      className="bg-primary-800 rounded-none xs:rounded-8 dark:bg-transparent flex flex-col shadow-sm mx-auto p-4 md:p-10 md:px-6 mb-0 md:mb-6 max-w-full"
      style={{ width }}
    >
      {children}
    </Form>
  );
};

export default MyForm;
