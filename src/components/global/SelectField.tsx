import Select, { Props as SelectProps } from "react-select";

export type SelectFieldProps<T = unknown> = {
  label?: string;
  error?: string;
} & SelectProps<T, false>;

export const SelectField = <T,>({
  label,
  error,
  ...props
}: SelectFieldProps<T>) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={label?.toLowerCase()}
          className={`text-sm ${error ? "text-red-500" : "text-gray-700"}`}
        >
          {label}
        </label>
      )}

      <Select<T, false>
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
            height: 40,
          }),
        }}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
