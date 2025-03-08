import { createContext } from "react";

type GlobalContextType = {
  userStatus: "authorized" | "unauthorized";
  setUserAuthority: (
    status: "authorized" | "unauthorized",
    access?: string,
    refresh?: string
  ) => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
