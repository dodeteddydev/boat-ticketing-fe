import {
  Anchor,
  Building,
  Calendar,
  CalendarDays,
  Globe,
  LayoutDashboard,
  Map,
  MapPin,
  Ship,
  User,
} from "lucide-react";
import { ReactNode } from "react";
import { Role } from "../enums/accessed";
import { BoatPage } from "../features/boat/pages/BoatPage";
import { BookingPage } from "../features/booking/pages/BookingPage";
import { CreateBookingPage } from "../features/booking/pages/CreateBookingPage";
import { CategoryPage } from "../features/category/pages/CategoryPage";
import { CityPage } from "../features/city/pages/CityPage";
import { CountryPage } from "../features/country/pages/CountryPage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { LoginPage } from "../features/login/pages/LoginPage";
import { PortPage } from "../features/port/pages/PortPage";
import { ProvincePage } from "../features/province/pages/ProvincePage";
import { RegisterPage } from "../features/register/pages/RegisterPage";
import { SchedulePage } from "../features/schedule/pages/SchedulePage";
import { UserPage } from "../features/user/pages/UserPage";
import { PathRoutes } from "./pathRoutes";

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
  {
    path: PathRoutes.category,
    menu: "Category",
    accessed: [Role.superadmin],
    icon: <Anchor size={20} />,
    element: <CategoryPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.boat,
    menu: "Boat",
    accessed: [Role.superadmin, Role.boatOwner],
    icon: <Ship size={20} />,
    element: <BoatPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.port,
    menu: "Port",
    accessed: [Role.superadmin],
    icon: <MapPin size={20} />,
    element: <PortPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.schedule,
    menu: "Schedule",
    accessed: [Role.superadmin, Role.boatOwner],
    icon: <Calendar size={20} />,
    element: <SchedulePage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.booking,
    menu: "Booking",
    accessed: [Role.all],
    icon: <CalendarDays size={20} />,
    element: <BookingPage />,
    routeType: "protected",
  },
  {
    path: PathRoutes.createBooking,
    element: <CreateBookingPage />,
    routeType: "protected",
  },
];
