import React, { InputHTMLAttributes } from "react";
import { textFieldStyle } from "./InputField";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  props: any;
  field: any;
};

const Input: React.FC<InputProps> = ({ ...props }) => {
  return <input className={textFieldStyle.input} {...props} />;
};

export default Input;
