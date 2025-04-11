import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DeleteBodyDialog } from "../../../components/global/DeleteBodyDialog";
import { Dialog } from "../../../components/global/Dialog";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { ScrollablePaginationWrapper } from "../../../components/global/ScrollablePaginationWraper";
import { useParams } from "../../../hooks/useParams";
import { Action } from "../../../types/action";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { ScheduleForm } from "../components/ScheduleForm";
import { ScheduleHeaderSection } from "../components/ScheduleHeaderSection";
import { ScheduleTable } from "../components/ScheduleTable";
import { useCreateSchedule } from "../hooks/useCreateSchedule";
import { useDeleteSchedule } from "../hooks/useDeleteSchedule";
import { useGetSchedule } from "../hooks/useGetSchedule";
import { useUpdateSchedule } from "../hooks/useUpdateSchedule";
import { Schedule } from "../schemas/scheduleSchema";
import { ScheduleParams } from "../types/scheduleParams";

export const SchedulePage = () => {
  const [params, setParams] = useParams<ScheduleParams>();

  const { data, isLoading, isError, error, refetch } = useGetSchedule(true, {
    page: params.page,
    size: params.size,
    boatId: params.boatId,
    arrivalId: params.arrivalId,
    departureId: params.departureId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultParams(), []);

  const setDefaultParams = () =>
    setParams({
      page: 1,
      size: 10,
      boatId: undefined,
      arrivalId: undefined,
      departureId: undefined,
    });

  const useCreate = useCreateSchedule();
  const useUpdate = useUpdateSchedule();
  const useDelete = useDeleteSchedule();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Schedule;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Schedule) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Schedule) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Schedule) => {
    useUpdate.mutate(
      { ...data, idSchedule: actionDialog.id! },
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
      { idSchedule: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Schedule</h1>

      <ScheduleHeaderSection
        // searchValue={params.search}
        // onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        countryValue={params.boatId}
        onChangeCountry={(value) =>
          setParams({
            boatId: value,
            page: 1,
            arrivalId: undefined,
            departureId: undefined,
          })
        }
        provinceValue={params.arrivalId}
        onChangeProvince={(value) =>
          setParams({ arrivalId: value, page: 1, departureId: undefined })
        }
        cityValue={params.departureId}
        onChangeCity={(value) => setParams({ departureId: value, page: 1 })}
        onClear={setDefaultParams}
        onCreate={() => openDialog("create")}
      />

      <ScheduleTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            schedule: data.schedule,
            seat: data.seat,
            price: data.price,
            markupPrice: data.markupPrice,
            boatId: data.boat.id,
            arrivalId: data.arrival.id,
            departureId: data.departure.id,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            schedule: data.schedule,
            seat: data.seat,
            price: data.price,
            markupPrice: data.markupPrice,
            boatId: data.boat.id,
            arrivalId: data.arrival.id,
            departureId: data.departure.id,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            schedule: data.schedule,
            seat: data.seat,
            price: data.price,
            markupPrice: data.markupPrice,
            boatId: data.boat.id,
            arrivalId: data.arrival.id,
            departureId: data.departure.id,
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
        title={`${capitalizeFirstText(actionDialog.action)} Schedule`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <ScheduleForm
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
