import React, { useState } from "react";
import InputField, { textFieldStyle } from "../InputField";
import Input from "../Input";

const SearchBar = () => {
  const [focus, setFocus] = useState(false);

  return (
    <div className="pb-5 pt-">
      <div className="flex bg-primary-700 rounded-8">
        <div className="flex items-center justify-center ml-2">
          <svg
            className={`w-4 h-4 transition-colors duration-300 ease-in-out ${
              focus ? "text-button" : "text-primary-300"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          id="placeholder"
          name="placeholder"
          placeholder="Search for something"
          className={`bg-primary-700 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
