import { ChangeEvent } from "react";
import { InputField } from "../../../components/global/InputField";
import { Button } from "../../../components/global/Button";

type CountryHeaderSectionProps = {
  searchValue?: string;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
};

export const CountryHeaderSection = ({
  searchValue = "",
  onChangeSearch,
  onCreate,
}: CountryHeaderSectionProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <InputField
        className="sm:w-52"
        placeholder="Search..."
        value={searchValue}
        onChange={onChangeSearch}
      />
      <Button className="sm:w-52" text="Create" onClick={onCreate} />
    </section>
  );
};
