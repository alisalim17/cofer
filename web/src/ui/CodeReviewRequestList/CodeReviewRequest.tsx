import React from "react";
import Twemoji from "../Twemoji";
import { parse } from "twemoji-parser";
import { RegularCodeReviewRequestFragmentFragment } from "../../generated/graphql";
import Header from "../Header";

interface CodeReviewRequestProps {
  data: RegularCodeReviewRequestFragmentFragment;
}

const CodeReviewRequest: React.FC<CodeReviewRequestProps> = ({
  data: {
    id,
    owner: { username },
    numDays,
    notes,
  },
}) => {
  return (
    <div className="w-full bg-primary-800 hover:bg-primary-700 rounded-lg transition-colors duration-300 ease-in-out p-4 cursor-pointer">
      <Header size="2xl" fontWeight="bold">
        {username} wants a review
      </Header>
      <span className="text-sm text-primary-300">in {numDays} days</span>
      <p className="mt-2 text-left break-all truncate whitespace-pre-wrap text-primary-200">
        <Twemoji id={"2412"} text={notes} />
      </p>
      {/* @TODO MAKE THIS DIVIDER COMPONENT , MAKE WIDTH 20% IN MOBILE*/}
      <div
        style={{ height: 1 }}
        className="my-2 bg-primary-300 rounded-5 w-1/6"
      />
      <div className="text-sm transition-colors duration-300 ease-in-out hover:text-accent-hover mt-2 text-primary-100">
        Give Review
      </div>
    </div>
  );
};

export default CodeReviewRequest;
