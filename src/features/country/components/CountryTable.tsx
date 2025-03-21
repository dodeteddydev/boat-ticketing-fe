import { ActionButtonGroup } from "../../../components/global/ActionButtonGroup";
import { Table, TBody, Td, Th, THead } from "../../../components/global/Table";
import { CountryResponse } from "../types/countryResponse";

export const CountryTable = ({ data }: { data: CountryResponse[] }) => {
  const emptyData = data?.length < 1;

  return (
    <div className="h-[60%] mt-5 overflow-scroll">
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Country</Th>
          <Th>Code</Th>
          <Th>Action</Th>
        </THead>
        <TBody>
          {emptyData ? (
            <tr>
              <Td colSpan={4} align="center" className="font-bold h-40">
                Data Not Found!
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
