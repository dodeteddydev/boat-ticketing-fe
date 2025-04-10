import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Dialog } from "../../../components/global/Dialog";
import { UserHeaderSection } from "../components/UserHeaderSection";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { Action } from "../../../types/action";
import { ListParams } from "../../../types/listParams";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { UserTable } from "../components/UserTable";
import { DeleteBodyDialog } from "../../../components/global/DeleteBodyDialog";
import { UserForm } from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useGetUser } from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { User } from "../schemas/userSchema";
import { userPayloadMapper } from "../utilities/userPayloadMapper";

export const UserPage = () => {
  const [params, setParams] = useParams<ListParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetUser(true, {
    search: search,
    page: params.page,
    size: params.size,
  });

  useEffect(
    () =>
      setParams({
        search: undefined,
        page: 1,
        size: 10,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const useCreate = useCreateUser();
  const useUpdate = useUpdateUser();
  const useDelete = useDeleteUser();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: User;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: User) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: User) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: User) => {
    useUpdate.mutate(
      { ...data, idUser: actionDialog.id! },
      {
        onSuccess: (response) => {
          closeDialog();
          refetch();
          toast.success(response.message);
        },
        onError: (error) => toast.error(error?.response?.data.errors as string),
      }
    );
  };

  const onDelete = () => {
    useDelete.mutate(
      { idUser: actionDialog.id! },
      {
        onSuccess: (response) => {
          if (data?.data.length === 1 && data.paging.totalPage !== 1)
            setParams({ page: data.paging.currentPage - 1 });

          closeDialog();
          refetch();
          toast.success(response.message);
        },
        onError: (error) => toast.error(error?.response?.data.errors as string),
      }
    );
  };

  return (
    <section>
      <h1 className="font-semibold text-2xl">User</h1>

      <UserHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        onCreate={() => openDialog("create")}
      />

      <UserTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, userPayloadMapper(data))
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, userPayloadMapper(data))
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, userPayloadMapper(data))
        }
      />

      {data?.data && data.data.length > 0 && (
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
          <PageSizeDropdown
            value={{ label: `${params.size}`, value: params.size! }}
            onChange={(data) => setParams({ size: data?.value, page: 1 })}
          />

          <Pagination
            page={params.page ?? 1}
            totalPages={data?.paging.totalPage ?? 1}
            onPageChange={(page) => setParams({ page: page })}
          />
        </div>
      )}

      <Dialog
        ref={dialogRef}
        title={`${capitalizeFirstText(actionDialog.action)} User`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <UserForm
            isLoading={useCreate.isPending || useUpdate.isPending}
            action={actionDialog.action}
            onClickCancel={closeDialog}
            value={actionDialog.data}
            onSubmit={(data) => {
              if (actionDialog.action === "create") return onCreate(data);
              if (actionDialog.action === "update") return onUpdate(data);
            }}
          />
        )}

        {actionDialog.action === "delete" && (
          <DeleteBodyDialog
            isLoading={isLoading}
            close={closeDialog}
            onDelete={onDelete}
          />
        )}
      </Dialog>

      <ToastContainer position="top-center" autoClose={1000} />
    </section>
  );
};
