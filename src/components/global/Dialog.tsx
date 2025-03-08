import { ReactNode } from "react";

type DialogProps = {
  ref: React.RefObject<HTMLDialogElement | null>;
  title?: string;
  body?: ReactNode;
  footer?: ReactNode;
};
export const Dialog = ({ ref, title, body, footer }: DialogProps) => {
  return (
    <dialog ref={ref} className="rounded-lg shadow-lg outline-none">
      <h1 className="font-semibold p-2">{title}</h1>
      <div className="border-b border-t p-4">{body}</div>
      <div className="p-2">{footer}</div>
    </dialog>
  );
};
