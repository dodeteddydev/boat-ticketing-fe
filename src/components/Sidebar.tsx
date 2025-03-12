import { LayoutDashboard } from "lucide-react";
import { ReactNode } from "react";
import { Role } from "../enums/accessed";
import { PathRoutes } from "../routes/pathRoutes";

export const Sidebar = () => {
  return (
    <div className="flex-1 overflow-scroll my-4">
      {sidebarMenu.map((val, index) => (
        <div
          key={`${val.menu}${index}`}
          className="flex my-3 gap-6 items-center"
        >
          {val.icon}
          <p className="text-black">{val.menu}</p>
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
];
