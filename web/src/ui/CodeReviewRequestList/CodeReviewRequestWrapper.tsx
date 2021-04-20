import React from "react";
import { useMeQuery, useReviewsQuery } from "../../generated/graphql";
import CenteredLoader from "../Loader/CenteredLoader";
import CodeReviewRequest from "./CodeReviewRequest";

const CodeReviewRequestWrapper: React.FC = () => {
  const { loading, data } = useReviewsQuery();
  const { loading: meLoading, data: meData } = useMeQuery();

  if (loading || meLoading) return <CenteredLoader />;

  return (
    <div className="flex flex-col space-y-8 pb-8">
      {data?.reviews?.length > 0 ? (
        data?.reviews.map((codeRR) => (
          <CodeReviewRequest
            isOwner={meData?.me?.id === codeRR.ownerId}
            key={`code-rr-${codeRR.id}`}
            data={codeRR}
          />
        ))
      ) : (
        <div>no review</div>
      )}
    </div>
  );
};

export default CodeReviewRequestWrapper;
