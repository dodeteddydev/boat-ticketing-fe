import { generateImageUrl } from "../../../utilities/generateImageUrl";
import yacht from "../../../assets/yacht.png";
import { ScheduleResponse } from "../../schedule/types/scheduleResponse";
import { Button } from "../../../components/global/Button";
import { formatDateForTable } from "../../../utilities/formatDate";

type BookingCardItemProps = {
  data: ScheduleResponse;
  onClick: () => void;
};

export const BookingCardItem = ({ data, onClick }: BookingCardItemProps) => {
  return (
    <div className="border shadow-lg rounded-lg p-4 my-2 flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
      <div className="flex flex-row justify-evenly lg:justify-start">
        <img
          className="w-28 h-24 sm:w-48 sm:h-32 object-cover border rounded"
          src={generateImageUrl(data.boat.image) ?? yacht}
          alt="BoatImage"
        />

        <div className="ms-4 flex flex-col">
          <div className="flex-1">
            <p className="text-xl font-bold">{data.boat.boatName}</p>
            <p>{data.boat.boatCode}</p>
          </div>
          <div>
            <p>
              {data.seat} <b>Seat</b>
            </p>
            <p>{formatDateForTable(data.schedule)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-evenly lg:flex-col">
        <div className="lg:flex-1">
          <p className="font-bold">Departure :</p>
          <p>
            {data.departure.portName}-{data.departure.portCode}
          </p>
        </div>
        <div>
          <p className="font-bold">Arrival :</p>
          <p>
            {data.arrival.portName}-{data.arrival.portCode}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-end lg:w-40">
        <p className="mb-5 text-xl font-bold text-center lg:text-start">
          Rp. {data.price + data.markupPrice}
        </p>
        <Button text="Book" onClick={onClick} />
      </div>
    </div>
  );
};
