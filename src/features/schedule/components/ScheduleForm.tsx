import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { Action } from "../../../types/action";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { BoatDropdown } from "../../boat/components/BoatDropdown";
import { Schedule, scheduleSchema } from "../schemas/scheduleSchema";
import { PortDropdown } from "../../port/components/PortDropdown";
import { formatDateForField } from "../../../utilities/formatDate";
import { useGlobalContext } from "../../../context/useGlobalContext";

type ScheduleFormProps = {
  action: Action;
  isLoading?: boolean;
  onClickCancel: () => void;
  value?: Schedule;
  onSubmit: (data: Schedule) => void;
};

export const ScheduleForm = ({
  action,
  isLoading,
  onClickCancel,
  value,
  onSubmit,
}: ScheduleFormProps) => {
  const { profile } = useGlobalContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<Schedule>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      ...value,
      schedule: value?.schedule
        ? formatDateForField(value?.schedule)
        : undefined,
    },
  });

  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 border-y flex flex-col gap-4">
        <InputField
          {...register("schedule")}
          disabled={action === "detail"}
          placeholder="Enter Schedule"
          label="Schedule"
          type="datetime-local"
          error={errors.schedule?.message}
        />
        <InputField
          {...register("seat", { valueAsNumber: true })}
          disabled={action === "detail"}
          placeholder="Enter Seat"
          label="Seat"
          type="number"
          error={errors.seat?.message}
        />
        <InputField
          {...register("price", { valueAsNumber: true })}
          disabled={action === "detail"}
          placeholder="Enter Price"
          label="Price"
          type="number"
          error={errors.price?.message}
        />
        {profile?.role === "superadmin" && (
          <InputField
            {...register("markupPrice", { valueAsNumber: true })}
            disabled={action === "detail"}
            placeholder="Enter Markup Price"
            label="Markup Price"
            type="number"
            error={errors.markupPrice?.message}
          />
        )}
        <Controller
          name="boatId"
          control={control}
          render={({ field }) => (
            <BoatDropdown
              disabled={action === "detail"}
              placeholder="Select Boat"
              label="Boat"
              selectedValue={field.value}
              onChange={(value) => field.onChange(Number(value?.value))}
              error={errors.boatId?.message}
            />
          )}
        />
        <Controller
          name="departureId"
          control={control}
          render={({ field }) => (
            <PortDropdown
              disabled={action === "detail"}
              placeholder="Select Departure"
              label="Departure"
              selectedValue={field.value}
              onChange={(value) => {
                field.onChange(Number(value?.value));
                resetField("arrivalId");
              }}
              error={errors.departureId?.message}
            />
          )}
        />
        <Controller
          name="arrivalId"
          control={control}
          render={({ field }) => (
            <PortDropdown
              initalFetch={Boolean(watch("departureId"))}
              disabled={action === "detail" || !watch("departureId")}
              // params={{ departureId: watch("departureId") }}
              placeholder="Select Arrival"
              label="Arrival"
              selectedValue={field.value}
              onChange={(value) => field.onChange(Number(value?.value))}
              error={errors.arrivalId?.message}
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
