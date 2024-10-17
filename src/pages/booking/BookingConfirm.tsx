import { Button } from "@/components/ui/button";

type TBookingConfirmationProps = {
  bookingDetails: any; // Define the type according to your needs
};

const BookingConfirm = ({ bookingDetails }: TBookingConfirmationProps) => {
  return (
    <div className="p-6 bg-white dark:bg-[#0e0d0d] rounded dark:shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      <div>
        <p>
          <strong>Car:</strong> {bookingDetails.carName}
        </p>
        <p>
          <strong>Pick-Up Date:</strong> {bookingDetails.pickUpDate}
        </p>
        <p>
          <strong>Drop-Off Date:</strong> {bookingDetails.dropOffDate}
        </p>
        <p>
          <strong>Total Price:</strong> ${bookingDetails.totalPrice}
        </p>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
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
