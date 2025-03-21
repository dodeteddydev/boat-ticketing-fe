import Select, { Props as SelectProps } from "react-select";

type SelectFieldProps = {
  label?: string;
  error?: string;
} & SelectProps;

export const SelectField = ({ label, error, ...props }: SelectFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={label?.toLowerCase()}
          className={`text-sm ${error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <Select
          {...props}
          inputId={label?.toLowerCase()}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: error ? "#EF4444" : "#63C1FF",
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: error && "#EF4444",
              "&:hover": {
                borderColor: error && "#EF4444",
              },
            }),
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
