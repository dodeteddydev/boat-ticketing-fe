import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { Country, countrySchema } from "../schemas/countrySchema";
import { Action } from "../../../types/action";

type FormCountryProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: Country;
  onSubmit: (data: Country) => void;
};

export const FormCountry = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: FormCountryProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Country>({
    resolver: zodResolver(countrySchema),
    defaultValues: value,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("countryName")}
          disabled={action === "detail"}
          placeholder="Enter country name"
          label="Country Name"
          error={errors.countryName?.message}
        />
        <InputField
          {...register("countryCode")}
          disabled={action === "detail"}
          placeholder="Enter country code"
          label="Country Code"
          error={errors.countryCode?.message}
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
            className={action === "update" ? "bg-[#f59e0b]" : undefined}
            text={`${capitalizeFirstText(action)}`}
          />
        </div>
      )}
    </form>
  );
};
