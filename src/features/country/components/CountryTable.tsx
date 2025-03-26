import { useState } from "react";
import notFound from "../../../assets/data-not-found.png";
import error from "../../../assets/error.png";
import processing from "../../../assets/processing.png";
import { ActionButtonGroup } from "../../../components/global/ActionButtonGroup";
import { Table, TBody, Td, Th, THead } from "../../../components/global/Table";
import { Toggle } from "../../../components/global/Toggle";
import { ActiveRequest } from "../../../types/activeRequest";
import {
  Paging,
  SuccessListResponse,
} from "../../../types/successListResponse";
import { useActiveCountry } from "../hooks/useActiveCountry";
import { CountryResponse } from "../types/countryResponse";

type CountryTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<CountryResponse[]> | undefined;
  onClickDetail?: (data: CountryResponse) => void;
  onClickUpdate?: (data: CountryResponse & { id: number }) => void;
  onClickDelete?: (data: CountryResponse) => void;
};

export const CountryTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: CountryTableProps) => {
  const dataList: CountryResponse[] = data?.data ?? [];
  const dataPaging: Paging = data?.paging ?? {
    currentPage: 1,
    totalPage: 1,
    size: 10,
  };
  const emptyData = dataList.length < 1;

  return (
    <div className="max-h-[750px] my-5 overflow-scroll">
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Country</Th>
          <Th>Code</Th>
          <Th className="text-center">Action</Th>
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
              {dataList.map((value, index) => (
                <tr
                  key={`${value.countryCode}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{value.countryName}</Td>
                  <Td>{value.countryCode}</Td>
                  <Td className="flex flex-row justify-center items-center gap-2">
                    <ActionButtonGroup
                      onClickDetail={() =>
                        onClickDetail && onClickDetail(value)
                      }
                      onClickUpdate={() =>
                        onClickUpdate && onClickUpdate(value)
                      }
                      onClickDelete={() =>
                        onClickDelete && onClickDelete(value)
                      }
                    />

                    <ToggleCountry
                      value={{ id: value.id, active: value.active }}
                    />
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

const ToggleCountry = ({ value: { id, active } }: { value: ActiveRequest }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActiveCountry();

  const onClickActive = () => {
    const newActiveStatus = !isActive;

    setIsActive(newActiveStatus);

    updateActive.mutate(
      { id, active: newActiveStatus },
      {
        onSuccess: () => setIsActive(newActiveStatus),
        onError: () => setIsActive(isActive),
      }
    );
  };

  return <Toggle key={id} value={isActive} onChange={onClickActive} />;
};
