import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import CenteredLoader from "./CenteredLoader";

interface Props {}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      console.log("from pro");
      router.push(`/login?next=${router.pathname}`);
    }
  }, [loading, data, router]);

  if (data?.me) return <div>{children}</div>;
  return <CenteredLoader />;
};

export default ProtectedRoute;
