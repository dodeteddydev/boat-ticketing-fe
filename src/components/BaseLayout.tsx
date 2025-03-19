import { UserCircle } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import { Button } from "./global/Button";
import { Dialog } from "./global/Dialog";
import { Sidebar } from "./Sidebar";

type BaseLayoutProps = {
  children: ReactNode;
  isError: boolean;
  logout: () => void;
};

export const BaseLayout = ({ children, isError, logout }: BaseLayoutProps) => {
  const { setUserAuthority } = useGlobalContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  useEffect(() => {
    if (isError) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-screen">
      <div className="flex flex-row">
        {/* LEFT SECTION */}
        <section className="bg-white shadow-xl border border-gray-200 min-w-80 rounded-e-3xl h-screen flex flex-col p-4">
          <h1 className="text-3xl font-semibold text-center">
            Boat Ticketing <span className="text-xs font-normal">v.1.0.0</span>
          </h1>
          <Sidebar />
          <ProfileDropdown
            profileClick={() => {}}
            logoutClick={() => setUserAuthority("unauthorized")}
          />
          <footer className="text-xs text-center">
            &copy; {new Date().getFullYear()} dodeteddydev All rights reserved.
          </footer>
        </section>

        {/* RIGHT SECTION */}
        <section className="flex-1 flex flex-col p-4">
          <div className="flex-1">{children}</div>
        </section>
      </div>

      <Dialog
        ref={dialogRef}
        title="Session Expired"
        body={<p>Your session has expired. Please log in again to continue.</p>}
        footer={<Button text="Logout" onClick={logout} />}
      />
    </div>
  );
};

export const ProfileDropdown = ({
  profileClick,
  logoutClick,
}: {
  profileClick: () => void;
  logoutClick: () => void;
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
    <div className="relative self-center mb-4" ref={dropdownRef}>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute bottom-7 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg"
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

      <UserCircle
        className="cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
      />
    </div>
  );
};
