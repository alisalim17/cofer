import Head from "next/head";
import React from "react";
import ProtectedRoute from "../ui/ProtectedRoute";
import { withApollo } from "../utils/withApollo";
import ScreenLayout from "../ui/ScreenLayout";
import Navbar from "../ui/Navbar";
import {
  useScreenType,
  SCREEN_COLUMNS_TYPE,
} from "../utils/hooks/useScreenType";

const Index = () => {
  const screenType = useScreenType();

  let gridTemplateColumns = "235px 640px 325px";

  console.log(screenType);
  if (screenType === "2-cols") {
    gridTemplateColumns = "60px 640px 325px";
  } else if (screenType === "1-cols") {
    gridTemplateColumns = "60px 640px";
  } else if (screenType === "fullscreen") {
    gridTemplateColumns = "1fr";
  }

  return (
    <>
      <Head>
        <title>Home | Cofer</title>
      </Head>
      <div
        style={{ maxWidth: 1368 }}
        className="flex flex-col items-center mx-auto w-full"
      >
        <div
          className="px-2"
          style={{ display: "grid", gridTemplateColumns, columnGap: 60 }}
        >
          <ScreenLayout screenType={screenType} />
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(Index);
