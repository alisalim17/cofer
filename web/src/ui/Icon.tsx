import React from "react";

interface IconProps {}

const Icon: React.FC<IconProps> = ({ children }) => {
  return (
    <div className="icon p-1 rounded-full transition-colors duration-300">
      {children}
    </div>
  );
};

export default Icon;
