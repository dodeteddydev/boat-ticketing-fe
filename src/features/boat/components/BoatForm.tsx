import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { Action } from "../../../types/action";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { generateImageUrl } from "../../../utilities/generateImageUrl";
import { CategoryDropdown } from "../../category/components/CategoryDropdown";
import { Boat, boatSchema } from "../schemas/boatSchema";

type BoatFormProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: Boat;
  onSubmit: (data: Boat) => void;
};

export const BoatForm = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: BoatFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Boat>({
    resolver: zodResolver(boatSchema),
    defaultValues: value,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (value?.image) {
      setImagePreview(generateImageUrl(value.image as string) ?? null);
    }
  }, [value?.image]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("boatName")}
          disabled={action === "detail"}
          placeholder="Enter Boat name"
          label="Boat Name"
          error={errors.boatName?.message}
        />
        <InputField
          {...register("boatCode")}
          disabled={action === "detail"}
          placeholder="Enter Boat code"
          label="Boat Code"
          error={errors.boatCode?.message}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <CategoryDropdown
              disabled={action === "detail"}
              placeholder="Select Category"
              label="Category"
              selectedValue={field.value}
              onChange={(value) => field.onChange(Number(value?.value))}
              error={errors.categoryId?.message}
            />
          )}
        />
        {action !== "detail" && (
          <InputField
            {...register("image", {
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              },
            })}
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            placeholder="Enter Image"
            label="Image"
            error={errors.image?.message as string}
          />
        )}

        {imagePreview && (
          <div className="flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-96 h-80 object-cover border rounded-lg"
            />
          </div>
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
