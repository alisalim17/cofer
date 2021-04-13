import React, { TextareaHTMLAttributes } from "react";
import { textFieldStyle } from "./InputField";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  props: any;
  field: any;
};

const TextArea: React.FC<TextAreaProps> = ({ ...props }) => {
  return <textarea className={textFieldStyle.input} {...props} />;
};

export default TextArea;
