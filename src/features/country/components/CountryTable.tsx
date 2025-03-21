import { ActionButtonGroup } from "../../../components/global/ActionButtonGroup";
import { Table, TBody, Td, Th, THead } from "../../../components/global/Table";
import { CountryResponse } from "../types/countryResponse";
import processing from "../../../assets/processing.png";
import error from "../../../assets/error.png";
import notFound from "../../../assets/data-not-found.png";

type CountryTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: CountryResponse[];
};

export const CountryTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
}: CountryTableProps) => {
  const emptyData = data?.length < 1;

  return (
    <div className="max-h-[750px] my-5 overflow-scroll">
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Country</Th>
          <Th>Code</Th>
          <Th>Action</Th>
        </THead>
        <TBody>
          {emptyData || isLoading || isError ? (
            <tr>
              <Td colSpan={4} align="center" className="font-bold h-40">
                <img
                  className="h-32 w-h-32"
                  src={isLoading ? processing : isError ? error : notFound}
                  alt="processing"
                />
                <p className="text-xl font-semibold">
                  {isLoading
                    ? "Loading..."
                    : isError
                    ? errorStatus
                    : "Data not found!"}
                </p>
              </Td>
            </tr>
          ) : (
            <>
              {data?.map((value, index) => (
                <tr
                  key={`${value.countryCode}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>{index + 1}</Td>
                  <Td>{value?.countryName}</Td>
                  <Td>{value?.countryCode}</Td>
                  <Td className="ps-3">
                    <ActionButtonGroup />
                  </Td>
                </tr>
              ))}
            </>
          )}
        </TBody>
      </Table>
    </div>
  );
};
