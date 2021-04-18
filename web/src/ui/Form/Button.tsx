import React, { ButtonHTMLAttributes } from "react";
import Loader from "../Loader/Loader";

const styles = {
  variants: {
    primary: "",
  },
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  centered?: boolean;
  extraClassName?: string;
  width?: number;
  height?: number;
  padding?: string;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  centered,
  extraClassName = "",
  padding = "py-1 px-2",
  width,
  height,
  children,
  ...props
}) => {
  return (
    <div className={`${centered ? "flex justify-center" : ""}`}>
      <button
        style={{
          width,
          height,
        }}
        className={`common: focus:outline-no-chrome rounded-5 ${padding} primary: text-button bg-accent focus:bg-accent-hover hover:bg-accent-hover utils: flex justify-center items-center font-bold ${extraClassName}`}
        disabled={loading}
        type="button"
        {...props}
      >
        {loading ? (
          <span>
            <Loader />
          </span>
        ) : (
          <span
            className={
              loading ? "opacity-0" : "flex items-center justify-center"
            }
          >
            {children}
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
