import { ReactNode, RefObject } from "react";

type DialogProps = {
  ref: RefObject<HTMLDialogElement | null>;
  title?: string;
  children?: ReactNode;
};
export const Dialog = ({ ref, title, children }: DialogProps) => {
  return (
    <dialog
      ref={ref}
      className="rounded-lg shadow-lg outline-none min-w-[500px]"
    >
      <h1 className="font-semibold p-2">{title}</h1>
      <>{children}</>
    </dialog>
  );
};
