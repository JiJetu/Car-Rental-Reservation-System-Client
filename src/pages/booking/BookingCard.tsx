import { Button } from "@/components/ui/button";
import { TCar } from "@/tyeps";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaBolt, FaDroplet } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import BookingCardDetails from "./BookingCardDetails";

type TBookingCardProps = {
  car: TCar;
  handleConfirmBooking: SubmitHandler<FieldValues>;
};

const BookingCard = ({ car, handleConfirmBooking }: TBookingCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div
        onClick={handleOpenModal}
        className="shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg dark:bg-[#0f0f0f] dark:border-[#888] cursor-pointer"
      >
        <div className="relative">
          <img
            src={car.carImage}
            alt={car.name}
            className="rounded-t-lg w-full h-48 object-cover"
          />
        </div>
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{car.name}</h2>
            {car.isDeleted === true && (
              <div className="text-2xl text-red-700 flex items-center gap-2">
                <MdCancel /> Deleted
              </div>
            )}
          </div>
          {car.isElectric ? (
            <div className="mt-2 text-green-600 flex items-center gap-1 text-sm font-medium">
              <FaBolt className="text-yellow-400" /> Electric Vehicle
            </div>
          ) : (
            <div className="mt-2 text-gray-600 flex items-center gap-1 text-sm font-medium">
              <FaDroplet className="text-gray-950" /> Not An Electric Vehicle
            </div>
          )}

          <p className="text-gray-700 dark:text-white mt-2">
            {car.shortDescription}
          </p>
        </div>
        <div className="flex justify-between items-center p-4 pt-0">
          <span className="text-lg font-semibold text-[#00712D]">
            ${car.pricePerHour}/hr
          </span>
        </div>
        <div className="dark:p-4">
          <Button
            className="w-full bg-red-600 text-white dark:rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              handleConfirmBooking(car);
            }}
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Modal for Car Details */}
      <BookingCardDetails
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        car={car}
        handleConfirmBooking={handleConfirmBooking}
      />
    </div>
  );
};

export default BookingCard;
