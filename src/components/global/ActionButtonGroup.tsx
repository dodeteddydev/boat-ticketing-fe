import { Eye, Pencil, Trash } from "lucide-react";

type ActionButtonGroupProps = {
  onClickDetail?: () => void;
  onClickUpdate?: () => void;
  onClickDelete?: () => void;
};

export const ActionButtonGroup = ({
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: ActionButtonGroupProps) => {
  return (
    <div className="flex flex-row gap-3">
      <Eye
        className="cursor-pointer text-primary hover:opacity-60"
        size={20}
        onClick={onClickDetail}
      />
      <Pencil
        className="cursor-pointer text-amber-500 hover:opacity-60"
        size={17}
        onClick={onClickUpdate}
      />
      <Trash
        className="cursor-pointer text-red-500 hover:opacity-60"
        size={17}
        onClick={onClickDelete}
      />
    </div>
  );
};
