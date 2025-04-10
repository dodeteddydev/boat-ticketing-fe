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
import { useActivePort } from "../hooks/useActivePort";
import { PortResponse } from "../types/portResponse";
import { ScrollableTableWrapper } from "../../../components/global/ScrollableTableWraper";

type PortTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<PortResponse[]> | undefined;
  onClickDetail?: (data: PortResponse) => void;
  onClickUpdate?: (data: PortResponse & { id: number }) => void;
  onClickDelete?: (data: PortResponse) => void;
};

export const PortTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: PortTableProps) => {
  const dataList: PortResponse[] = data?.data ?? [];
  const dataPaging: Paging = data?.paging ?? {
    currentPage: 1,
    totalPage: 1,
    size: 10,
  };
  const emptyData = dataList.length < 1;

  return (
    <ScrollableTableWrapper maxHeight={"max-h-[380px]"}>
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Port</Th>
          <Th>Code</Th>
          <Th>Country</Th>
          <Th>Province</Th>
          <Th>City</Th>
          <Th className="text-center">Action</Th>
        </THead>
        <TBody>
          {emptyData || isLoading || isError ? (
            <tr>
              <Td colSpan={7} align="center" className="font-bold h-40">
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
                  key={`${value.portName}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{value.portName}</Td>
                  <Td>{value.portCode}</Td>
                  <Td>
                    {value.country.countryName} - {value.country.countryCode}
                  </Td>
                  <Td>
                    {value.province.provinceName} -{" "}
                    {value.province.provinceCode}
                  </Td>
                  <Td>{value.city.cityName}</Td>
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

                    <TogglePort
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

const TogglePort = ({ value: { id, active } }: { value: ActiveRequest }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActivePort();

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
