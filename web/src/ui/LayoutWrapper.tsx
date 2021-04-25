import React from "react";
import { SCREEN_COLUMNS_TYPE } from "../utils/hooks/useScreenType";

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
    <div className="flex flex-col px-4 md:px-0 md:items-center mx-auto w-full">
      <div
        className="grid px-2 max-w-full"
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
