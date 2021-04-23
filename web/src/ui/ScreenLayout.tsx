/* eslint-disable default-case */
import React, { FC } from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../utils/hooks/useScreenType";

interface IPanels {
  LeftPanel: FC;
  MiddlePanel: FC;
  MiddlePanelMain: FC;
  RightPanel: FC;
}

export interface ScreenLayoutProps {
  panels: IPanels;
  SearchBar: any;
  BottomSection: any;
}

interface Props extends ScreenLayoutProps {
  screenType: string;
}

const ScreenLayout: React.FC<Props> = ({
  panels: { LeftPanel, MiddlePanel, MiddlePanelMain, RightPanel },
  SearchBar,
  BottomSection,
}) => {
  const middlePanelProps = {
    BottomSection,
    SearchBar,
    MiddlePanelMain,
  };

  let middle = (
    <>
      <LeftPanel />
      <MiddlePanel {...middlePanelProps} />
      <RightPanel />
    </>
  );

  const screenType = useScreenType();

  switch (screenType) {
    case SCREEN_COLUMNS_TYPE[1]:
      middle = (
        <>
          <LeftPanel />
          <MiddlePanel {...middlePanelProps} />
        </>
      );
      break;

    case SCREEN_COLUMNS_TYPE.fullscreen:
      middle = (
        <>
          <MiddlePanel {...middlePanelProps} />
        </>
      );
      break;
  }
  return middle;
};

export default ScreenLayout;
