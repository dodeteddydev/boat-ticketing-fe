import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";
import { Role } from "../enums/accessed";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userStatus, setUserStatus] = useState<"authorized" | "unauthorized">(
    LocalStorageHelpers.getAccessToken() ? "authorized" : "unauthorized"
  );

  const setUserAuthority = (
    status: "authorized" | "unauthorized",
    access?: string,
    refresh?: string
  ) => {
    if (status === "authorized") {
      setUserStatus("authorized");
      LocalStorageHelpers.setToken(access!, refresh!);

      return;
    }

    setUserStatus("unauthorized");
    LocalStorageHelpers.removeToken();
  };

  const [role, setRole] = useState<Role>();

  return (
    <GlobalContext.Provider
      value={{ userStatus, setUserAuthority, role, setRole }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
