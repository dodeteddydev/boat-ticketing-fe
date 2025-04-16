import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";

type InputFieldProps = {
  label?: string;
  error?: string;
  isPasswordField?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  label,
  error,
  isPasswordField,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={label?.toLowerCase()}
          className={`text-sm ${error && "text-red-500"}`}
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          {...props}
          type={isPasswordField && !showPassword ? "password" : props.type}
          id={label?.toLowerCase()}
          className={`border h-10 px-2 rounded-lg w-full ${
            error
              ? "border-red-500 focus:outline-red-500"
              : "focus:outline-primary"
          } ${props.type === "file" && "pt-1"} ${props.className}`}
        />

        {isPasswordField && (
          <button
            disabled={props.disabled}
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff
                size={20}
                color={error ? "red" : props.disabled ? "gray" : undefined}
              />
            ) : (
              <Eye
                size={20}
                color={error ? "red" : props.disabled ? "gray" : undefined}
              />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
