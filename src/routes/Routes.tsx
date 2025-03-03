import { ReactNode } from "react";
import { Navigate, Route, Routes as Router } from "react-router";
import { BaseLayout } from "../components/BaseLayout";
import { useGlobalContext } from "../context/useGlobalContext";
import { LoginPage } from "../features/login/pages/LoginPage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { PageRoutes } from "./PageRoutes";
import { PathRoutes } from "./pathRoutes";

export const Routes = () => {
  const { userStatus } = useGlobalContext();
  const protectedRoutes = PageRoutes.filter(
    (route) => route.routeType === "protected"
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
        path={PathRoutes.register}
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
              <BaseLayout
                children={
                  <AuthorizedPage
                    type="protected"
                    isAuthorized={userStatus === "authorized"}
                    children={route.element}
                  />
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
