import React from "react";

interface DropdownElementProps {}

const DropdownElement: React.FC<DropdownElementProps> = ({ children }) => {
  return (
    <div className="px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-primary-700 font-semibold">
      {children}
    </div>
  );
};

export default DropdownElement;
