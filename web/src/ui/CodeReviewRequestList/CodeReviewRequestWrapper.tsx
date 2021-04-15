import React from "react";
import { useCodeReviewRequestsQuery } from "../../generated/graphql";
import CenteredLoader from "../Loader/CenteredLoader";
import CodeReviewRequest from "./CodeReviewRequest";

const CodeReviewRequestWrapper: React.FC = () => {
  const { loading, data } = useCodeReviewRequestsQuery();

  if (loading) return <CenteredLoader />;

  return (
    <div className="flex flex-col space-y-8">
      {data?.codeReviewRequests?.length > 0 ? (
        data?.codeReviewRequests.map((codeRR) => (
          <CodeReviewRequest key={`code-rr-${codeRR.id}`} data={codeRR} />
        ))
      ) : (
        <div>no review</div>
      )}
    </div>
  );
};

export default CodeReviewRequestWrapper;
