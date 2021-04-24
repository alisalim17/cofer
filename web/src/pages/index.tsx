import Head from "next/head";
import React from "react";
import LayoutWrapper from "../ui/LayoutWrapper";
import FeedSection from "../ui/pages/Home/FeedSection";
import LeftPanel from "../ui/Panels/LeftPanel";
import MiddlePanel from "../ui/Panels/MiddlePanel";
import RightPanel from "../ui/Panels/RightPanel";
import ProtectedRoute from "../ui/utilities/ProtectedRoute";
import {
  SCREEN_COLUMNS_TYPE,
  useScreenType,
} from "../utils/hooks/useScreenType";
import { withApollo } from "../utils/withApollo";
import ScreenLayout from "../ui/ScreenLayout";
import CenteredLoader from "../ui/Loader/CenteredLoader";
import ReviewCardWrapper from "../ui/pages/Home/CodeReview/ReviewCardWrapper";
import SearchBar from "../ui/pages/Home/SearchBar";

const Index = () => {
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

export default withApollo({ ssr: true })(Index);
