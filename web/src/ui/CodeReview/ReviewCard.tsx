import React, { useState } from "react";
import { MoreVertical } from "react-feather";
import { RegularReviewFragmentFragment } from "../../generated/graphql";
import { useScreenType } from "../../utils/hooks/useScreenType";
import Dropdown from "../Dropdown/Dropdown";
import DropdownElement from "../Dropdown/DropdownElement";
import Header from "../Header";
import Icon from "../Icon";
import Twemoji from "../Twemoji";
import Link from "../utilities/Link";
import { SCREEN_COLUMNS_TYPE } from "./../../utils/hooks/useScreenType";
import Tag from "./Tag";

interface CodeReviewRequestProps {
  data: RegularReviewFragmentFragment;
  isOwner: boolean;
}

const ReviewCard: React.FC<CodeReviewRequestProps> = ({
  data: {
    id,
    owner: { username },
    numDays,
    notes,
    tags,
  },
  isOwner,
}) => {
  const screenType = useScreenType();
  const [hover, setHover] = useState(false);

  const dropdownElements = (
    <div>
      <Link noColor href="/view/offers">
        <DropdownElement>View Offers</DropdownElement>
      </Link>
    </div>
  );
  const dropdownButton = (
    <Icon>
      <MoreVertical />
    </Icon>
  );

  console.log(screenType);
  const tagsCount = screenType === SCREEN_COLUMNS_TYPE.fullscreen ? 2 : 4;

  const tagsBody = tags
    .slice(0, tagsCount)
    .map((t, i) => <Tag key={`${id}-tag-${i}`}>#{t}</Tag>);

  return (
    <div
      onMouseEnter={() => setHover(!hover)}
      onMouseLeave={() => setHover(!hover)}
      className="w-full bg-primary-800 hover:bg-primary-850 rounded-lg transition-colors duration-300 ease-in-out px-4 pt-3 pb-4 cursor-pointer"
    >
      <div className="flex justify-between">
        <Header size="lg" fontWeight="bold">
          {isOwner ? "you sent a review" : `${username} wants a review`}
        </Header>
        <Dropdown button={dropdownButton} elements={dropdownElements} />
      </div>
      <span className="text-sm text-primary-300">in {numDays} days</span>

      <p className="mt-2 text-left break-all truncate whitespace-pre-wrap text-primary-200">
        <Twemoji text={notes} />
      </p>
      {/* @TODO MAKE THIS DIVIDER COMPONENT , MAKE WIDTH 20% IN MOBILE */}
      <div
        style={{ height: 1, width: 100 }}
        className="my-3 bg-primary-300 rounded-5"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
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

          <Link
            noColor
            href={`/create-offer/${id}`}
            extraClassName={`text-sm transition-colors duration-300 ease-in-out  ${
              hover ? "text-accent-hover" : "text-primary-100"
            }`}
          >
            Give Review
          </Link>
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">{tagsBody}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
