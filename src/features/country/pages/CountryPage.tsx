import { useEffect } from "react";
import { HeaderSection } from "../../../components/global/HeaderSection";
import { PageLayout } from "../../../components/global/PageLayout";
import { Pagination } from "../../../components/global/Pagination";
import { SelectField } from "../../../components/global/SelectField";
import { useDebounce } from "../../../hooks/useDebounce";
import { useParams } from "../../../hooks/useParams";
import { ListParams } from "../../../types/listParams";
import { CountryTable } from "../components/CountryTable";
import { useGetCountry } from "../hooks/useGetCountry";

export const CountryPage = () => {
  const [params, setParams] = useParams<ListParams>();
  const debouncedSearch = useDebounce(params.search, 500);

  const { data, isLoading, isError, error } = useGetCountry(true, {
    search: debouncedSearch,
    page: params.page,
    size: params.size,
  });

  useEffect(
    () =>
      setParams({
        page: 1,
        size: 10,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="h-full flex flex-col">
      <h1 className="font-semibold text-2xl">Country</h1>

      <HeaderSection
        searchValue={params.search}
        onChangeSearch={(e) => setParams({ ...params, search: e.target.value })}
        onCreate={() => {}}
      />

      <PageLayout
        isLoading={isLoading}
        isError={isError}
        errorStatus={error?.status}
      >
        <CountryTable data={data?.data ?? []} />

        <div className="flex flex-row justify-between">
          <SelectField className="max-w-48" placeholder="Size" />

          <Pagination
            totalPages={10}
            onPageChange={(page) => console.log("Current Page:", page)}
          />
        </div>
      </PageLayout>
    </div>
  );
};
