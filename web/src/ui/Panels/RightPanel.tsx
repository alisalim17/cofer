import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { userDropdownProps } from "../shared/userDropdownProps";

const RightPanel: React.FC = () => {
  return (
    <div className="sticky top-0 h-screen pt-5">
      <Dropdown {...userDropdownProps} />
      hello3
    </div>
  );
};

export default RightPanel;
