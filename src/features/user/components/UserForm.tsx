import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { User, userSchema } from "../schemas/userSchema";
import { Action } from "../../../types/action";
import { RoleDropdown } from "./RoleDropdown";
import { Role } from "../../../enums/accessed";
import { useGlobalContext } from "../../../context/useGlobalContext";

type UserFormProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: User;
  onSubmit: (data: User) => void;
};

export const UserForm = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: UserFormProps) => {
  const { profile } = useGlobalContext();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: value,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RoleDropdown
              disabled={
                action === "detail" || profile?.role !== Role.superadmin
              }
              placeholder="Select Role"
              label="Role"
              selectedValue={
                profile?.role !== Role.superadmin
                  ? Role.boatAdmin
                  : (field.value as Role)
              }
              onChange={(value) => field.onChange(value?.value)}
            />
          )}
        />
        <InputField
          {...register("name")}
          disabled={action === "detail"}
          placeholder="Enter name"
          label="Name"
          error={errors.name?.message}
        />
        <InputField
          {...register("username")}
          disabled={action === "detail"}
          placeholder="Enter username"
          label="Username"
          error={errors.username?.message}
        />
        <InputField
          {...register("email")}
          disabled={action === "detail"}
          placeholder="Enter email"
          label="Email"
          error={errors.email?.message}
        />
        {action !== "detail" && (
          <InputField
            {...register("password")}
            isPasswordField
            placeholder="Enter password"
            label="Password"
            error={errors.password?.message}
          />
        )}
      </div>

      {isLoading && (
        <p className="text-center text-xl font-semibold p-2">Loading...</p>
      )}

      {!isLoading && action !== "detail" && (
        <div className="flex p-2 gap-2">
          <Button
            text="Cancel"
            className="bg-[#e5e7eb] text-[#6b7280]"
            onClick={onClickCancel}
          />
          <Button
            type="submit"
            className={action === "update" ? "bg-amber-500" : undefined}
            text={`${capitalizeFirstText(action)}`}
          />
        </div>
      )}
    </form>
  );
};
