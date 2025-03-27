import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { Province, provinceSchema } from "../schemas/provinceSchema";
import { Action } from "../../../types/action";
import { CountryDropdown } from "../../country/components/CountryDropdown";

type FormProvinceProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: Province;
  onSubmit: (data: Province) => void;
};

export const FormProvince = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: FormProvinceProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Province>({
    resolver: zodResolver(provinceSchema),
    defaultValues: value,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("provinceName")}
          disabled={action === "detail"}
          placeholder="Enter Province name"
          label="Province Name"
          error={errors.provinceName?.message}
        />
        <InputField
          {...register("provinceCode")}
          disabled={action === "detail"}
          placeholder="Enter Province code"
          label="Province Code"
          error={errors.provinceCode?.message}
        />
        <Controller
          name="countryId"
          control={control}
          render={({ field }) => (
            <CountryDropdown
              disabled={action === "detail"}
              placeholder="Select Country"
              label="Country"
              selectedValue={field.value}
              onChange={(value) => field.onChange(Number(value?.value))}
              error={errors.countryId?.message}
            />
          )}
        />
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
