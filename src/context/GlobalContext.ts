import { createContext } from "react";

type GlobalContextType = {
  userStatus: "authorized" | "unauthorized";
  setUserStatus: (status: "authorized" | "unauthorized") => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
