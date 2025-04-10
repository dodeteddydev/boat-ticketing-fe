import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Dialog } from "../../../components/global/Dialog";
import { CountryHeaderSection } from "../components/CountryHeaderSection";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { Action } from "../../../types/action";
import { ListParams } from "../../../types/listParams";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { CountryTable } from "../components/CountryTable";
import { DeleteBodyDialog } from "../../../components/global/DeleteBodyDialog";
import { CountryForm } from "../components/CountryForm";
import { useCreateCountry } from "../hooks/useCreateCountry";
import { useDeleteCountry } from "../hooks/useDeleteCountry";
import { useGetCountry } from "../hooks/useGetCountry";
import { useUpdateCountry } from "../hooks/useUpdateCountry";
import { Country } from "../schemas/countrySchema";
import { ScrollablePaginationWrapper } from "../../../components/global/ScrollablePaginationWraper";

export const CountryPage = () => {
  const [params, setParams] = useParams<ListParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetCountry(true, {
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

  const useCreate = useCreateCountry();
  const useUpdate = useUpdateCountry();
  const useDelete = useDeleteCountry();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Country;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Country) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Country) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Country) => {
    useUpdate.mutate(
      { ...data, idCountry: actionDialog.id! },
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
      { idCountry: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Country</h1>

      <CountryHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        onCreate={() => openDialog("create")}
      />

      <CountryTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            countryName: data.countryName,
            countryCode: data.countryCode,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            countryName: data.countryName,
            countryCode: data.countryCode,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            countryName: data.countryName,
            countryCode: data.countryCode,
          })
        }
      />

      {data?.data && data.data.length > 0 && (
        <ScrollablePaginationWrapper>
          <PageSizeDropdown
            value={{ label: `${params.size}`, value: params.size! }}
            onChange={(data) => setParams({ size: data?.value, page: 1 })}
          />

          <Pagination
            page={params.page ?? 1}
            totalPages={data?.paging.totalPage ?? 1}
            onPageChange={(page) => setParams({ page: page })}
          />
        </ScrollablePaginationWrapper>
      )}

      <Dialog
        ref={dialogRef}
        title={`${capitalizeFirstText(actionDialog.action)} Country`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <CountryForm
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
