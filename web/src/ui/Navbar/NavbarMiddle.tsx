import React from "react";
import SearchBar from "./SearchBar";
import Header from "../Header";
import Button from "../Form/Button";
import Link from "../utilities/Link";

interface Props {}

const NavbarMiddle = (props: Props) => {
  return (
    <div>
      <SearchBar />
      <div className="ml-4 mb-5 flex justify-between items-end">
        <Header color="text-primary-100" fontWeight="bold" size="lg">
          <div className="text-2xl">Your Feed:</div>
        </Header>
        <Link href="/create-code-review-request">
          <Button padding="py-2 px-5">New review</Button>
        </Link>
      </div>
    </div>
  );
};

export default NavbarMiddle;
