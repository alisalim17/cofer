import React from "react";
import Button from "../../Form/Button";
import Header from "../../Header";
import Link from "../../utilities/Link";

const FeedSection = () => {
  return (
    <div className="pr-2 md:pr-0 pl-4 pb-4 flex justify-between items-center">
      <Header
        color="text-primary-100"
        fontWeight="bold"
        extraClassName="text-sm md:text-lg"
        size="lg"
      >
        <div className="text-2xl">Your Feed:</div>
      </Header>
      <Link href="/create-review">
        <Button variant="primary" fontWeight="bold" padding="py-2 px-5">
          New review
        </Button>
      </Link>
    </div>
  );
};

export default FeedSection;
