import React from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../utils/hooks/useScreenType";
import CenteredLoader from "./Loader/CenteredLoader";
import ScreenLayout, { ScreenLayoutProps } from "./ScreenLayout";

interface Props {
  screenType: string;
}

const LayoutWrapper: React.FC<Props> = ({ children, screenType }) => {
  let gridTemplateColumns = "235px 640px 325px";

  if (screenType === SCREEN_COLUMNS_TYPE[2]) {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === SCREEN_COLUMNS_TYPE[1]) {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === SCREEN_COLUMNS_TYPE.fullscreen) {
    gridTemplateColumns = "1fr";
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full">
      <div
        className="grid px-2 max-w-full mx-auto a"
        style={{
          gridTemplateColumns,
          gridGap: 60,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
