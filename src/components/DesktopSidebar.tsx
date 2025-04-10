import { useGlobalContext } from "../context/useGlobalContext";
import { Role } from "../enums/accessed";
import { ProfileDropdown } from "./ProfileDropdown";
import { SidebarItem } from "./SidebarItem";

export const DesktopSidebar = () => {
  const { setUserAuthority, profile } = useGlobalContext();

  return (
    <section className="bg-white shadow-xl border border-gray-200 rounded-e-3xl h-screen hidden custom:flex flex-col p-4">
      <h1 className="text-3xl font-semibold text-center">
        Boat Ticketing <span className="text-xs font-normal">v.1.0.0</span>
      </h1>

      <SidebarItem role={profile?.role as Role} />

      <ProfileDropdown
        name={profile?.name}
        profileClick={() => {}}
        logoutClick={() => setUserAuthority("unauthorized")}
      />

      <footer className="text-xs text-center">
        &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
      </footer>
    </section>
  );
};
