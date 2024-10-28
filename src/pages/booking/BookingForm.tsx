import CustomCheckbox from "@/components/form/CustomCheckbox";
import CustomDate from "@/components/form/CustomDate";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomTime from "@/components/form/CustomTime";
import { Button } from "@/components/ui/button";
import { additionalFeaturesOptions } from "@/constant/manageCar";
import { useTodayAndMinEndDate } from "@/hooks/useFormTodayEndDay";
import { bookingFormSchema } from "@/schemas/bookingFormSchema";
import { TCar } from "@/tyeps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { FaBolt, FaDroplet } from "react-icons/fa6";

type TBookingFormProps = {
  selectedCar: TCar;
  additionalInsurance: string[];
  onBookingSubmit: SubmitHandler<FieldValues>;
};

const BookingForm = ({
  selectedCar,
  onBookingSubmit,
  additionalInsurance,
}: TBookingFormProps) => {
  const { today, minEndDate } = useTodayAndMinEndDate(1);

  const filteredAdditionalFeaturesOptions = additionalFeaturesOptions.filter(
    (option) => !selectedCar.features.includes(option.value)
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Side: Booking Form */}
      <div className="flex-1">
        <div className="p-6 bg-white dark:bg-[#0e0d0d] rounded dark:shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            Book Your Car: {selectedCar.name}
          </h2>
          <CustomForm
            onSubmit={onBookingSubmit}
            resolver={zodResolver(bookingFormSchema)}
          >
            <CustomInput
              type="text"
              name="nidOrPassport"
              label="NID/Passport"
            />
            <CustomInput
              type="text"
              name="drivingLicense"
              label="Driving License"
            />
            <Row gutter={16}>
              <Col span={24} md={{ span: 4 }}>
                <CustomTime
                  name="startTime"
                  label="Pick-Up Time"
                  placeholderText="Time"
                  rules={{ required: "Pick-up time is required" }}
                />
              </Col>
              <Col span={24} md={{ span: 8 }}>
                <CustomDate
                  label="Pick-Up Date"
                  minDate={today}
                  name="startDate"
                />
              </Col>

              <Col span={24} md={{ span: 8 }}>
                <CustomDate
                  label="Pick-Off Date"
                  minDate={minEndDate}
                  name="endDate"
                />
              </Col>
              <Col span={24} md={{ span: 4 }}>
                <CustomTime
                  name="endTime"
                  label="Pick-Up Time"
                  placeholderText="Time"
                  rules={{ required: "Pick-up time is required" }}
                />
              </Col>
            </Row>

            <div>
              <h1 className="dark:text-white">
                After returning car <strong>payment</strong> option will be
                showed
              </h1>
            </div>

            <h2 className="text-lg font-bold my-2 flex items-center dark:text-white">
              Select Additional Features:{" "}
              <span className="text-xs font-medium text-gray-600">
                ( Each features will cost $20 extra )
              </span>
            </h2>
            <CustomCheckbox
              name="additionalFeatures"
              options={filteredAdditionalFeaturesOptions}
            />

            <div className="mt-6 flex">
              <Button
                type="submit"
                className="w-full py-5 bg-[#00712D] text-white hover:bg-[#005A23]"
              >
                Confirm Booking
              </Button>
            </div>
          </CustomForm>
        </div>
      </div>

      {/* Right Side: Car Details */}
      <div className="flex-1 md:max-w-xs lg:max-w-md bg-white dark:bg-[#1a1a1a] dark:shadow-lg rounded-lg p-4">
        <div className="text-center mb-4">
          <img
            src={selectedCar.carImage}
            alt={selectedCar.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{selectedCar.name}</h2>

          {/* Car Price and Tax */}
          <p className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <span>Price:</span>
            <span className="flex-1 mx-2 h-px bg-gray-400 dark:bg-gray-600"></span>
            <span>${selectedCar.pricePerHour}/hr</span>
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
            <span>Tax: </span>
            <span className="flex-1 mx-2 h-px bg-gray-400 dark:bg-gray-600"></span>
            <strong>10% on total</strong>
          </p>

          {/* Electric Vehicle Status */}
          <div className="mt-3">
            {selectedCar.isElectric ? (
              <div className="flex items-center gap-1 text-green-600">
                <FaBolt className="text-yellow-400" /> Electric Vehicle
              </div>
            ) : (
              <div className="flex items-center gap-1 text-gray-600">
                <FaDroplet className="text-gray-950" /> Not Electric
              </div>
            )}
          </div>

          {/* Location */}
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Location: {selectedCar.location}
          </p>

          {/* Features */}
          <div className="mt-2">
            <h3 className="font-semibold">Features:</h3>
            <ul className="list-disc pl-5 text-sm text-gray-800 dark:text-gray-400">
              {selectedCar?.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Additional insurance */}
          {additionalInsurance?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold flex items-center">
                <span>
                  Additional Insurance: ({additionalInsurance?.length} * $40)
                </span>
                <span className="flex-1 mx-2 h-px bg-gray-400 dark:bg-gray-600"></span>
                <span>{additionalInsurance?.length * 40} </span>
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
    </div>
  );
};

export default BookingForm;
