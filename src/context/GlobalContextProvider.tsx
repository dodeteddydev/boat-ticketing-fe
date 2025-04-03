import { ReactNode, useState } from "react";
import { ProfileResponse } from "../hooks/useGetProfile";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";
import { GlobalContext } from "./GlobalContext";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userStatus, setUserStatus] = useState<"authorized" | "unauthorized">(
    LocalStorageHelpers.getAccessToken() ? "authorized" : "unauthorized"
  );
  const [profile, setProfile] = useState<ProfileResponse | undefined>();

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

  return (
    <GlobalContext.Provider
      value={{ userStatus, setUserAuthority, profile, setProfile }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
