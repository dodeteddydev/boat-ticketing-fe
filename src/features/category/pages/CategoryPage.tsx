import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Dialog } from "../../../components/global/Dialog";
import { CategoryHeaderSection } from "../components/CategoryHeaderSection";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { Action } from "../../../types/action";
import { ListParams } from "../../../types/listParams";
import { capitalizeFirstText } from "../../../utilities/capitalizeFirstText";
import { CategoryTable } from "../components/CategoryTable";
import { DeleteBodyDialog } from "../../../components/global/DeleteBodyDialog";
import { CategoryForm } from "../components/CategoryForm";
import { useCreateCategory } from "../hooks/useCreateCategory";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { useGetCategory } from "../hooks/useGetCategory";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { Category } from "../schemas/categorySchema";
import { ScrollablePaginationWrapper } from "../../../components/global/ScrollablePaginationWraper";

export const CategoryPage = () => {
  const [params, setParams] = useParams<ListParams>();
  const search = useDebounce(params.search, 500);

  const { data, isLoading, isError, error, refetch } = useGetCategory(true, {
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

  const useCreate = useCreateCategory();
  const useUpdate = useUpdateCategory();
  const useDelete = useDeleteCategory();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [actionDialog, setActionDialog] = useState<{
    action: Action;
    id?: number;
    data?: Category;
  }>({ action: "none" });

  const openDialog = (action: Action, id?: number, data?: Category) => {
    setActionDialog({ action, id, data });
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    setActionDialog({ action: "none" });
    if (dialogRef.current) dialogRef.current.close();
  };

  const onCreate = (data: Category) => {
    useCreate.mutate(data, {
      onSuccess: (response) => {
        closeDialog();
        refetch();
        toast.success(response.message);
      },
      onError: (error) => toast.error(error?.response?.data.errors as string),
    });
  };

  const onUpdate = (data: Category) => {
    useUpdate.mutate(
      { ...data, idCategory: actionDialog.id! },
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
      { idCategory: actionDialog.id! },
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
      <h1 className="font-semibold text-2xl">Category</h1>

      <CategoryHeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        onCreate={() => openDialog("create")}
      />

      <CategoryTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
        onClickDetail={(data) =>
          openDialog("detail", data.id, {
            categoryName: data.categoryName,
            categoryCode: data.categoryCode,
          })
        }
        onClickUpdate={(data) =>
          openDialog("update", data.id, {
            categoryName: data.categoryName,
            categoryCode: data.categoryCode,
          })
        }
        onClickDelete={(data) =>
          openDialog("delete", data.id, {
            categoryName: data.categoryName,
            categoryCode: data.categoryCode,
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
        title={`${capitalizeFirstText(actionDialog.action)} Category`}
        onClose={closeDialog}
      >
        {(actionDialog.action === "create" ||
          actionDialog.action === "update" ||
          actionDialog.action === "detail") && (
          <CategoryForm
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
