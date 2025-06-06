import { ReactNode, useEffect } from "react";
import { Navigate, Route, Routes as Router, useNavigate } from "react-router";
import pageNotFound from "../assets/page-not-found.png";
import processing from "../assets/processing.png";
import { BaseLayout } from "../components/BaseLayout";
import { Button } from "../components/global/Button";
import { useGlobalContext } from "../context/useGlobalContext";
import { LoginPage } from "../features/login/pages/LoginPage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { ProfileResponse, useGetProfile } from "../hooks/useGetProfile";
import { LocalStorageHelpers } from "../utilities/localStorageHelpers";
import { PageRoutes } from "./PageRoutes";
import { PathRoutes } from "./pathRoutes";

export const Routes = () => {
  const { userStatus, setProfile } = useGlobalContext();
  const navigate = useNavigate();
  const protectedRoutes = PageRoutes.filter(
    (route) => route.routeType === "protected"
  );
  const { data, isLoading, isError } = useGetProfile(
    Boolean(LocalStorageHelpers.getAccessToken())
  );

  useEffect(() => {
    if (data) setProfile(data?.data as ProfileResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError]);

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
        path="*"
        element={
          <div className="h-screen flex flex-col items-center justify-center">
            <img className="h-80 w-80" src={pageNotFound} alt="pageNotFound" />
            <p className="text-3xl font-semibold">Page Not Found</p>
            <Button
              className="w-1/4 mt-3"
              text="Back to Main Page"
              onClick={() => navigate(PathRoutes.dashboard, { replace: true })}
            />
          </div>
        }
      />
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
                  <BaseLayout isError={isError}>{route.element}</BaseLayout>
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
