import React, { useEffect, useRef, useState, FC } from "react";
import { useClickOutside } from "../../utils/hooks/useClickOutside";

export interface DropdownProps {
  button: any;
  elements: any;
  fixed?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  button,
  elements,
  fixed = true,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      useClickOutside(wrapperRef, buttonRef, e.target, setOpen);
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div className="relative">
      <div className="flex justify-end">
        <div ref={buttonRef}>
          <button
            onClick={() => setOpen(!open)}
            type="button"
            className="focus:outline-no-chrome"
          >
            {button}
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute right-3 md:right-0">
          <div
            className={`${fixed ? "fixed transform -translate-x-full" : ""}`}
          >
            <div
              ref={wrapperRef}
              style={{
                width: 200,
                minHeight: 100,
              }}
              className="bg-primary-800 rounded-8 border-default border-primary-700 overflow-hidden relative"
            >
              {elements}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
