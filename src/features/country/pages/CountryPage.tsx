import { HeaderSection } from "../../../components/global/HeaderSection";
import { PageLayout } from "../../../components/global/PageLayout";
import { CountryTable } from "../components/CountryTable";
import { useGetCountry } from "../hooks/useGetCountry";

export const CountryPage = () => {
  const { data, isLoading, isError, error } = useGetCountry();

  return (
    <PageLayout
      isLoading={isLoading}
      isError={isError}
      errorStatus={error?.status}
    >
      <h1 className="font-semibold text-2xl">Country</h1>

      <HeaderSection
        onChangeSearch={(e) => console.log(e.target.value)}
        onCreate={() => {}}
      />

      <CountryTable data={data?.data ?? []} />
    </PageLayout>
  );
};
