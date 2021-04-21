/* eslint-disable default-case */
import React from "react";
import SearchBar from "../Navbar/SearchBar";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../../utils/hooks/useScreenType";
import Dropdown, { DropdownProps } from "../Dropdown/Dropdown";
import Logo from "../Navbar/Logo";
import ReviewCardWrapper from "../CodeReview/ReviewCardWrapper";
import NavbarMiddle from "../Navbar/NavbarMiddle";
import FeedSection from "../Navbar/FeedSection";
import DropdownElement from "../Dropdown/DropdownElement";
import { userDropdownProps } from "../shared/userDropdownProps";

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
          <Dropdown {...userDropdownProps} />
        </div>
      );
      break;

    case SCREEN_COLUMNS_TYPE.fullscreen:
      topBar = (
        <>
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
            <SearchBar />
            <Dropdown {...userDropdownProps} />
          </div>
          <FeedSection />
        </>
      );
      break;
  }

  return (
    <div className="min-h-screen">
      <div style={{ top: "-1px" }} className="sticky  pt-5 bg-primary-900 z-20">
        {topBar}
      </div>
      <ReviewCardWrapper />
    </div>
  );
};

export default MiddlePanel;
