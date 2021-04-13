import React from "react";
import Select from "react-select";
import { textFieldStyle } from "./InputField";
import Label from "./Label";
import { useField } from "formik";
import InputFieldError from "./InputFieldError";

export interface AutoCompleteFieldValues {
  value: string;
  label: string;
}

const options: AutoCompleteFieldValues[] = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
  { value: "graphql", label: "Graphql" },
  { value: "css", label: "Css" },
  { value: "express", label: "Express" },
  { value: "html", label: "Html" },
  { value: "tailwindcss", label: "Tailwind css" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
  { value: "python", label: "Python" },
  { value: "c", label: "C" },
  { value: "c++", label: "C++" },
  { value: "c#", label: "C#" },
  { value: "go", label: "Go" },
  { value: "pascal", label: "Pascal" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "Php" },
  { value: "r", label: "R" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    "&:hover": {
      background: "var(--color-primary-600)",
    },
    padding: "7.5px",
  }),
  multiValue: (provided) => ({
    ...provided,
    background: "var(--color-primary-600)",
    color: "var(--color-button-text)",
  }),
  menu: (provided) => ({
    ...provided,
    background: "var(--color-primary-700)",
  }),
  control: () => ({
    display: "flex",
    flexDirection: "row",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "var(--color-button-text)",
    "&:hover": {
      color: "var(--color-primary-200)",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "var(--color-button-text)",
    "&:hover": {
      color: "var(--color-primary-200)",
    },
  }),
  placeholder: () => ({
    color: "#A1A1AA",
  }),
};

interface Props {
  onChange: (res: AutoCompleteFieldValues[]) => void;
}

const MultiSelectTags: React.FC<Props> = ({ onChange }) => {
  const [field, { error }] = useField({ name: "tags" });

  return (
    <>
      <Label htmlFor="tags">Techs</Label>

      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            primary25: "var(--color-primary-600)",
          },
        })}
        className="w-full text-button bg-primary-700 border-default border-primary-600 rounded-sm focus:ring-2 focus:ring-secondary text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
        isMulti
        onChange={onChange}
        closeMenuOnSelect={false}
        placeholder="select your tech tags"
        name="tags"
        options={options}
        styles={customStyles as any}
      />
      <InputFieldError error={error} />
    </>
  );
};

export default MultiSelectTags;
