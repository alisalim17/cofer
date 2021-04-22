import { v4 } from "uuid";
import { DropdownProps } from "../Dropdown/Dropdown";
import DropdownElement from "../Dropdown/DropdownElement";

const dropdownElements = Array.from({ length: 5 }).map(() => (
  <DropdownElement key={`dropdown-element-${v4()}`}>Profile</DropdownElement>
));
const dropdownButton = (
  <img
    className="rounded-full"
    width="40px"
    height="40px"
    src="https://avatars.githubusercontent.com/u/67149699?v=4"
    alt="profile"
  />
);
export const userDropdownProps: DropdownProps = {
  button: dropdownButton,
  elements: dropdownElements,
};
