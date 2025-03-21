import { Flag, LayoutDashboard } from "lucide-react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { Role } from "../enums/accessed";
import { PathRoutes } from "../routes/pathRoutes";

export const Sidebar = ({ role }: { role: Role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-scroll my-4">
      {sidebarMenu
        .filter(
          (val) =>
            val.accessed.includes(Role.all) || val.accessed.includes(role!)
        )
        .map((val, index) => (
          <div
            key={`${val.menu}${index}`}
            className={`flex gap-4 py-2 px-4 my-1 rounded-xl items-center cursor-pointer hover:bg-primary hover:text-white ${
              location.pathname === val.path && "bg-primary text-white"
            }`}
            onClick={() => navigate(val.path)}
          >
            {val.icon}
            <p>{val.menu}</p>
          </div>
        ))}
    </div>
  );
};

const sidebarMenu: {
  path: PathRoutes;
  menu: string;
  accessed: Role[];
  icon: ReactNode;
}[] = [
  {
    path: PathRoutes.dashboard,
    menu: "Dashboard",
    accessed: [Role.all],
    icon: <LayoutDashboard size={20} />,
  },
  {
    path: PathRoutes.country,
    menu: "Country",
    accessed: [Role.superadmin],
    icon: <Flag size={20} />,
  },
];
