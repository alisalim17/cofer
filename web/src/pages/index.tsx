import Head from "next/head";
import React from "react";
import ProtectedRoute from "../ui/ProtectedRoute";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  return (
    <ProtectedRoute>
      <Head>
        <title>Home | Cofer</title>
      </Head>
      hello
    </ProtectedRoute>
  );
};

export default withApollo({ ssr: true })(Index);
