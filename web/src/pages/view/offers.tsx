import Head from "next/head";
import React from "react";
import LeftPanel from "../../ui/Panels/LeftPanel";
import MiddlePanel from "../../ui/Panels/MiddlePanel";
import RightPanel from "../../ui/Panels/RightPanel";
import ScreenLayout from "../../ui/ScreenLayout";
import ProtectedRoute from "../../ui/utilities/ProtectedRoute";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../../utils/hooks/useScreenType";
import { withApollo } from "../../utils/withApollo";
import CenteredLoader from "../../ui/Loader/CenteredLoader";
import SearchBar from "../../ui/Navbar/SearchBar";
import FeedSection from "../../ui/Navbar/FeedSection";
import LayoutWrapper from "../../ui/LayoutWrapper";

const Offers = () => {
  const screenType = useScreenType();
  if (!screenType) return <CenteredLoader />;

  return (
    <ProtectedRoute>
      <Head>
        <title>Home | Cofer</title>
      </Head>
      <LayoutWrapper screenType={screenType}>
        <ScreenLayout
          BottomSection={FeedSection}
          SearchBar={SearchBar}
          LeftPanel={LeftPanel}
          MiddlePanel={MiddlePanel}
          RightPanel={RightPanel}
          screenType={screenType}
        />
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Offers);
