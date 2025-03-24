import { useEffect, useRef, useState } from "react";
import { Dialog } from "../../../components/global/Dialog";
import { HeaderSection } from "../../../components/global/HeaderSection";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { ListParams } from "../../../types/listParams";
import { CountryTable } from "../components/CountryTable";
import { useGetCountry } from "../hooks/useGetCountry";
import { Action } from "../../../types/action";
import { Button } from "../../../components/global/Button";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";

export const CountryPage = () => {
  const [params, setParams] = useParams<ListParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error } = useGetCountry(true, {
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

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<Action>("none");

  const openDialog = (action: Action) => {
    setActionDialog(action);
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog("none");
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <section>
      <h1 className="font-semibold text-2xl">Country</h1>

      <HeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        onCreate={() => openDialog("create")}
      />

      <CountryTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={() => openDialog("detail")}
        onClickUpdate={() => openDialog("update")}
        onClickDelete={() => openDialog("delete")}
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
        title={`${capitalizeFirstText(actionDialog)} Country`}
        onClose={closeDialog}
      >
        <div className="p-4 border-y">{actionDialog.toUpperCase()}</div>

        {actionDialog !== "detail" && (
          <div className="flex p-2 gap-2">
            <Button
              text="Cancel"
              className="bg-gray-300 text-gray-500"
              onClick={closeDialog}
            />
            <Button
              className={
                actionDialog === "update"
                  ? "bg-amber-500"
                  : actionDialog === "delete"
                  ? "bg-red-500"
                  : undefined
              }
              text={`${capitalizeFirstText(actionDialog)}`}
            />
          </div>
        )}
      </Dialog>
    </section>
  );
};
