import { Form } from "formik";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useScreenType } from "../../utils/hooks/useScreenType";

interface MyFormProps {
  width?: number;
}

// look at classnames HERE ... HERE section
// TODO: make this minimum width for ex;min-w-screens-md ? or smth like that

const MyForm: React.FC<MyFormProps> = ({ children, width = 400 }) => {
  const screenType = useScreenType();
  const fullscreen = useMediaQuery({ maxWidth: 500 });

  let realWidth: number | string = width;

  if (fullscreen) realWidth = "100%";

  return (
    <Form
      noValidate
      className="bg-primary-800 rounded-none xs:rounded-8 dark:bg-transparent flex flex-col shadow-sm mx-auto p-4 md:p-10 md:px-6 mb-0 md:mb-6 max-w-full z-10"
      style={{ width: realWidth }}
    >
      {children}
    </Form>
  );
};

export default MyForm;
