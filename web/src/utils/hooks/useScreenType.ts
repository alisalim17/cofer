import { useMediaQuery } from "react-responsive";

export const SCREEN_COLUMNS_TYPE = {
  1: "1-cols",
  2: "2-cols",
  3: "3-cols",
  fullscreen: "fullscreen",
};

export const useScreenType = () => {
  const is3Cols = useMediaQuery({ minWidth: 1440 });
  const is2Cols = useMediaQuery({ minWidth: 1265 });
  const is1Cols = useMediaQuery({ minWidth: 800 });
  const fullscreen = useMediaQuery({ maxWidth: 799 });

  if (is3Cols) {
    return SCREEN_COLUMNS_TYPE[3];
  }
  if (is2Cols) {
    return SCREEN_COLUMNS_TYPE[2];
  }
  if (is1Cols) {
    return SCREEN_COLUMNS_TYPE[1];
  }
  if (fullscreen) {
    return SCREEN_COLUMNS_TYPE.fullscreen;
  }
};
