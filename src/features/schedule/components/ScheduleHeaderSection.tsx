import { FilterX } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "../../../components/global/Button";
import { InputField } from "../../../components/global/InputField";
import { BoatDropdown } from "../../boat/components/BoatDropdown";
import { PortDropdown } from "../../port/components/PortDropdown";

type ScheduleHeaderSectionProps = {
  dateValue?: string;
  onChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  boatValue?: number;
  onChangeBoat: (value?: number) => void;
  arrivalValue?: number;
  onChangeArrival: (value?: number) => void;
  departureValue?: number;
  onChangeDeparture: (value?: number) => void;
  onClear: () => void;
  onCreate: () => void;
};

export const ScheduleHeaderSection = ({
  dateValue = "",
  onChangeDate,
  boatValue,
  onChangeBoat,
  arrivalValue,
  onChangeArrival,
  departureValue,
  onChangeDeparture,
  onClear,
  onCreate,
}: ScheduleHeaderSectionProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 items-center gap-3">
        <InputField
          className="sm:w-52"
          type="date"
          value={dateValue}
          onChange={onChangeDate}
        />
        <BoatDropdown
          className="sm:w-52"
          selectedValue={boatValue}
          onChange={(data) => onChangeBoat(data?.id)}
        />
        <PortDropdown
          className="sm:w-52"
          placeholder="Select Departure"
          selectedValue={departureValue}
          onChange={(data) => onChangeDeparture(data?.id)}
        />
        <PortDropdown
          initalFetch={Boolean(departureValue)}
          disabled={!departureValue}
          className="sm:w-52"
          placeholder="Select Arrival"
          selectedValue={arrivalValue}
          onChange={(data) => onChangeArrival(data?.id)}
        />
        <FilterX
          className="cursor-pointer hover:opacity-60"
          onClick={onClear}
        />
      </div>
      <Button className="sm:w-52" text="Create" onClick={onCreate} />
    </section>
  );
};
