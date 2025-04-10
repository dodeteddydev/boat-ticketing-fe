import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetCity } from "../hooks/useGetCity";
import { CityParams } from "../types/cityParams";
import { CityResponse } from "../types/cityResponse";

type CityDropdownOption = DropdownOptions & CityResponse;

export const CityDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  params,
  ...props
}: Omit<SelectFieldProps<CityDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
  params?: CityParams;
}) => {
  const { data, isLoading, isError, error } = useGetCity(initalFetch, {
    all: true,
    ...params,
  });
  const dataCity: CityDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: value.cityName,
        value: value.id,
      } as CityDropdownOption;
    }) ?? [];

  return (
    <SelectField<CityDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataCity}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : "Select City"
      }
      value={
        selectedValue
          ? dataCity.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
