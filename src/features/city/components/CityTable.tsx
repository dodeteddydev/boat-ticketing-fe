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
import { useActiveCity } from "../hooks/useActiveCity";
import { CityResponse } from "../types/cityResponse";
import { ScrollableTableWrapper } from "../../../components/global/ScrollableTableWraper";

type CityTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<CityResponse[]> | undefined;
  onClickDetail?: (data: CityResponse) => void;
  onClickUpdate?: (data: CityResponse & { id: number }) => void;
  onClickDelete?: (data: CityResponse) => void;
};

export const CityTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: CityTableProps) => {
  const dataList: CityResponse[] = data?.data ?? [];
  const dataPaging: Paging = data?.paging ?? {
    currentPage: 1,
    totalPage: 1,
    size: 10,
  };
  const emptyData = dataList.length < 1;

  return (
    <ScrollableTableWrapper maxHeight={"max-h-[400px]"}>
      <Table>
        <THead>
          <Th>No</Th>
          <Th>City</Th>
          <Th>Country</Th>
          <Th>Province</Th>
          <Th className="text-center">Action</Th>
        </THead>
        <TBody>
          {emptyData || isLoading || isError ? (
            <tr>
              <Td colSpan={5} align="center" className="font-bold h-40">
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
                  key={`${value.cityName}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{value.cityName}</Td>
                  <Td>
                    {value.country.countryName} - {value.country.countryCode}
                  </Td>
                  <Td>
                    {value.province.provinceName} -{" "}
                    {value.province.provinceCode}
                  </Td>
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

                    <ToggleCity
                      value={{ id: value.id, active: value.active }}
                    />
                  </Td>
                </tr>
              ))}
            </>
          )}
        </TBody>
      </Table>
    </ScrollableTableWrapper>
  );
};

const ToggleCity = ({ value: { id, active } }: { value: ActiveRequest }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActiveCity();

  const onClickActive = () => {
    const newActiveStatus = !isActive;

    setIsActive(newActiveStatus);

    updateActive.mutate(
      { id, active: newActiveStatus },
      {
        onSuccess: () => setIsActive(newActiveStatus),
        onError: () => setTimeout(() => setIsActive(isActive), 1000),
      }
    );
  };

  return <Toggle key={id} value={isActive} onChange={onClickActive} />;
};
