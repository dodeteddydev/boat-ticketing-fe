import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetProvince } from "../hooks/useGetProvince";
import { ProvinceParams } from "../types/provinceParams";
import { ProvinceResponse } from "../types/provinceResponse";

type ProvinceDropdownOption = DropdownOptions & ProvinceResponse;

export const ProvinceDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  params,
  ...props
}: Omit<SelectFieldProps<ProvinceDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
  params?: ProvinceParams;
}) => {
  const { data, isLoading, isError, error } = useGetProvince(initalFetch, {
    all: true,
    ...params,
  });
  const dataProvince: ProvinceDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: `${value.provinceName} - ${value.provinceCode}`,
        value: value.id,
      } as ProvinceDropdownOption;
    }) ?? [];

  return (
    <SelectField<ProvinceDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataProvince}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : props.placeholder
          ? props.placeholder
          : "Select Province"
      }
      value={
        selectedValue
          ? dataProvince.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
