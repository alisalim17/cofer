import React, { useEffect, useRef, useState } from "react";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <div
      className="mx-auto py-4"
      style={{ display: "grid", gridTemplateColumns: "15% 1fr" }}
    >
      <div>gignal</div>
      <div className="flex justify-between ">
        <div>search</div>
        <div className="md:mr-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
