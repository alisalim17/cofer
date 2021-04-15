import React from "react";
import Loader from "./Loader";

interface Props {}

const CenteredLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  );
};

export default CenteredLoader;
