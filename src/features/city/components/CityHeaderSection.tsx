import { ChangeEvent } from "react";
import { InputField } from "../../../components/global/InputField";
import { Button } from "../../../components/global/Button";
import { CountryDropdown } from "../../country/components/CountryDropdown";
import { FilterX } from "lucide-react";
import { ProvinceDropdown } from "../../province/components/ProvinceDropdown";

type CityHeaderSectionProps = {
  searchValue?: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  countryValue?: number;
  onChangeCountry: (value?: number) => void;
  provinceValue?: number;
  onChangeProvince: (value?: number) => void;
  onClear: () => void;
  onCreate: () => void;
};

export const CityHeaderSection = ({
  searchValue = "",
  onChangeSearch,
  countryValue,
  onChangeCountry,
  provinceValue,
  onChangeProvince,
  onClear,
  onCreate,
}: CityHeaderSectionProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 items-center gap-3">
        <InputField
          className="sm:w-52"
          placeholder="Search..."
          value={searchValue}
          onChange={onChangeSearch}
        />
        <CountryDropdown
          className="sm:w-52"
          selectedValue={countryValue}
          onChange={(data) => onChangeCountry(data?.id)}
        />
        <ProvinceDropdown
          initalFetch={Boolean(countryValue)}
          disabled={!countryValue}
          params={{ countryId: countryValue }}
          className="sm:w-52"
          selectedValue={provinceValue}
          onChange={(data) => onChangeProvince(data?.id)}
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
