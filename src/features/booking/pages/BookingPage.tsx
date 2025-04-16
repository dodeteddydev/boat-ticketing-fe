import { useEffect } from "react";
import notFound from "../../../assets/data-not-found.png";
import errorImage from "../../../assets/error.png";
import processing from "../../../assets/processing.png";
import { useParams } from "../../../hooks/useParams";
import { useGetSchedule } from "../../schedule/hooks/useGetSchedule";
import { ScheduleParams } from "../../schedule/types/scheduleParams";
import { FilterSection } from "../components/FilterSection";
import { BookingCardItem } from "./BookingCardItem";
import { ScrollablePaginationWrapper } from "../../../components/global/ScrollablePaginationWraper";
import { PageSizeDropdown } from "../../../components/global/PageSizeDropdown";
import { Pagination } from "../../../components/global/Pagination";

export const BookingPage = () => {
  const [params, setParams] = useParams<ScheduleParams>();

  const { data, isLoading, isError, error } = useGetSchedule(true, {
    page: params.page,
    size: params.size,
    schedule: params.schedule
      ? new Date(params.schedule).toISOString()
      : undefined,
    boatId: params.boatId,
    arrivalId: params.arrivalId,
    departureId: params.departureId,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setDefaultParams(), []);

  const setDefaultParams = () =>
    setParams({
      page: 1,
      size: 10,
      schedule: undefined,
      boatId: undefined,
      arrivalId: undefined,
      departureId: undefined,
    });

  const emptyData = data?.data && data?.data.length < 1;

  return (
    <section>
      <h1 className="font-semibold text-2xl">Schedule</h1>

      <FilterSection
        disabled={isLoading}
        dateValue={params.schedule}
        onChangeDate={(e) =>
          setParams({
            schedule: e.target.value,
            page: 1,
          })
        }
        boatValue={params.boatId}
        onChangeBoat={(value) =>
          setParams({
            boatId: value,
            page: 1,
            arrivalId: undefined,
            departureId: undefined,
          })
        }
        arrivalValue={params.arrivalId}
        onChangeArrival={(value) => setParams({ arrivalId: value, page: 1 })}
        departureValue={params.departureId}
        onChangeDeparture={(value) =>
          setParams({ departureId: value, page: 1, arrivalId: undefined })
        }
        onClear={setDefaultParams}
      />

      {emptyData || isLoading || isError ? (
        <div className="border shadow-lg rounded-lg mt-4 flex flex-col items-center p-4">
          <img
            className="h-32 w-h-32"
            src={isLoading ? processing : isError ? errorImage : notFound}
            alt="processing"
          />
          <p className="text-xl font-semibold">
            {isLoading
              ? "Loading..."
              : isError
              ? error?.response?.data.errors
              : "Data not found!"}
          </p>
        </div>
      ) : (
        <div className="pt-4 overflow-scroll max-h-[330px] sm:max-h-[480px] lg:h-screen">
          {data?.data.map((value, index) => (
            <BookingCardItem key={`${value.id}${index}`} data={value} />
          ))}
        </div>
      )}

      {data?.data && data.data.length > 0 && (
        <ScrollablePaginationWrapper>
          <PageSizeDropdown
            className="mt-4"
            value={{ label: `${params.size}`, value: params.size! }}
            onChange={(data) => setParams({ size: data?.value, page: 1 })}
          />

          <Pagination
            page={params.page ?? 1}
            totalPages={data?.paging.totalPage ?? 1}
            onPageChange={(page) => setParams({ page: page })}
          />
        </ScrollablePaginationWrapper>
      )}
    </section>
  );
};
