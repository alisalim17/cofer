import Head from "next/head";
import React from "react";
import ScreenLayout from "../ui/ScreenLayout";
import ProtectedRoute from "../ui/utilities/ProtectedRoute";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../utils/hooks/useScreenType";
import { withApollo } from "../utils/withApollo";
import CenteredLoader from "../ui/Loader/CenteredLoader";

const Index = () => {
  const screenType = useScreenType();

  let gridTemplateColumns = "235px 640px 325px";

  // if in server
  if (!screenType) return <CenteredLoader />;

  if (screenType === SCREEN_COLUMNS_TYPE[2]) {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === SCREEN_COLUMNS_TYPE[1]) {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === SCREEN_COLUMNS_TYPE.fullscreen) {
    gridTemplateColumns = "1fr";
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Home | Cofer</title>
      </Head>

      <div className="flex flex-col items-center mx-auto w-full">
        <div
          className="px-2 max-w-full mx-auto"
          style={{ display: "grid", gridTemplateColumns, columnGap: 60 }}
        >
          <ScreenLayout screenType={screenType} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Index);
