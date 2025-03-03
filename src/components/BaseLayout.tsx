import { ReactNode } from "react";

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <div>{children}</div>;
};
