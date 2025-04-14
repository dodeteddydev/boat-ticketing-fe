import { useState } from "react";
import notFound from "../../../assets/data-not-found.png";
import error from "../../../assets/error.png";
import processing from "../../../assets/processing.png";
import { ActionButtonGroup } from "../../../components/global/ActionButtonGroup";
import { ScrollableTableWrapper } from "../../../components/global/ScrollableTableWraper";
import { Table, TBody, Td, Th, THead } from "../../../components/global/Table";
import { Toggle } from "../../../components/global/Toggle";
import { ActiveRequest } from "../../../types/activeRequest";
import {
  Paging,
  SuccessListResponse,
} from "../../../types/successListResponse";
import { useActiveSchedule } from "../hooks/useActiveSchedule";
import { ScheduleResponse } from "../types/scheduleResponse";
import { formatDateForTable } from "../../../utilities/formatDate";
import { useGlobalContext } from "../../../context/useGlobalContext";

type ScheduleTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<ScheduleResponse[]> | undefined;
  onClickDetail?: (data: ScheduleResponse) => void;
  onClickUpdate?: (data: ScheduleResponse & { id: number }) => void;
  onClickDelete?: (data: ScheduleResponse) => void;
};

export const ScheduleTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: ScheduleTableProps) => {
  const { profile } = useGlobalContext();
  const dataList: ScheduleResponse[] = data?.data ?? [];
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
          <Th>Schedule</Th>
          <Th>Seat</Th>
          <Th>Boat</Th>
          <Th>Departure</Th>
          <Th>Arrival</Th>
          <Th>Price</Th>
          <Th className="text-center">Action</Th>
        </THead>
        <TBody>
          {emptyData || isLoading || isError ? (
            <tr>
              <Td colSpan={8} align="center" className="font-bold h-40">
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
                  key={`${value.schedule}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{formatDateForTable(value.schedule)}</Td>
                  <Td>{value.seat}</Td>
                  <Td>
                    {value.boat.boatName} - {value.boat.boatCode}
                  </Td>
                  <Td>
                    {value.departure.portName} - {value.departure.portCode}
                  </Td>
                  <Td>
                    {value.arrival.portName} - {value.arrival.portCode}
                  </Td>
                  <Td>
                    <div>
                      <p>{value.price}</p>

                      {profile?.role === "superadmin" && (
                        <p>
                          Markup Price : <span>{value.markupPrice}</span>
                        </p>
                      )}
                    </div>
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

                    <ToggleSchedule
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

const ToggleSchedule = ({
  value: { id, active },
}: {
  value: ActiveRequest;
}) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActiveSchedule();

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
