/* eslint-disable default-case */
import React from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../../utils/hooks/useScreenType";
import ReviewCardWrapper from "../CodeReview/ReviewCardWrapper";
import Dropdown from "../Dropdown/Dropdown";
import Logo from "../Navbar/Logo";
import { userDropdownProps } from "../shared/userDropdownProps";

interface MiddlePanelProps {
  SearchBar: any;
  BottomSection: any;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({
  SearchBar,
  BottomSection,
}) => {
  const screenType = useScreenType();

  let topBar = (
    <>
      <SearchBar />
      <BottomSection />
    </>
  );

  switch (screenType) {
    case SCREEN_COLUMNS_TYPE[1]:
      topBar = (
        <div style={{ display: "grid", gridTemplateColumns: "90% 1fr" }}>
          <SearchBar />
          <Dropdown {...userDropdownProps} />
          <BottomSection />
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
          <BottomSection />
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
