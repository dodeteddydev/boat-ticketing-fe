import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = {
  text?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "h-10 w-full rounded-lg bg-primary text-white disabled:opacity-80 active:opacity-80",
        props.className
      )}
    >
      {props.disabled ? "Loading..." : text}
    </button>
  );
};
