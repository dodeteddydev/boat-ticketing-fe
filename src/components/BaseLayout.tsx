import { Menu, UserCircle } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import { Button } from "./global/Button";
import { Dialog } from "./global/Dialog";
import { Sidebar } from "./Sidebar";
import { Role } from "../enums/accessed";
import { capitalizeFirstText } from "../utilities/capitalizeFirstText";

type BaseLayoutProps = {
  children: ReactNode;
  isError: boolean;
};

export const BaseLayout = ({ children, isError }: BaseLayoutProps) => {
  const { setUserAuthority, profile } = useGlobalContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  useEffect(() => {
    if (
      isError ||
      profile?.role === Role.customer ||
      profile?.status === "unverified"
    ) {
      openDialog();
    }
  }, [profile, isError]);

  return (
    <div className="relative h-screen">
      <div className="flex flex-row max-custom:flex-col max-custom:h-screen">
        {/* LEFT SECTION */}
        <section className="bg-white shadow-xl border border-gray-200 rounded-e-3xl h-screen hidden custom:flex flex-col p-4">
          <h1 className="text-3xl font-semibold text-center">
            Boat Ticketing <span className="text-xs font-normal">v.1.0.0</span>
          </h1>
          <Sidebar role={profile?.role as Role} />
          <ProfileDropdown
            name={profile?.name ?? ""}
            profileClick={() => {}}
            logoutClick={() => setUserAuthority("unauthorized")}
          />
          <footer className="text-xs text-center">
            &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
          </footer>
        </section>

        {/* SECTION SHOW WHEN MOBILE LAYOUT */}
        <section className="custom:hidden flex flex-row justify-between">
          <MobileSidebar role={profile?.role as Role} />
          <ProfileDropdown
            name={profile?.name ?? ""}
            isOnTop
            profileClick={() => {}}
            logoutClick={() => setUserAuthority("unauthorized")}
          />
        </section>

        {/* RIGHT SECTION */}
        <section className="flex-1 flex flex-col px-4 md:p-4">
          <>{children}</>
        </section>
      </div>

      <Dialog
        ref={dialogRef}
        title={isError ? "Session Expired" : "Access Denied"}
      >
        <p className="p-4 border-y">
          {isError
            ? "Your session has expired. Please log in again to continue."
            : profile?.status === "unverified"
            ? "Please verify your account to access this app."
            : `${capitalizeFirstText(
                profile?.role ?? ""
              )} can't access this app.`}
        </p>

        <div className="p-2 flex flex-col gap-2">
          {profile?.status === "unverified" && (
            <Button className="bg-green-500" text="Verify" onClick={() => {}} />
          )}

          <Button
            text="Logout"
            onClick={() => {
              setUserAuthority("unauthorized");
              window.location.reload();
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export const ProfileDropdown = ({
  profileClick,
  logoutClick,
  isOnTop,
  name,
}: {
  isOnTop?: boolean;
  profileClick: () => void;
  logoutClick: () => void;
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative mb-4 z-30" ref={dropdownRef}>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg ${
            isOnTop ? "top-16 right-2" : "bottom-7 left-10"
          }`}
        >
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={profileClick}
            >
              Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
              onClick={logoutClick}
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      <div className={`flex flex-col items-center ${isOnTop && "m-4"}`}>
        <p>{name}</p>
        <UserCircle
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
};

export const MobileSidebar = ({ role }: { role: Role }) => {
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
    <div className="relative self-center mb-4 z-30" ref={sidebarRef}>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute bg-white shadow-xl border w-72 border-gray-200 rounded-e-3xl flex flex-col flex-1 h-screen p-4"
        >
          <h1 className="font-semibold text-center">
            Boat Ticketing <span className="text-xs font-normal">v.1.0.0</span>
          </h1>
          <Sidebar role={role} />
          <footer className="text-xs text-center mt-auto">
            &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
          </footer>
        </div>
      )}

      <Menu
        className="cursor-pointer m-4"
        onMouseEnter={() => setIsOpen(true)}
      />
    </div>
  );
};
