import { useLocation, useNavigate } from "react-router";
import { Role } from "../enums/accessed";
import { PageRoutes } from "../routes/PageRoutes";

export const SidebarItem = ({ role }: { role: Role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-scroll my-4">
      {PageRoutes.filter(
        (val) =>
          val.accessed?.includes(Role.all) || val.accessed?.includes(role!)
      ).map((val, index) => (
        <div
          key={`${val.menu}${index}`}
          className={`flex gap-4 py-2 px-4 my-1 rounded-xl items-center cursor-pointer hover:bg-primary hover:text-white ${
            location.pathname === val.path && "bg-primary text-white"
          }`}
          onClick={() => location.pathname !== val.path && navigate(val.path)}
        >
          {val.icon}
          <p>{val.menu}</p>
        </div>
      ))}
    </div>
  );
};
