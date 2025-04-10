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
import { PortForm } from "../components/PortForm";
import { PortHeaderSection } from "../components/PortHeaderSection";
import { PortTable } from "../components/PortTable";
import { useCreatePort } from "../hooks/useCreatePort";
import { useDeletePort } from "../hooks/useDeletePort";
import { useGetPort } from "../hooks/useGetPort";
import { useUpdatePort } from "../hooks/useUpdatePort";
import { Port } from "../schemas/portSchema";
import { PortParams } from "../types/portParams";

export const PortPage = () => {
  const [params, setParams] = useParams<PortParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetPort(true, {
    search: params.search ? search : undefined,
    page: params.page,
    size: params.size,
    countryId: params.countryId,
    provinceId: params.provinceId,
    cityId: params.cityId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultParams(), []);

  const setDefaultParams = () =>
    setParams({
      search: undefined,
      page: 1,
      size: 10,
      countryId: undefined,
      provinceId: undefined,
      cityId: undefined,
    });

  const useCreate = useCreatePort();
  const useUpdate = useUpdatePort();
  const useDelete = useDeletePort();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Port;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Port) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Port) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Port) => {
    useUpdate.mutate(
      { ...data, idPort: actionDialog.id! },
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
      { idPort: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Port</h1>

      <PortHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        countryValue={params.countryId}
        onChangeCountry={(value) => setParams({ countryId: value, page: 1 })}
        provinceValue={params.provinceId}
        onChangeProvince={(value) => setParams({ provinceId: value, page: 1 })}
        cityValue={params.cityId}
        onChangeCity={(value) => setParams({ cityId: value, page: 1 })}
        onClear={setDefaultParams}
        onCreate={() => openDialog("create")}
      />

      <PortTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            portName: data.portName,
            portCode: data.portCode,
            countryId: data.country.id,
            provinceId: data.province.id,
            cityId: data.city.id,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            portName: data.portName,
            portCode: data.portCode,
            countryId: data.country.id,
            provinceId: data.province.id,
            cityId: data.city.id,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            portName: data.portName,
            portCode: data.portCode,
            countryId: data.country.id,
            provinceId: data.province.id,
            cityId: data.city.id,
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
        title={`${capitalizeFirstText(actionDialog.action)} Port`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <PortForm
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
