import { ReactNode, RefObject } from "react";
import { X } from "lucide-react";

type DialogProps = {
  ref: RefObject<HTMLDialogElement | null>;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
};
export const Dialog = ({ ref, title, children, onClose }: DialogProps) => {
  return (
    <dialog
      ref={ref}
      className="rounded-lg shadow-lg outline-none min-w-[500px]"
    >
      <div className="flex items-center justify-between p-2">
        <h1 className="font-semibold">{title}</h1>
        {onClose && <X className="cursor-pointer" onClick={onClose} />}
      </div>
      <>{children}</>
    </dialog>
  );
};
