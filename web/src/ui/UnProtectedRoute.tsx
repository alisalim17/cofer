import { useRouter } from "next/router";
import React from "react";
import { useMeQuery } from "../generated/graphql";
import CenteredLoader from "./CenteredLoader";

interface Props {}

const UnProtectedRoute: React.FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) return <CenteredLoader />;
  if (!loading && data?.me) router.push("/");
  return <div>{children}</div>;
};

export default UnProtectedRoute;