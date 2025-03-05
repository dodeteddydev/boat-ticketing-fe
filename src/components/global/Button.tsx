import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  text?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-primary h-10 w-full rounded-lg text-white disabled:opacity-80 active:opacity-80 ${props.className}`}
    >
      {props.disabled ? "Loading..." : text}
    </button>
  );
};
