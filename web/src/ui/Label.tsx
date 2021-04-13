import React from "react";
import { textFieldStyle } from "./InputField";

type Props = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {};

const Label: React.FC<Props> = ({ children, ...props }) => {
  return (
    <label className={textFieldStyle.label} {...props}>
      {children}
    </label>
  );
};

export default Label;
