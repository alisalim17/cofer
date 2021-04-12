import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string | boolean;
    name: string;
    textarea?: boolean;
    variant?: string;
  };

// '' => false
// 'error message stuff' => true

export const textFieldStyle = {
  input:
    "w-full bg-primary-700 border-default border-primary-600 rounded-sm focus:ring-2 focus:ring-secondary text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
  error: "text-secondary-washed-out mt-1 ml-0.5 text-sm",
  label: "text-primary-100 mt-3 font-medium mb-1",
};

const InputField: React.FC<InputFieldProps> = ({
  label = false,
  textarea,
  size: _,
  variant = "outline",
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <>
      {label ? (
        <label className={textFieldStyle.label} htmlFor={field.name}>
          {label}
        </label>
      ) : null}

      {textarea ? (
        <textarea
          {...field}
          {...props}
          id={field.name}
          className={textFieldStyle.input}
        />
      ) : (
        <input
          {...field}
          {...props}
          id={field.name}
          className={textFieldStyle.input}
        />
      )}
      {error ? <div className={textFieldStyle.error}>{error}</div> : null}
    </>
  );
};

export default InputField;
