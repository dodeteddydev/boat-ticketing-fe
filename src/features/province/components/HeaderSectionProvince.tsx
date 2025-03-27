import { ChangeEvent } from "react";
import { InputField } from "../../../components/global/InputField";
import { Button } from "../../../components/global/Button";
import { CountryDropdown } from "../../country/components/CountryDropdown";
import { FilterX } from "lucide-react";

type HeaderSectionProvinceProps = {
  searchValue?: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  countryValue?: number;
  onChangeCountry: (value?: number) => void;
  onCleare: () => void;
  onCreate: () => void;
};

export const HeaderSectionProvince = ({
  searchValue = "",
  onChangeSearch,
  countryValue,
  onChangeCountry,
  onCleare,
  onCreate,
}: HeaderSectionProvinceProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <InputField
          className="sm:w-52"
          placeholder="Search..."
          value={searchValue}
          onChange={onChangeSearch}
        />
        <CountryDropdown
          className="sm:w-52"
          countryChoose={countryValue}
          onChange={(data) => onChangeCountry(data?.id)}
        />
        <FilterX
          className="cursor-pointer hover:opacity-60"
          onClick={onCleare}
        />
      </div>
      <Button className="sm:w-52" text="Create" onClick={onCreate} />
    </section>
  );
};
