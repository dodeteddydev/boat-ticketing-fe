import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DeleteBodyDialog } from "../../../components/global/DeleteBodyDialog";
import { Dialog } from "../../../components/global/Dialog";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { Action } from "../../../types/action";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { BoatForm } from "../components/BoatForm";
import { BoatHeaderSection } from "../components/BoatHeaderSection";
import { BoatTable } from "../components/BoatTable";
import { useCreateBoat } from "../hooks/useCreateBoat";
import { useDeleteBoat } from "../hooks/useDeleteBoat";
import { useGetBoat } from "../hooks/useGetBoat";
import { useUpdateBoat } from "../hooks/useUpdateBoat";
import { Boat } from "../schemas/boatSchema";
import { BoatParams } from "../types/boatParams";

export const BoatPage = () => {
  const [params, setParams] = useParams<BoatParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetBoat(true, {
    search: params.search ? search : undefined,
    page: params.page,
    size: params.size,
    categoryId: params.categoryId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultParams(), []);

  const setDefaultParams = () =>
    setParams({
      search: undefined,
      page: 1,
      size: 10,
      categoryId: undefined,
    });

  const useCreate = useCreateBoat();
  const useUpdate = useUpdateBoat();
  const useDelete = useDeleteBoat();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Boat;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Boat) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Boat) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Boat) => {
    useUpdate.mutate(
      { ...data, idBoat: actionDialog.id! },
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
      { idBoat: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Boat</h1>

      <BoatHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        categoryValue={params.categoryId}
        onChangeCategory={(value) => setParams({ categoryId: value, page: 1 })}
        onClear={setDefaultParams}
        onCreate={() => openDialog("create")}
      />

      <BoatTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            boatName: data.boatName,
            boatCode: data.boatCode,
            categoryId: data.category.id,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            boatName: data.boatName,
            boatCode: data.boatCode,
            categoryId: data.category.id,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            boatName: data.boatName,
            boatCode: data.boatCode,
            categoryId: data.category.id,
          })
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
        title={`${capitalizeFirstText(actionDialog.action)} Boat`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <BoatForm
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
