import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetCountry } from "../hooks/useGetCountry";
import { CountryResponse } from "../types/countryResponse";

type CountryDropdownOption = DropdownOptions & CountryResponse;

export const CountryDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  ...props
}: Omit<SelectFieldProps<CountryDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
}) => {
  const { data, isLoading, isError, error } = useGetCountry(initalFetch, {
    all: true,
  });
  const dataCountry: CountryDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: `${value.countryName} - ${value.countryCode}`,
        value: value.id,
      } as CountryDropdownOption;
    }) ?? [];

  return (
    <SelectField<CountryDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataCountry}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : "Select Country"
      }
      value={
        selectedValue
          ? dataCountry.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
