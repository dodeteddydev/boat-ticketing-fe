import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { Category, categorySchema } from "../schemas/categorySchema";
import { Action } from "../../../types/action";

type CategoryFormProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: Category;
  onSubmit: (data: Category) => void;
};

export const CategoryForm = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(categorySchema),
    defaultValues: value,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("categoryName")}
          disabled={action === "detail"}
          placeholder="Enter Category name"
          label="Category Name"
          error={errors.categoryName?.message}
        />
        <InputField
          {...register("categoryCode")}
          disabled={action === "detail"}
          placeholder="Enter Category code"
          label="Category Code"
          error={errors.categoryCode?.message}
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
