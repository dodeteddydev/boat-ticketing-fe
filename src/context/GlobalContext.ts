import { createContext } from "react";
import { ProfileResponse } from "../hooks/useGetProfile";

type GlobalContextType = {
  userStatus: "authorized" | "unauthorized";
  setUserAuthority: (
    status: "authorized" | "unauthorized",
    access?: string
  ) => void;
  profile?: ProfileResponse;
  setProfile: (profile: ProfileResponse) => void;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
