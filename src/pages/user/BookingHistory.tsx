import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import {
  useCancelBookingMutation,
  useGetUserBookingQuery,
} from "@/redux/features/user/booking.api";
import { TBooking, TResponse } from "@/tyeps";
import moment from "moment";
import { toast } from "sonner";
import Swal from "sweetalert2";

const BookingHistory = () => {
  const [cancelBooking] = useCancelBookingMutation();
  const {
    data: userBooking,
    isFetching,
    isError,
  } = useGetUserBookingQuery(undefined);

  const bookings = userBooking?.data;

  const handleCancelBooking = async (bookingId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel booking!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Canceling booking....");

        try {
          const res = (await cancelBooking(bookingId)) as TResponse<TBooking>;

          if (res?.error) {
            return toast.error(res?.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }

          toast.success("Booking cancel successfully!", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("something went wrong", { id: toastId, duration: 2000 });
        }
      }
    });
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen">
      {isFetching ? (
        <Loading />
      ) : bookings?.length === 0 || isError ? (
        <div className="bg-white text-lg text-red-600 border border-red-600 font-semibold p-6 text-center rounded-lg shadow-md">
          <p>----- You haven't booked any car yet -----</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
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
              {bookings.map((booking: TBooking, index: number) => {
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
                        <p className="text-green-600 font-semibold">
                          Confirmed
                        </p>
                      ) : booking.canceledByUser ? (
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
                      ) : (
                        <Button className="bg-blue-500 hover:bg-blue-700 text-white text-xs py-1 px-4 rounded-full shadow">
                          Pay
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
