import { ChangeEvent } from "react";
import { InputField } from "../../../components/global/InputField";
import { BoatDropdown } from "../../boat/components/BoatDropdown";
import { PortDropdown } from "../../port/components/PortDropdown";
import { FilterX } from "lucide-react";

type FilterSectionProps = {
  disabled: boolean;
  dateValue?: string;
  onChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  boatValue?: number;
  onChangeBoat: (value?: number) => void;
  arrivalValue?: number;
  onChangeArrival: (value?: number) => void;
  departureValue?: number;
  onChangeDeparture: (value?: number) => void;
  onClear: () => void;
};

export const FilterSection = ({
  disabled,
  dateValue = "",
  onChangeDate,
  boatValue,
  onChangeBoat,
  arrivalValue,
  onChangeArrival,
  departureValue,
  onChangeDeparture,
  onClear,
}: FilterSectionProps) => {
  return (
    <section className="mt-4 shadow-lg border rounded-lg pb-4">
      <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PortDropdown
          disabled={disabled}
          label="Departure"
          placeholder="Select Departure"
          selectedValue={departureValue}
          onChange={(data) => onChangeDeparture(data?.id)}
        />
        <PortDropdown
          initalFetch={Boolean(departureValue)}
          disabled={!departureValue || disabled}
          label="Arrival"
          placeholder="Select Arrival"
          selectedValue={arrivalValue}
          onChange={(data) => onChangeArrival(data?.id)}
        />
        <InputField
          disabled={disabled}
          type="datetime-local"
          label="Date & Time"
          value={dateValue}
          onChange={onChangeDate}
        />
        <BoatDropdown
          disabled={disabled}
          label="Boat"
          placeholder="Select Boat"
          selectedValue={boatValue}
          onChange={(data) => onChangeBoat(data?.id)}
        />
      </div>

      <div
        className="flex flex-row justify-center gap-3 cursor-pointer hover:opacity-60"
        onClick={onClear}
      >
        <FilterX />
        <p>Reset Filter</p>
      </div>
    </section>
  );
};
