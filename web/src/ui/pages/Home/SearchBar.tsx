import React, { useState } from "react";
import { Search } from "react-feather";

const SearchBar = () => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="pb-5 pt-">
      <div className="flex bg-primary-700 rounded-5">
        <div className="flex items-center justify-center ml-2">
          <Search
            className={`w-4 h-4 transition-colors duration-300 ease-in-out ${
              focus ? "text-button" : "text-primary-300"
            }`}
          />
        </div>
        <input
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          id="placeholder"
          name="placeholder"
          placeholder="Search for something"
          className="w-full bg-primary-700 rounded-8 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default SearchBar;
