import { useState } from "react";
import notFound from "../../../assets/data-not-found.png";
import error from "../../../assets/error.png";
import processing from "../../../assets/processing.png";
import yacht from "../../../assets/yacht.png";
import { ActionButtonGroup } from "../../../components/global/ActionButtonGroup";
import { Table, TBody, Td, Th, THead } from "../../../components/global/Table";
import { Toggle } from "../../../components/global/Toggle";
import { ActiveRequest } from "../../../types/activeRequest";
import {
  Paging,
  SuccessListResponse,
} from "../../../types/successListResponse";
import { useActiveBoat } from "../hooks/useActiveBoat";
import { BoatResponse } from "../types/boatResponse";
import { ScrollableTableWrapper } from "../../../components/global/ScrollableTableWraper";
import { generateImageUrl } from "../../../utilities/generateImageUrl";

type BoatTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<BoatResponse[]> | undefined;
  onClickDetail?: (data: BoatResponse) => void;
  onClickUpdate?: (data: BoatResponse & { id: number }) => void;
  onClickDelete?: (data: BoatResponse) => void;
};

export const BoatTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: BoatTableProps) => {
  const dataList: BoatResponse[] = data?.data ?? [];
  const dataPaging: Paging = data?.paging ?? {
    currentPage: 1,
    totalPage: 1,
    size: 10,
  };
  const emptyData = dataList.length < 1;

  return (
    <ScrollableTableWrapper maxHeight={"max-h-[450px]"}>
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Boat</Th>
          <Th>Code</Th>
          <Th>Country</Th>
          <Th>Image</Th>
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
                  key={`${value.boatCode}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{value.boatName}</Td>
                  <Td>{value.boatCode}</Td>
                  <Td>
                    {value.category.categoryName} -{" "}
                    {value.category.categoryCode}
                  </Td>
                  <Td>
                    <img
                      className="w-16 h-16 object-cover border rounded"
                      src={generateImageUrl(value.image) ?? yacht}
                      alt="BoatImage"
                    />
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

                    <ToggleBoat
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

const ToggleBoat = ({ value: { id, active } }: { value: ActiveRequest }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActiveBoat();

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
