/* eslint-disable default-case */
import React from "react";
import SearchBar from "../Navbar/SearchBar";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../../utils/hooks/useScreenType";
import Dropdown from "../Navbar/Dropdown";
import Logo from "../Navbar/Logo";

const MiddlePanel: React.FC = () => {
  const screenType = useScreenType();
  let topBar = <SearchBar />;

  switch (screenType) {
    case SCREEN_COLUMNS_TYPE[1]:
      topBar = (
        <div style={{ display: "grid", gridTemplateColumns: "90% 1fr" }}>
          <SearchBar />
          <Dropdown />
        </div>
      );
      break;

    case SCREEN_COLUMNS_TYPE.fullscreen:
      topBar = (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "10% 1fr 10%",
            columnGap: 20,
          }}
          className="bg-primary-900"
        >
          <Logo />
          <SearchBar />
          <Dropdown />
        </div>
      );
      break;
  }

  return (
    <div className="min-h-screen">
      <div style={{ top: "-1px" }} className="sticky  pt-5 bg-primary-900 z-20">
        {topBar}
      </div>
      <div className="flex flex-col space-y-8">
        {Array.from({ length: 20 }).map(() => (
          <div className="h-9 w-full bg-primary-800 rounded-lg transition-colors duration-300 ease-in-out hover:bg-primary-700">
            heey
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiddlePanel;
