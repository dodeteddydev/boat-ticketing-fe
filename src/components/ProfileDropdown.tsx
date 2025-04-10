import { UserCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const ProfileDropdown = ({
  profileClick,
  logoutClick,
  isMobileView,
  name,
}: {
  isMobileView?: boolean;
  profileClick: () => void;
  logoutClick: () => void;
  name?: string;
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
    <div className="relative z-30" ref={dropdownRef}>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className={`absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg ${
            isMobileView ? "top-6 right-1" : "bottom-11 left-10"
          }`}
        >
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={profileClick}
            >
              {name ?? "Profile"}
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

      <div className="custom:flex custom:justify-center custom:mb-4">
        <UserCircle
          className="cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
        />
      </div>
    </div>
  );
};
