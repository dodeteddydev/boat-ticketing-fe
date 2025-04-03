import { ReactNode } from "react";
import { PathRoutes } from "./pathRoutes";
import { LoginPage } from "../features/login/pages/LoginPage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { CountryPage } from "../features/country/pages/CountryPage";
import { ProvincePage } from "../features/province/pages/ProvincePage";
import { CityPage } from "../features/city/pages/CityPage";
import { Role } from "../enums/accessed";
import { Building, Globe, LayoutDashboard, Map, User } from "lucide-react";
import { UserPage } from "../features/user/pages/UserPage";

type PageRoutesType = {
  path: string;
  menu?: string;
  accessed?: Role[];
  icon?: ReactNode;
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
    path: PathRoutes.signUp,
    element: <RegisterPage />,
    routeType: "unprotected",
  },
  {
    path: PathRoutes.dashboard,
    menu: "Dashboard",
    accessed: [Role.all],
    icon: <LayoutDashboard size={20} />,
    element: <DashboardPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.user,
    menu: "User",
    accessed: [Role.superadmin, Role.boatOwner],
    icon: <User size={20} />,
    element: <UserPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.country,
    menu: "Country",
    accessed: [Role.superadmin],
    icon: <Globe size={20} />,
    element: <CountryPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.province,
    menu: "Province",
    accessed: [Role.superadmin],
    icon: <Map size={20} />,
    element: <ProvincePage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.city,
    menu: "City",
    accessed: [Role.superadmin],
    icon: <Building size={20} />,
    element: <CityPage />,
    routeType: "protected",
  },
];
