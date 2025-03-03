import { ReactNode } from "react";
import { PathRoutes } from "./pathRoutes";
import { LoginPage } from "../features/login/pages/LoginPage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";

type PageRoutesType = {
  path: string;
  element: ReactNode;
  routeType: "protected" | "unprotected";
};

export const PageRoutes: PageRoutesType[] = [
  {
    path: PathRoutes.login,
    element: <LoginPage />,
    routeType: "unprotected",
  },
  {
    path: PathRoutes.register,
    element: <RegisterPage />,
    routeType: "unprotected",
  },
  {
    path: PathRoutes.dashboard,
    element: <DashboardPage />,
    routeType: "protected",
  },
];
