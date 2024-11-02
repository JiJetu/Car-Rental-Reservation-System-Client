import { Button } from "@/components/ui/button";
import { TBooking } from "@/tyeps";
import moment from "moment";

type TPendingCanceledProps = {
  sortedPendingPayments: TBooking[];
  handleCancelBooking: any;
  handleBookingPayment: any;
};

const PendingCanceled = ({
  sortedPendingPayments,
  handleCancelBooking,
  handleBookingPayment,
}: TPendingCanceledProps) => {
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
        </tr>
      </thead>
      <tbody>
        {sortedPendingPayments?.map((booking: TBooking, index: number) => {
          const isWithin24Hours =
            moment().diff(moment(booking.createdAt), "hours") < 24;
          const canCancel = isWithin24Hours && !booking.bookingConfirm;

          return (
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
                  <p className="font-bold text-gray-800">
                    {booking?.car?.name}
                  </p>
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
                {booking?.endDate ? (
                  <>
                    <p>{booking?.endDate}</p>
                    <span className="badge text-xs bg-gray-200 px-2 py-1 mt-1">
                      {booking?.endTime}
                    </span>
                  </>
                ) : (
                  <p className="text-gray-500 italic">
                    Updated after returning car
                  </p>
                )}
              </td>
              <td className="p-4">
                {booking.endTime === null ? (
                  <p className="text-gray-500 italic">Returning car</p>
                ) : (
                  <p className="text-gray-800 font-semibold">
                    $ {booking.totalCost.toFixed(2)}
                  </p>
                )}
              </td>
              <td className="p-4">
                {booking.bookingConfirm ? (
                  <p className="text-green-600 font-semibold">Confirmed</p>
                ) : booking.canceledBooking ? (
                  <p className="text-red-500 font-semibold">Canceled</p>
                ) : canCancel ? (
                  <Button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-500 hover:bg-red-700 text-white text-xs py-1 px-4 rounded-full shadow"
                  >
                    Cancel
                  </Button>
                ) : (
                  <p className="text-yellow-500 font-semibold">Pending</p>
                )}
              </td>
              <td className="p-4">
                {booking.endTime === null ? (
                  <p className="text-yellow-500 font-semibold">Pending</p>
                ) : booking.paymentStatus ? (
                  <p className="text-green-600 font-semibold">
                    Paid <br />
                    {booking.transactionId}
                  </p>
                ) : (
                  <Button
                    onClick={() => handleBookingPayment(booking._id)}
                    className="bg-green-500 hover:bg-green-700 text-white text-xs py-1 px-4 rounded-full shadow"
                  >
                    Pay
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PendingCanceled;
