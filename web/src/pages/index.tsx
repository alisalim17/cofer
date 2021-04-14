import Head from "next/head";
import React from "react";
import ProtectedRoute from "../ui/ProtectedRoute";
import { withApollo } from "../utils/withApollo";
import ScreenLayout from "../ui/ScreenLayout";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../utils/hooks/useScreenType";

const Index = () => {
  const screenType = useScreenType();

  let gridTemplateColumns = "235px 640px 325px";

  if (screenType === "2-cols") {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === "fullscreen") {
    gridTemplateColumns = "1fr";
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>Home | Cofer</title>
      </Head>
      <div className="flex flex-col items-center w-full">
        <div style={{ display: "grid", gridTemplateColumns, columnGap: 60 }}>
          <ScreenLayout screenType={screenType} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Index);
