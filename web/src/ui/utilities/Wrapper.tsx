import React from "react";

interface WrapperProps {
  mobileFull?: Boolean;
  extraClassName?: string;
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  mobileFull = false,
  extraClassName = "",
}) => {
  return (
    <div
      className={`font-roboto min-h-screen dark:bg-gray-dark transition-colors duration-100 text-button ${
        mobileFull ? "p-2 px-0 rounded-none" : "p-12"
      } ${extraClassName}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
