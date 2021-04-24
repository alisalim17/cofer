import React from "react";

const sizeClassNames = {
  tiny: "text-tiny",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
};
// TODO:put these into a new file
export const fontWeightClassNames = {
  extraLight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export interface FontWeightProps {
  fontWeight: keyof typeof fontWeightClassNames;
}

interface HeaderProps extends FontWeightProps {
  size: keyof typeof sizeClassNames;
  centered?: boolean;
  color?: string;
  extraClassName?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  size,
  fontWeight,
  centered,
  color = "text-button",
  extraClassName = "",
}) => {
  return (
    <span
      className={`flex items-center ${color} ${sizeClassNames[size]} ${
        fontWeightClassNames[fontWeight]
      } ${centered ? "text-center" : ""} ${extraClassName}`}
    >
      {children}
    </span>
  );
};

export default Header;
