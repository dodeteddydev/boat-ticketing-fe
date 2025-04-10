import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { DropdownOptions } from "../../../types/dropdownOptions";
import { useGetBoat } from "../hooks/useGetBoat";
import { BoatParams } from "../types/boatParams";
import { BoatResponse } from "../types/boatResponse";

type BoatDropdownOption = DropdownOptions & BoatResponse;

export const BoatDropdown = ({
  initalFetch = true,
  selectedValue,
  disabled,
  params,
  ...props
}: Omit<SelectFieldProps<BoatDropdownOption>, "options"> & {
  initalFetch?: boolean;
  selectedValue?: number;
  disabled?: boolean;
  params?: BoatParams;
}) => {
  const { data, isLoading, isError, error } = useGetBoat(initalFetch, {
    all: true,
    ...params,
  });
  const dataBoat: BoatDropdownOption[] =
    data?.data.map((value) => {
      return {
        ...value,
        label: `${value.boatName} - ${value.boatCode}`,
        value: value.id,
      } as BoatDropdownOption;
    }) ?? [];

  return (
    <SelectField<BoatDropdownOption>
      {...props}
      isDisabled={isLoading || isError || disabled}
      options={dataBoat}
      menuPosition="fixed"
      placeholder={
        isLoading
          ? "Loading..."
          : isError
          ? `${error.status} ${error.response?.data.message}`
          : "Select Boat"
      }
      value={
        selectedValue
          ? dataBoat.find((value) => value.id === selectedValue)
          : null
      }
    />
  );
};
