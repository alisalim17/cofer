/* eslint-disable default-case */
import React, { FC } from "react";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../utils/hooks/useScreenType";

export type IComponent = any;

interface IPanels {
  LeftPanel: (props) => IComponent;
  MiddlePanel: (props) => IComponent;
  MiddlePanelMain: (props) => IComponent;
  RightPanel: (props) => IComponent;
}

export interface ScreenLayoutProps {
  panels: IPanels;
  SearchBar: IComponent;
  BottomSection: IComponent;
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
