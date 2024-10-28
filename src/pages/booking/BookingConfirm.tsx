import { Button } from "@/components/ui/button";
import { useTotalAmount } from "@/hooks/useTotalAmount";
import { TCar } from "@/tyeps";

type TBookingConfirmationProps = {
  bookingDetails: any;
  handleFinalizeBooking: any;
  additionalInsurance: string[];
};

const BookingConfirm = ({
  bookingDetails,
  handleFinalizeBooking,
  additionalInsurance,
}: TBookingConfirmationProps) => {
  const bookingCar = bookingDetails.selectedCar as TCar;

  const { totalCost, taxAmount } = useTotalAmount(
    bookingDetails?.startDate,
    bookingDetails?.startTime,
    bookingDetails?.endDate,
    bookingDetails?.endTime,
    bookingDetails?.additionalFeatures,
    additionalInsurance,
    bookingCar.pricePerHour
  );

  return (
    <div className="p-6 bg-white dark:bg-[#0e0d0d] rounded dark:shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Booking Confirmation {bookingCar.name}
      </h2>
      <div className="md:flex items-center gap-10">
        <div>
          <img
            src={bookingCar?.carImage}
            alt={bookingCar?.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <div>
          <p>
            <strong>Car:</strong> {bookingCar?.name}
          </p>
          <p>
            <strong>Price:</strong> ${bookingCar?.pricePerHour}/hr
          </p>
          <p>
            <strong>Tax:</strong> ${taxAmount.toFixed(2)}
          </p>
          <p>
            <strong>Pick-Up Date:</strong> {bookingDetails?.startDate}
          </p>
          <p>
            <strong>Pick-Up Time:</strong> {bookingDetails?.startTime}
          </p>
          <p>
            <strong>Drop-Off Date:</strong> {bookingDetails?.endDate}
          </p>
          <p>
            <strong>Drop-Off Time:</strong> {bookingDetails?.endTime}
          </p>
        </div>
        <div>
          {bookingDetails?.additionalFeatures?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold flex items-center">
                Additional Features:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-400">
                {bookingDetails?.additionalFeatures?.map(
                  (feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
        <div>
          {additionalInsurance?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold flex items-center">
                Additional Features:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-400">
                {additionalInsurance?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 md:mt-7">
        <strong>Total Price: probably ${totalCost.toFixed(2)}</strong> But this
        is not fixed becaus total cost will count after returning the car.
      </p>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleFinalizeBooking}
          type="button"
          className="bg-[#00712D] text-white hover:bg-[#005A23]"
        >
          Finalize Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirm;
