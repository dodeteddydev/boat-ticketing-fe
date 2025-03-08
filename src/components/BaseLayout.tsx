import { AxiosError } from "axios";
import { ReactNode, useEffect, useRef } from "react";
import { ErrorResponse } from "../types/errorResponse";
import { Dialog } from "./global/Dialog";
import { Button } from "./global/Button";

type BaseLayoutProps = {
  children: ReactNode;
  isError: boolean;
  error: AxiosError<ErrorResponse> | null;
  logout: () => void;
};

export const BaseLayout = ({
  children,
  isError,
  error,
  logout,
}: BaseLayoutProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };
  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  useEffect(() => {
    if (isError) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative h-screen">
      {children}

      <Dialog
        ref={dialogRef}
        title={error?.status === 401 ? "Session Expired" : "Something Error"}
        body={
          <p>
            {error?.status === 401
              ? "Your session has expired. Please log in again to continue."
              : error?.response?.data.errors}
          </p>
        }
        footer={
          <div className="flex gap-2">
            {error?.status !== 401 && (
              <Button
                className="bg-gray-200 text-black"
                text="Close"
                onClick={closeDialog}
              />
            )}
            <Button text="Logout" onClick={logout} />
          </div>
        }
      />
    </div>
  );
};
