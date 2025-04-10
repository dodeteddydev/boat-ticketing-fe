import { ChangeEvent } from "react";
import { InputField } from "../../../components/global/InputField";
import { Button } from "../../../components/global/Button";
import { CategoryDropdown } from "../../category/components/CategoryDropdown";
import { FilterX } from "lucide-react";

type BoatHeaderSectionProps = {
  searchValue?: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  categoryValue?: number;
  onChangeCategory: (value?: number) => void;
  onClear: () => void;
  onCreate: () => void;
};

export const BoatHeaderSection = ({
  searchValue = "",
  onChangeSearch,
  categoryValue,
  onChangeCategory,
  onClear,
  onCreate,
}: BoatHeaderSectionProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <InputField
          className="sm:w-52"
          placeholder="Search..."
          value={searchValue}
          onChange={onChangeSearch}
        />
        <CategoryDropdown
          className="sm:w-52"
          selectedValue={categoryValue}
          onChange={(data) => onChangeCategory(data?.id)}
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
