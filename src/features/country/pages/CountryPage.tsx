import { useEffect } from "react";
import { HeaderSection } from "../../../components/global/HeaderSection";
import { Pagination } from "../../../components/global/Pagination";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { ListParams } from "../../../types/listParams";
import { CountryTable } from "../components/CountryTable";
import { useGetCountry } from "../hooks/useGetCountry";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";

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

  return (
    <section>
      <h1 className="font-semibold text-2xl">Country</h1>

      <HeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ search: e.target.value, page: 1 })}
        onCreate={() => {}}
      />

      <CountryTable
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.response?.status}
        data={data}
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
    </section>
  );
};
