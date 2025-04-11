import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetPort } from "../hooks/useGetPort";
import { PortParams } from "../types/portParams";
import { PortResponse } from "../types/portResponse";

type PortDropdownOption = DropdownOptions & PortResponse;

export const PortDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  params,
  ...props
}: Omit<SelectFieldProps<PortDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
  params?: PortParams;
}) => {
  const { data, isLoading, isError, error } = useGetPort(initalFetch, {
    all: true,
    ...params,
  });
  const dataPort: PortDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: `${value.portName} - ${value.portCode}`,
        value: value.id,
      } as PortDropdownOption;
    }) ?? [];

  return (
    <SelectField<PortDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataPort}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : props.placeholder
          ? props.placeholder
          : "Select Port"
      }
      value={
        selectedValue
          ? dataPort.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
