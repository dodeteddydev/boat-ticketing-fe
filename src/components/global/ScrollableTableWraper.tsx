import { ReactNode } from "react";

export const ScrollableTableWrapper = ({
  children,
  maxHeight,
}: {
  children: ReactNode;
  maxHeight?: string;
}) => {
  return (
    <div
      className={`${
        maxHeight ? maxHeight : "max-h-[500px]"
      } custom:max-h-[650px] my-5 overflow-scroll`}
    >
      {children}
    </div>
  );
};
