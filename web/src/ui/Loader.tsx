import React from "react";
import ReactLoader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface LoaderProps {
  width?: number;
  height?: number;
}

const Loader: React.FC<LoaderProps> = ({ width = 25, height = 25 }) => {
  return (
    <ReactLoader type="TailSpin" color="#fff" width={width} height={height} />
  );
};

export default Loader;
