import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetCategory } from "../hooks/useGetCategory";
import { CategoryResponse } from "../types/categoryResponse";

type CategoryDropdownOption = DropdownOptions & CategoryResponse;

export const CategoryDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  ...props
}: Omit<SelectFieldProps<CategoryDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
}) => {
  const { data, isLoading, isError, error } = useGetCategory(initalFetch, {
    all: true,
  });
  const dataCategory: CategoryDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: `${value.categoryName} - ${value.categoryCode}`,
        value: value.id,
      } as CategoryDropdownOption;
    }) ?? [];

  return (
    <SelectField<CategoryDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataCategory}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : "Select Category"
      }
      value={
        selectedValue
          ? dataCategory.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
