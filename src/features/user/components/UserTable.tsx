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
import { useActiveUser } from "../hooks/useActiveUser";
import { UserResponse } from "../types/userResponse";
import { Role } from "../../../enums/accessed";
import { ScrollableTableWrapper } from "../../../components/global/ScrollableTableWraper";
import { useGlobalContext } from "../../../context/useGlobalContext";

type UserTableProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  data: SuccessListResponse<UserResponse[]> | undefined;
  onClickDetail?: (data: UserResponse) => void;
  onClickUpdate?: (data: UserResponse & { id: number }) => void;
  onClickDelete?: (data: UserResponse) => void;
};

export const UserTable = ({
  data,
  isLoading,
  isError,
  errorStatus,
  onClickDetail,
  onClickUpdate,
  onClickDelete,
}: UserTableProps) => {
  const { profile } = useGlobalContext();
  const dataList: UserResponse[] = data?.data ?? [];
  const dataPaging: Paging = data?.paging ?? {
    currentPage: 1,
    totalPage: 1,
    size: 10,
  };
  const emptyData = dataList.length < 1;

  return (
    <ScrollableTableWrapper>
      <Table>
        <THead>
          <Th>No</Th>
          <Th>Name</Th>
          <Th>Username</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          {profile?.role === "superadmin" && <Th>Status</Th>}
          <Th className="text-center">Action</Th>
        </THead>
        <TBody>
          {emptyData || isLoading || isError ? (
            <tr>
              <Td colSpan={6} align="center" className="font-bold h-40">
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
                  key={`${value.username}${index}`}
                  className="border-b hover:bg-gray-50"
                >
                  <Td>
                    {index + 1 + (dataPaging.currentPage - 1) * dataPaging.size}
                  </Td>
                  <Td>{value.name}</Td>
                  <Td>{value.username}</Td>
                  <Td>{value.email}</Td>
                  <Td>{value.role}</Td>
                  {profile?.role === "superadmin" && <Td>{value.status}</Td>}
                  <Td className="flex flex-row justify-center items-center gap-2">
                    {value.role !== Role.superadmin && (
                      <>
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

                        <ToggleUser
                          value={{ id: value.id, active: value.active }}
                        />
                      </>
                    )}
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

const ToggleUser = ({ value: { id, active } }: { value: ActiveRequest }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const updateActive = useActiveUser();

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
