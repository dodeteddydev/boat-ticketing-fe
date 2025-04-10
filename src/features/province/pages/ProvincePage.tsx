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
import { ProvinceForm } from "../components/ProvinceForm";
import { ProvinceHeaderSection } from "../components/ProvinceHeaderSection";
import { ProvinceTable } from "../components/ProvinceTable";
import { useCreateProvince } from "../hooks/useCreateProvince";
import { useDeleteProvince } from "../hooks/useDeleteProvince";
import { useGetProvince } from "../hooks/useGetProvince";
import { useUpdateProvince } from "../hooks/useUpdateProvince";
import { Province } from "../schemas/provinceSchema";
import { ProvinceParams } from "../types/provinceParams";
import { ScrollablePaginationWrapper } from "../../../components/global/ScrollablePaginationWraper";

export const ProvincePage = () => {
  const [params, setParams] = useParams<ProvinceParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetProvince(true, {
    search: params.search ? search : undefined,
    page: params.page,
    size: params.size,
    countryId: params.countryId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultParams(), []);

  const setDefaultParams = () =>
    setParams({
      search: undefined,
      page: 1,
      size: 10,
      countryId: undefined,
    });

  const useCreate = useCreateProvince();
  const useUpdate = useUpdateProvince();
  const useDelete = useDeleteProvince();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Province;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Province) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Province) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Province) => {
    useUpdate.mutate(
      { ...data, idProvince: actionDialog.id! },
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
      { idProvince: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Province</h1>

      <ProvinceHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        countryValue={params.countryId}
        onChangeCountry={(value) => setParams({ countryId: value, page: 1 })}
        onClear={setDefaultParams}
        onCreate={() => openDialog("create")}
      />

      <ProvinceTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            provinceName: data.provinceName,
            provinceCode: data.provinceCode,
            countryId: data.country.id,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            provinceName: data.provinceName,
            provinceCode: data.provinceCode,
            countryId: data.country.id,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            provinceName: data.provinceName,
            provinceCode: data.provinceCode,
            countryId: data.country.id,
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
        title={`${capitalizeFirstText(actionDialog.action)} Province`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <ProvinceForm
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
