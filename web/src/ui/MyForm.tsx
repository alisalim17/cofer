import React from "react";
import { Form } from "formik";

const MyForm: React.FC = ({ children }) => {
  return (
    <Form className="bg-primary-800 rounded-8 dark:bg-transparent flex flex-col shadow-sm max-w-md  w-375 mx-auto p-4 md:p-10 md:px-6">
      {children}
    </Form>
  );
};

export default MyForm;
