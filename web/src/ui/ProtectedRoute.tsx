import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import CenteredLoader from "./CenteredLoader";

interface Props {}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) return <CenteredLoader />;
  useEffect(() => {
    if (!loading && !data?.me) router.push("/login");
  }, [loading, data]);

  if (data?.me) return <div>{children}</div>;
  return null;
};

export default ProtectedRoute;
