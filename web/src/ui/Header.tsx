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
const fontWeightClassNames = {
  extraLight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

interface HeaderProps {
  size: keyof typeof sizeClassNames;
  fontWeight: keyof typeof fontWeightClassNames;
  centered?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  children,
  size,
  fontWeight,
  centered,
}) => {
  return (
    <div
      className={`text-primary-100 ${sizeClassNames[size]} ${
        fontWeightClassNames[fontWeight]
      } ${centered ? "text-center" : ""}`}
    >
      {children}
    </div>
  );
};

export default Header;
