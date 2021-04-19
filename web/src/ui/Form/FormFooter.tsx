import React from "react";

const FormFooter: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="text-primary-100 py-2 px-4 rounded-5 border-default border-primary-800 mt-4 text-sm">
        {children}
      </div>
    </div>
  );
};

export default FormFooter;
