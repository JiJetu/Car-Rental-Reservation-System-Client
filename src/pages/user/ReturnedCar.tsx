import { Button } from "@/components/ui/button";
import { TBooking } from "@/tyeps";
import { MdReviews } from "react-icons/md";

type TReturnedCarProps = {
  returnedCars: TBooking[];
  handleOpenModal: any;
  setSelectedBookingId: any;
};

const ReturnedCar = ({
  returnedCars,
  handleOpenModal,
  setSelectedBookingId,
}: TReturnedCarProps) => {
  return (
    <table className="table-auto w-full">
      <thead className="bg-gray-200 text-gray-700 font-semibold uppercase text-sm">
        <tr>
          <th className="p-3">#</th>
          <th className="p-3">Car</th>
          <th className="p-3">Pick-Up</th>
          <th className="p-3">Drop-Off</th>
          <th className="p-3">Total Cost</th>
          <th className="p-3">Booking Status</th>
          <th className="p-3">Payment Status</th>
          <th className="p-3">Review</th>
        </tr>
      </thead>
      <tbody>
        {returnedCars?.map((booking: TBooking, index: number) => (
          <tr
            key={booking._id}
            className="text-sm text-gray-700 border-b hover:bg-gray-100"
          >
            <td className="p-4 text-center">{index + 1}</td>
            <td className="p-4 flex items-center gap-3">
              <div className="avatar w-12 h-12 rounded-full overflow-hidden shadow">
                <img
                  src={booking?.car?.carImage}
                  alt={booking?.car?.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-bold text-gray-800">{booking?.car?.name}</p>
                <p className="text-xs text-gray-500">
                  {booking?.car?.location}
                </p>
              </div>
            </td>
            <td className="p-4">
              <p>{booking?.startDate}</p>
              <span className="badge text-xs bg-gray-200 px-2 py-1 mt-1">
                {booking?.startTime}
              </span>
            </td>
            <td className="p-4">
              <>
                <p>{booking?.endDate}</p>
                <span className="badge text-xs bg-gray-200 px-2 py-1 mt-1">
                  {booking?.endTime}
                </span>
              </>
            </td>
            <td className="p-4">
              <p className="text-gray-800 font-semibold">
                $ {booking.totalCost.toFixed(2)}
              </p>
            </td>
            <td className="p-4">
              <p className="text-green-600 font-semibold">Confirmed</p>
            </td>
            <td className="p-4">
              <p className="text-green-600 font-semibold">
                Paid <br />
                {booking.transactionId}
              </p>
            </td>
            <td className="p-4">
              {booking.reviewStatus ? (
                <p className="text-gray-600 font-semibold">Reviewed</p>
              ) : (
                <Button
                  onClick={() => {
                    handleOpenModal();
                    setSelectedBookingId(booking?._id);
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white text-base py-1 px-4 rounded-full shadow"
                >
                  <MdReviews />
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReturnedCar;
