import Head from "next/head";
import React from "react";
import LeftPanel from "../../ui/Panels/LeftPanel";
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
import FeedSection from "../../ui/pages/Home/FeedSection";
import LayoutWrapper from "../../ui/LayoutWrapper";
import MiddlePanel from "../../ui/Panels/MiddlePanel";
import ReviewCardWrapper from "../../ui/CodeReview/ReviewCardWrapper";

const Offers = () => {
  const screenType = useScreenType();
  if (!screenType) return <CenteredLoader />;

  const panels = {
    LeftPanel,
    MiddlePanel,
    RightPanel,
    MiddlePanelMain: ReviewCardWrapper,
  };

  return (
    <ProtectedRoute>
      <Head>
        <title>Home | Cofer</title>
      </Head>
      <LayoutWrapper screenType={screenType}>
        <ScreenLayout
          BottomSection={FeedSection}
          SearchBar={SearchBar}
          panels={panels}
          screenType={screenType}
        />
      </LayoutWrapper>
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Offers);
