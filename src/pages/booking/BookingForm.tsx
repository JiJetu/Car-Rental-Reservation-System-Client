import CustomDate from "@/components/form/CustomDate";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import { Button } from "@/components/ui/button";
import { TCar } from "@/tyeps";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TBookingFormProps = {
  selectedCar: TCar;
  onBookingSubmit: SubmitHandler<FieldValues>;
};

const BookingForm = ({ selectedCar, onBookingSubmit }: TBookingFormProps) => {
  return (
    <div className="p-6 bg-white dark:bg-[#0e0d0d] rounded dark:shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        Book Your Car: {selectedCar.name}
      </h2>
      <CustomForm onSubmit={onBookingSubmit}>
        <CustomInput type="text" name="nidOrPassport" label="NID/Passport" />
        <CustomInput
          type="text"
          name="drivingLicense"
          label="Driving License"
        />
        <CustomDate label="Pick-Up Date" name="pickUpDate" />
        <CustomDate label="Drop-Off Date" name="dropOffDate" />

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            className="bg-[#00712D] text-white hover:bg-[#005A23]"
          >
            Confirm Booking
          </Button>
        </div>
      </CustomForm>
    </div>
  );
};

export default BookingForm;
