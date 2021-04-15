import React, { InputHTMLAttributes } from "react";
import { textFieldStyle } from "./InputField";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  props?: any;
  field?: any;
  extraClassName?: string;
};

const Input: React.FC<InputProps> = ({ extraClassName = "", ...props }) => {
  return (
    <input className={`${textFieldStyle.input} ${extraClassName}`} {...props} />
  );
};

export default Input;
