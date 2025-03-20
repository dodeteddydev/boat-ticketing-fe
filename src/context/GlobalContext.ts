import { createContext } from "react";
import { Role } from "../enums/accessed";

type GlobalContextType = {
  userStatus: "authorized" | "unauthorized";
  setUserAuthority: (
    status: "authorized" | "unauthorized",
    access?: string,
    refresh?: string
  ) => void;
  role: Role | undefined;
  setRole: (value: Role) => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
