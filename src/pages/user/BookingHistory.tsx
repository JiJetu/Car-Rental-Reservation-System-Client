import Loading from "@/components/share/Loading";
import { Button } from "@/components/ui/button";
import { useGetUserBookingQuery } from "@/redux/features/user/booking.api";

const BookingHistory = () => {
  const {
    data: userBooking,
    isFetching,
    isError,
  } = useGetUserBookingQuery(undefined);

  const bookings = userBooking?.data;

  console.log(userBooking);

  return (
    <div>
      {isFetching ? (
        <Loading />
      ) : bookings?.length === 0 || isError ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>-----You don't book any car yet-----</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Car</th>
                <th>Pick-Up</th>
                <th>Drop-Off</th>
                <th>Total Cost</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index: number) => (
                <tr key={booking._id}>
                  <td>
                    <p>{index + 1}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={booking?.car?.carImage}
                            alt={booking?.car?.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{booking?.car?.name}</div>
                        <div className="text-sm opacity-50">
                          {booking?.car?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {booking?.date}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {booking?.startTime}
                    </span>
                  </td>
                  {booking.endTime === null ? (
                    <td>Updated after returning car</td>
                  ) : (
                    <td>
                      {booking?.date}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {booking?.endTime}
                      </span>
                    </td>
                  )}
                  <td>
                    {booking.endTime === null ? (
                      <p>Return car</p>
                    ) : (
                      <p>$ {booking.totalCost.toFixed(2)}</p>
                    )}
                  </td>

                  <td>
                    {booking.endTime === null ? (
                      <p>Pending</p>
                    ) : (
                      <Button className="bg-red-600 hover:bg-red-800 text-sm px-3 py-1">
                        Pay
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
