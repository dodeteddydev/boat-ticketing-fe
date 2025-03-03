import { ReactNode, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userStatus, setUserStatus] = useState<"authorized" | "unauthorized">(
    localStorage.getItem("token") ? "authorized" : "unauthorized"
  );

  return (
    <GlobalContext.Provider value={{ userStatus, setUserStatus }}>
      {children}
    </GlobalContext.Provider>
  );
};
