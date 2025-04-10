import { useEffect, useRef, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { Menu } from "lucide-react";
import { useGlobalContext } from "../context/useGlobalContext";
import { Role } from "../enums/accessed";
import { ProfileDropdown } from "./ProfileDropdown";

export const MobileSidebar = () => {
  const { setUserAuthority, profile } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="custom:hidden">
      <div className="relative self-center mb-4 z-30" ref={sidebarRef}>
        {isOpen && (
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="absolute bg-white shadow-xl border w-72 border-gray-200 rounded-e-3xl flex flex-col flex-1 h-screen p-4"
          >
            <h1 className="font-semibold text-center">
              Boat Ticketing
              <span className="text-xs font-normal">v.1.0.0</span>
            </h1>
            <SidebarItem role={profile?.role as Role} />
            <footer className="text-xs text-center mt-auto">
              &copy; {new Date().getFullYear()} dodeteddydev All rights
              reserved.
            </footer>
          </div>
        )}
      </div>

      <div className="flex justify-between px-4">
        <Menu
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        />

        <ProfileDropdown
          isMobileView
          name={profile?.name}
          profileClick={() => {}}
          logoutClick={() => setUserAuthority("unauthorized")}
        />
      </div>
    </section>
  );
};
