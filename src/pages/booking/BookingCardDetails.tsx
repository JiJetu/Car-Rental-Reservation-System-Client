import CustomCheckbox from "@/components/form/CustomCheckbox";
import CustomForm from "@/components/form/CustomForm";
import { Button } from "@/components/ui/button";
import { insuranceOptions } from "@/constant/manageCar";
import { TCar } from "@/tyeps";
import { Descriptions, Modal, Tag } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

type TBookingCardDetailsProps = {
  isModalVisible: boolean;
  handleCloseModal: any;
  car: TCar;
  handleConfirmBooking: SubmitHandler<FieldValues>;
};

const BookingCardDetails = ({
  isModalVisible,
  handleCloseModal,
  car,
  handleConfirmBooking,
}: TBookingCardDetailsProps) => {
  const handleAddAdditionalInsurance: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    handleConfirmBooking(car, data.additionalInsurance);
  };

  return (
    <Modal
      title={<h2 className="text-xl font-bold">{car.name} Details</h2>}
      open={isModalVisible}
      onCancel={(e) => {
        e.stopPropagation();
        handleCloseModal();
      }}
      footer={null}
      width="90%"
      className="rounded-lg px-6"
      styles={{
        body: {
          padding: "24px",
          backgroundColor: "#f8f8f8",
        },
      }}
    >
      <div className="mb-6">
        <img
          src={car.carImage}
          alt={car.name}
          className="w-full h-64 max-h-[400px] object-cover rounded"
        />
      </div>

      <Descriptions
        bordered
        column={{ md: 2 }}
        className="text-sm lg:text-base"
        labelStyle={{ fontWeight: "bold", padding: "12px" }}
        contentStyle={{ padding: "12px", backgroundColor: "white" }}
      >
        <Descriptions.Item label="Price Per Hour">
          ${car.pricePerHour}
        </Descriptions.Item>

        <Descriptions.Item label="Location">{car.location}</Descriptions.Item>

        <Descriptions.Item label="Electric Vehicle">
          {car.isElectric ? (
            <Tag color="green">Yes</Tag>
          ) : (
            <Tag color="red">No</Tag>
          )}
        </Descriptions.Item>

        {/* Ensure Features takes up full width */}
        <Descriptions.Item label="Features" className="col-span-1">
          <ul className="list-disc pl-5">
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </Descriptions.Item>

        {/* Ensure Cancellation Policy takes up full width */}
        <Descriptions.Item label="Cancellation Policy" className="col-span-2">
          <span className="text-green-700">
            Free cancellation within 24 hours. <br /> But after accepting
            booking you cant cancel it.
          </span>
        </Descriptions.Item>
      </Descriptions>

      {/* CustomForm for Additional insurance */}
      <div className="mt-6">
        <h2 className="tmd:text-lg font-bold mb-2 flex items-center">
          Select Additional Insurance:{" "}
          <span className="text-xs font-medium text-gray-600">
            ( Each features will cost $40 extra )
          </span>
        </h2>
        <CustomForm onSubmit={handleAddAdditionalInsurance} resetFrom={false}>
          <CustomCheckbox
            name="additionalInsurance"
            options={insuranceOptions}
          />

          <Button
            onClick={(e) => {
              e.stopPropagation();
            }}
            type="submit"
            className="w-full bg-red-600 text-white dark:rounded-lg hover:bg-red-700"
          >
            Book Now
          </Button>
        </CustomForm>
      </div>
    </Modal>
  );
};

export default BookingCardDetails;
