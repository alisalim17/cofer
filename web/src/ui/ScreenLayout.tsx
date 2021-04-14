/* eslint-disable default-case */
import React from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../utils/hooks/useScreenType";
import LeftPanel from "./Panels/LeftPanel";
import MiddlePanel from "./Panels/MiddlePanel";
import RightPanel from "./Panels/RightPanel";

interface Props {
  screenType: string;
}

const ScreenLayout: React.FC<Props> = () => {
  let middle = null;
  const screenType = useScreenType();
  switch (screenType) {
    case SCREEN_COLUMNS_TYPE[3]:
      middle = (
        <>
          <LeftPanel />
          <MiddlePanel />
          <RightPanel />
        </>
      );
      break;
    case SCREEN_COLUMNS_TYPE[2]:
      middle = (
        <>
          <LeftPanel />
          <MiddlePanel />
          <RightPanel />
        </>
      );
      break;

    case SCREEN_COLUMNS_TYPE[1]:
      middle = (
        <>
          <LeftPanel />
          <MiddlePanel />
        </>
      );
      break;

    case SCREEN_COLUMNS_TYPE.fullscreen:
      middle = (
        <>
          <MiddlePanel />
        </>
      );
      break;
  }
  return middle;
};

export default ScreenLayout;
