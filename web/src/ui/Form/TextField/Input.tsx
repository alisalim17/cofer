import React, { InputHTMLAttributes } from "react";
import { textFieldStyle } from "./InputField";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  props?: any;
  field?: any;
  extraClassName?: string;
  noRing?: boolean;
};

const Input: React.FC<InputProps> = ({
  extraClassName = "",
  noRing,
  ...props
}) => {
  return (
    <input
      className={`w-full bg-primary-700 border-default border-primary-600 rounded-sm ${
        noRing ? null : "focus:ring-2 focus:ring-secondary"
      } text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${extraClassName}`}
      {...props}
    />
  );
};

export default Input;
