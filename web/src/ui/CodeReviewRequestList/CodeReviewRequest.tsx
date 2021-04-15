import React from "react";
import { RegularCodeReviewRequestFragmentFragment } from "../../generated/graphql";

interface CodeReviewRequestProps {
  data: RegularCodeReviewRequestFragmentFragment;
}

const CodeReviewRequest: React.FC<CodeReviewRequestProps> = ({ data }) => {
  return (
    <div className="h-9 w-full bg-primary-800 rounded-lg transition-colors duration-300 ease-in-out hover:bg-primary-700">
      {data.codeUrl}
    </div>
  );
};

export default CodeReviewRequest;
