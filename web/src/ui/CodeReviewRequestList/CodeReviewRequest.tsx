import React, { useState } from "react";
import { RegularCodeReviewRequestFragmentFragment } from "../../generated/graphql";
import Header from "../Header";
import Twemoji from "../Twemoji";

interface CodeReviewRequestProps {
  data: RegularCodeReviewRequestFragmentFragment;
  isOwner: boolean;
}

const CodeReviewRequest: React.FC<CodeReviewRequestProps> = ({
  data: {
    id,
    owner: { username },
    numDays,
    notes,
    tags,
  },
  isOwner,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      className="w-full bg-primary-800 hover:bg-primary-700 rounded-lg transition-colors duration-300 ease-in-out p-4 cursor-pointer"
    >
      <Header size="2xl" fontWeight="bold">
        {isOwner ? "you sent a review" : `${username} wants a review`}
      </Header>
      <span className="text-sm text-primary-300">in {numDays} days</span>
      <p className="mt-2 text-left break-all truncate whitespace-pre-wrap text-primary-200">
        <Twemoji text={notes} />
      </p>
      {/* @TODO MAKE THIS DIVIDER COMPONENT , MAKE WIDTH 20% IN MOBILE */}
      <div
        style={{ height: 1 }}
        className="my-2 bg-primary-300 rounded-5 w-1/6"
      />
      <div className="flex items-center justify-between">
        <div className="flex space-x-2 items-center">
          <div className="flex items-center space-x-2">
            <img
              className="rounded-full"
              width="30px"
              height="25px"
              src="https://avatars.githubusercontent.com/u/67149699?v=4"
              alt="profile"
            />
            <small className="text-primary-200">
              by {isOwner ? "you" : username}
            </small>
          </div>

          <div
            className={`text-sm transition-colors duration-300 ease-in-out  ${
              hover ? "text-accent-hover" : "text-primary-100"
            }`}
          >
            Give Review
          </div>
        </div>
        <div className="flex space-x-2">
          {tags.map((t, i) => (
            <div
              key={`${id}-tag-${i}`}
              className="text-sm bg-primary-600 p-1 rounded-5"
            >
              #{t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeReviewRequest;
