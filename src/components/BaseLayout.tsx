import { ReactNode, useEffect, useRef } from "react";
import { useGlobalContext } from "../context/useGlobalContext";
import { Role } from "../enums/accessed";
import { capitalizeFirstText } from "../utilities/capitalizeFirstText";
import { DesktopSidebar } from "./DesktopSidebar";
import { Button } from "./global/Button";
import { Dialog } from "./global/Dialog";
import { MobileSidebar } from "./MobileSidebar";

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
        {/* DESKTOP SIDEBAR */}
        <DesktopSidebar />

        {/* MOBILE SIDEBAR */}
        <MobileSidebar />

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
