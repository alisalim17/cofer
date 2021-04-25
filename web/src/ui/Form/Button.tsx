import React, { ButtonHTMLAttributes } from "react";
import { fontWeightClassNames, FontWeightProps } from "../Header";
import Loader from "../Loader/Loader";

const styles = {
  variants: {
    primary:
      "text-button bg-accent focus:bg-accent-hover hover:bg-accent-hover",
  },
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  FontWeightProps & {
    loading?: boolean;
    centered?: boolean;
    extraClassName?: string;
    width?: number;
    height?: number;
    padding?: string;
    variant?: keyof typeof styles.variants;
    // display:block;
    block?: boolean;
    ring?: string;
  };

const Button: React.FC<ButtonProps> = ({
  loading,
  centered,
  extraClassName = "",
  padding = "py-1 px-2",
  width,
  height,
  variant,
  block = true,
  ring = "focus:ring-4",
  fontWeight,
  children,
  ...props
}) => {
  console.log("style", styles.variants[variant]);
  return (
    <div
      className={`${centered ? "flex justify-center" : ""} ${
        block ? "" : "inline-block"
      }`}
    >
      <button
        style={{
          width,
          height,
        }}
        className={`focus:outline-no-chrome ${ring} rounded-5 ${padding} ${
          variant ? styles.variants[variant] : ""
        } ${
          fontWeightClassNames[fontWeight]
        } flex justify-center items-center ${extraClassName}`}
        disabled={loading}
        type="button"
        {...props}
      >
        <span
          className={loading ? "opacity-0" : "flex items-center justify-center"}
        >
          {children}
        </span>
        {loading ? (
          <span className="absolute">
            <Loader />
          </span>
        ) : null}
      </button>
    </div>
  );
};

export default Button;
