import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import Label from "./Label";
import TextArea from "./TextArea";
import Input from "./Input";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string | boolean;
    name: string;
    textarea?: boolean;
    variant?: string;
    wrapperClassName?: string;
  };

// '' => false
// 'error message stuff' => true

export const textFieldStyle = {
  input:
    "w-full bg-primary-700 border-default border-primary-600 rounded-sm focus:ring-2 focus:ring-secondary text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  error: "text-secondary-washed-out mt-1 ml-0.5 text-sm",
  label: "text-primary-100 mt-3 font-medium mb-1",
};

const InputField: React.FC<InputFieldProps> = ({
  label = false,
  textarea,
  size: _,
  variant = "outline",
  wrapperClassName = "",
  children,
  ...props
}) => {
  const [field, { error }] = useField(props);

  let TextAreaOrInput;
  if (textarea) TextAreaOrInput = TextArea;
  else TextAreaOrInput = Input;

  return (
    <>
      {label ? <Label htmlFor={field.name}>{label}</Label> : null}
      <div className={wrapperClassName}>
        <TextAreaOrInput {...field} {...props} id={field.name} />
        {children}
      </div>

      {error ? <div className={textFieldStyle.error}>{error}</div> : null}
    </>
  );
};

export default InputField;
