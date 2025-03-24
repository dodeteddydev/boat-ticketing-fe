import { DropdownOptions } from "../../types/dropdownOptions";
import { SelectField, SelectFieldProps } from "./SelectField";

export const PageSizeDropdown = ({
  ...props
}: Omit<SelectFieldProps<DropdownOptions>, "options">) => {
  const dataSize: DropdownOptions[] = [
    {
      label: "10",
      value: 10,
    },
    {
      label: "25",
      value: 25,
    },
    {
      label: "50",
      value: 50,
    },
    {
      label: "100",
      value: 100,
    },
  ];

  return (
    <SelectField<DropdownOptions>
      {...props}
      menuPlacement="auto"
      className="w-96 md:max-w-48"
      options={dataSize}
      placeholder="Size"
    />
  );
};
