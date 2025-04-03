import {
  SelectField,
  SelectFieldProps,
} from "../../../components/global/SelectField";
import { Role } from "../../../enums/accessed";

type RoleDropdownOptions = {
  label: string;
  value: string;
};

export const RoleDropdown = ({
  selectedValue,
  disabled,
  ...props
}: Omit<SelectFieldProps<RoleDropdownOptions>, "options"> & {
  selectedValue?: Role;
  disabled?: boolean;
}) => {
  const dataRole: RoleDropdownOptions[] = [
    {
      label: Role.boatOwner,
      value: Role.boatOwner,
    },
    {
      label: Role.boatAdmin,
      value: Role.boatAdmin,
    },
    {
      label: Role.customer,
      value: Role.customer,
    },
  ];

  return (
    <SelectField<RoleDropdownOptions>
      {...props}
      isDisabled={disabled}
      options={dataRole}
      menuPosition="fixed"
      value={
        selectedValue
          ? dataRole.find((value) => value.value === selectedValue)
          : null
      }
    />
  );
};
