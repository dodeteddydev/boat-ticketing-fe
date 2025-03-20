import { ChangeEvent } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";

type HeaderSectionProps = {
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
};

export const HeaderSection = ({
  onChangeSearch,
  onCreate,
}: HeaderSectionProps) => {
  return (
    <section className="flex flex-col sm:flex-row sm:justify-between mt-4 max-sm:gap-3">
      <InputField
        className="sm:w-52"
        placeholder="Search..."
        onChange={onChangeSearch}
      />
      <Button className="sm:w-52" text="Create" onClick={onCreate} />
    </section>
  );
};
