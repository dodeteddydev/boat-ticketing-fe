import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { City, citySchema } from "../schemas/CitySchema";
import { Action } from "../../../types/action";
import { CountryDropdown } from "../../country/components/CountryDropdown";
import { ProvinceDropdown } from "../../province/components/ProvinceDropdown";

type CityFormProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: City;
  onSubmit: (data: City) => void;
};

export const CityForm = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: CityFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<City>({
    resolver: zodResolver(citySchema),
    defaultValues: value,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("cityName")}
          disabled={action === "detail"}
          placeholder="Enter City name"
          label="City Name"
          error={errors.cityName?.message}
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
              onChange={(value) => {
                field.onChange(Number(value?.value));
                resetField("provinceId");
              }}
              error={errors.countryId?.message}
            />
          )}
        />
        <Controller
          name="provinceId"
          control={control}
          render={({ field }) => (
            <ProvinceDropdown
              initalFetch={Boolean(watch("countryId"))}
              disabled={action === "detail" || !watch("countryId")}
              params={{ countryId: watch("countryId") }}
              placeholder="Select Province"
              label="Province"
              selectedValue={field.value}
              onChange={(value) => field.onChange(Number(value?.value))}
              error={errors.provinceId?.message}
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
