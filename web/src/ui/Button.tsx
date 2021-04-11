import React, { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

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
};

const Button: React.FC<ButtonProps> = ({
  loading,
  centered,
  extraClassName = "",
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
        className={`common: focus:outline-no-chrome  py-1 px-2 rounded-5  primary: text-button bg-accent focus:bg-accent-hover hover:bg-accent-hover utils: flex justify-center items-center ${extraClassName}`}
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
