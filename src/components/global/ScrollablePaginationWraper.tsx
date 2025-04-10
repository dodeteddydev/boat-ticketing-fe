import { ReactNode } from "react";

export const ScrollablePaginationWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between overflow-scroll">
      {children}
    </div>
  );
};
