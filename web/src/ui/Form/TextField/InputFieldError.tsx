import React from "react";
import { textFieldStyle } from "./InputField";

const InputFieldError = ({ error }) => {
  return error ? <div className={textFieldStyle.error}>{error}</div> : null;
};

export default InputFieldError;
