import { Button } from "./Button";

type DeleteBodyDialogProps = {
  isLoading?: boolean;
  close: () => void;
  onDelete: () => void;
};

export const DeleteBodyDialog = ({
  isLoading,
  close,
  onDelete,
}: DeleteBodyDialogProps) => {
  return (
    <div>
      {isLoading && (
        <p className="text-center text-xl font-semibold p-2">Loading...</p>
      )}

      {!isLoading && (
        <>
          <div className="p-4 border-y flex flex-col items-center gap-4">
            <h1 className="font-semibold text-xl text-gray-800">
              Are you sure you want to proceed?
            </h1>
            <p className="text-gray-600">
              This action cannot be undone. Please confirm your choice.
            </p>
          </div>

          <div className="flex p-2 gap-2">
            <Button
              text="Cancel"
              className="bg-[#e5e7eb] text-[#6b7280]"
              onClick={close}
            />
            <Button className="bg-red-500" text="Delete" onClick={onDelete} />
          </div>
        </>
      )}
    </div>
  );
};
