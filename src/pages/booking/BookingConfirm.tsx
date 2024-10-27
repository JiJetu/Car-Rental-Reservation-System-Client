import { Button } from "@/components/ui/button";

type TBookingConfirmationProps = {
  bookingDetails: any;
  handleFinalizeBooking: any;
  additionalFeatures: string[];
};

const BookingConfirm = ({
  bookingDetails,
  handleFinalizeBooking,
  additionalFeatures,
}: TBookingConfirmationProps) => {
  const bookingCar = bookingDetails.selectedCar;

  console.log(additionalFeatures);

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
            <strong>Pick-Up Date:</strong> {bookingDetails?.pickUpDate}
          </p>
          <p>
            <strong>Pick-Up Time:</strong> {bookingDetails?.startTime}
          </p>
          <p>
            <strong>Total Price:</strong> After returning the car total price
            will be showed
          </p>
        </div>
        <div>
          {additionalFeatures?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold flex items-center">
                Additional Features:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-400">
                {additionalFeatures?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

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
