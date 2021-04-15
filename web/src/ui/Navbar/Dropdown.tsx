import React, { useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOnClick);
    return () => {
      document.removeEventListener("mousedown", handleOnClick);
    };
  });

  const handleOnClick = (e) => {
    if (
      wrapperRef?.current &&
      buttonRef?.current &&
      !wrapperRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-end">
        <div ref={buttonRef}>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="focus:outline-no-chrome"
          >
            <img
              className="rounded-full"
              width="40px"
              height="40px"
              src="https://avatars.githubusercontent.com/u/67149699?v=4"
              alt="profile"
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="z-20 absolute right-3 md:right-0">
          <div className="fixed transform -translate-x-full">
            <div
              ref={wrapperRef}
              style={{
                width: 200,
                height: 200,
              }}
              className="bg-primary-800 rounded-8 border-default border-primary-700 overflow-hidden relative"
            >
              {Array.from({ length: 5 }).map(() => (
                <div className="px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-primary-700 font-semibold">
                  Profile
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
