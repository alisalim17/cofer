import React from "react";
import Header from "../../Header";

const FeedSection: React.FC = () => {
  return (
    <div className="pr-2 md:pr-0 pl-4 pb-4">
      <Header
        headerType="h1"
        color="text-primary-100"
        fontWeight="bold"
        extraClassName="text-sm md:text-lg"
        size="lg"
      >
        <div className="text-2xl">Your Offers:</div>
      </Header>
    </div>
  );
};

export default FeedSection;
