/* eslint-disable default-case */
import React from "react";
import SearchBar from "../Navbar/SearchBar";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../../utils/hooks/useScreenType";
import Dropdown from "../Navbar/Dropdown";
import Logo from "../Navbar/Logo";
import CodeReviewRequestWrapper from "../CodeReviewRequestList/CodeReviewRequestWrapper";
import NavbarMiddle from "../Navbar/NavbarMiddle";

const MiddlePanel: React.FC = () => {
  const screenType = useScreenType();
  let topBar = (
    <>
      <NavbarMiddle />
    </>
  );

  switch (screenType) {
    case SCREEN_COLUMNS_TYPE[1]:
      topBar = (
        <div style={{ display: "grid", gridTemplateColumns: "90% 1fr" }}>
          <NavbarMiddle />
          <Dropdown />
        </div>
      );
      break;

    case SCREEN_COLUMNS_TYPE.fullscreen:
      topBar = (
        <div
          style={{
            display: "grid",
            maxWidth: "100%",
            gridTemplateColumns: "10% 1fr 12%",
            columnGap: 20,
          }}
          className="bg-primary-900"
        >
          <Logo />
          <NavbarMiddle />
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
      <CodeReviewRequestWrapper />
    </div>
  );
};

export default MiddlePanel;
