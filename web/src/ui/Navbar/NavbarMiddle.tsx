import React from "react";
import FeedSection from "./FeedSection";
import SearchBar from "./SearchBar";

interface Props {}

const NavbarMiddle = (props: Props) => {
  return (
    <div>
      <SearchBar />
      <FeedSection />
    </div>
  );
};

export default NavbarMiddle;
