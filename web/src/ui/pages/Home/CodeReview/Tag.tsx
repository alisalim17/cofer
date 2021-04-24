import React from "react";

const Tag: React.FC = ({ children }) => {
  return (
    <div className="text-sm bg-primary-600 p-1 rounded-5"> {children}</div>
  );
};

export default Tag;
