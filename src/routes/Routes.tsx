import { ReactNode, useEffect } from "react";
import { Navigate, Route, Routes as Router } from "react-router";
import { BaseLayout } from "../components/BaseLayout";
import { useGlobalContext } from "../context/useGlobalContext";
import { useGetProfile } from "../features/dashboard/hooks/useGetProfile";
import { LoginPage } from "../features/login/pages/LoginPage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";
import { PageRoutes } from "./PageRoutes";
import { PathRoutes } from "./pathRoutes";
import processing from "../assets/processing.png";
import { Role } from "../enums/accessed";

export const Routes = () => {
  const { userStatus, setUserAuthority, setRole } = useGlobalContext();
  const protectedRoutes = PageRoutes.filter(
    (route) => route.routeType === "protected"
  );
  const { data, isLoading, isError } = useGetProfile(
    Boolean(LocalStorageHelpers.getAccessToken())
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setRole(data?.data.role as Role), [data]);

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <img className="h-80 w-80" src={processing} alt="processing" />
        <p className="text-3xl font-semibold">Loading...</p>
      </div>
    );

  return (
    <Router>
      <Route
        path={PathRoutes.login}
        element={
          <AuthorizedPage
            type="unprotected"
            isAuthorized={userStatus === "authorized"}
            children={<LoginPage />}
          />
        }
      />
      <Route
        path={PathRoutes.signUp}
        element={
          <AuthorizedPage
            type="unprotected"
            isAuthorized={userStatus === "authorized"}
            children={<RegisterPage />}
          />
        }
      />

      {protectedRoutes.map((route, index) => {
        return (
          <Route
            key={`${route.path}${index}`}
            path={route.path}
            element={
              <AuthorizedPage
                type="protected"
                isAuthorized={userStatus === "authorized"}
                children={
                  <BaseLayout
                    isError={isError}
                    logout={() => setUserAuthority("unauthorized")}
                  >
                    {route.element}
                  </BaseLayout>
                }
              />
            }
          />
        );
      })}
    </Router>
  );
};

const AuthorizedPage = ({
  type,
  isAuthorized,
  children,
}: {
  type: "protected" | "unprotected";
  isAuthorized: boolean;
  children: ReactNode;
}) => {
  if (type === "protected")
    return isAuthorized ? children : <Navigate to={PathRoutes.login} replace />;

  return isAuthorized ? (
    <Navigate to={PathRoutes.dashboard} replace />
  ) : (
    children
  );
};
