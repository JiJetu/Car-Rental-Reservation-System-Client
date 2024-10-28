import { Alert, Skeleton, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CarStatus, TCar } from "@/tyeps";
import ReactImageMagnifier from "simple-image-magnifier/react";
import {
  CheckOutlined,
  CloseOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import {
  additionalFeaturesOptions,
  insuranceOptions,
} from "@/constant/manageCar";
import CustomForm from "@/components/form/CustomForm";
import CustomCheckbox from "@/components/form/CustomCheckbox";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { useGetSingleCarQuery } from "@/redux/features/admin/carApi";
import { FaBolt } from "react-icons/fa6";

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData, isFetching, isError } = useGetSingleCarQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isFetching) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (isError || !carData) {
    return (
      <div className="container mx-auto p-4">
        <Alert
          message="Error"
          description="Unable to load car details. Something went wrong"
          type="error"
          showIcon
        />
      </div>
    );
  }

  const {
    name,
    features,
    shortDescription,
    location,
    isElectric,
    pricePerHour,
    status,
    description,
    carImage,
  } = carData?.data as TCar;

  const filteredAdditionalFeaturesOptions = additionalFeaturesOptions.filter(
    (option) => !features.includes(option.value)
  );

  const handleBookNow: SubmitHandler<FieldValues> = (data) => {
    const bookingData = {
      bookingInfo: {
        additionalFeatures: data.additionalFeatures || [],
      },
    };

    console.log(data);

    // const res = dispatch(setBookingInfo(bookingData));
    // console.log(res);
    navigate(`/booking`);
  };

  return (
    <div className="container mx-auto p-6 space-y-10">
      {/* car Image with magnifier */}
      <div className="md:flex justify-between items-center">
        <div className="w-full md:w-3/5 h-auto">
          <ReactImageMagnifier
            srcPreview={carImage}
            srcOriginal={carImage}
            width={`100%`}
            height={`100%`}
            key={id}
            className="rounded-lg shadow-lg "
          />
        </div>

        {/* car info */}
        <div className="w-full md:w-2/5 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-extrabold">{name}</h1>

          <div className="flex items-center space-x-3 my-4">
            <Tag
              color={status === CarStatus.available ? "green" : "red"}
              icon={
                status === CarStatus.available ? (
                  <CheckOutlined />
                ) : (
                  <CloseOutlined />
                )
              }
              className="text-lg"
            >
              {status === CarStatus.available ? "Available" : "Unavailable"}
            </Tag>

            {/* Price */}
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              $ {pricePerHour} <span className="text-sm">/ hour</span>
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center text-lg text-gray-600 dark:text-gray-300 space-x-2 mb-4">
            <EnvironmentOutlined /> <span>{location}</span>
          </div>

          {/* Electric Badge */}
          {isElectric && (
            <div className="flex items-center space-x-2 mb-4 text-lg text-green-600">
              <FaBolt className="text-yellow-400" />{" "}
              <span>Electric Vehicle</span>
            </div>
          )}

          <p className="text-2xl font-bold mb-4">{shortDescription}</p>

          {/* car features */}
          <h2 className="text-lg font-bold mb-3">Features:</h2>
          <ul className="list-disc list-inside space-y-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-base text-gray-600 dark:text-gray-300"
              >
                {feature}
              </li>
            ))}
          </ul>

          <CustomForm onSubmit={handleBookNow} resetFrom={false}>
            {/* additional features with Checkbox group */}
            <h2 className="text-lg font-bold mt-6 mb-2 flex items-center">
              Select Additional Features:{" "}
              <span className="text-xs font-medium text-gray-600">
                ( Each features will cost $20 extra )
              </span>
            </h2>
            <CustomCheckbox
              name="additionalFeatures"
              options={filteredAdditionalFeaturesOptions}
            />
            <h2 className="text-lg font-bold mb-2 flex items-center">
              Select Additional Insurance:{" "}
              <span className="text-xs font-medium text-gray-600">
                ( Each insurance will cost $40 extra )
              </span>
            </h2>
            <CustomCheckbox
              name="additionalInsurance"
              options={insuranceOptions}
            />

            <Button
              type="submit"
              className="bg-[#00712D] text-lg px-6 hover:bg-[#005B21] text-white"
            >
              Book Now
            </Button>
          </CustomForm>
        </div>
      </div>

      {/* car description */}
      <div className="bg-gray-100 dark:bg-[#1a1919] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Car Description</h2>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      {/* customer reviews */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <p className="text-gray-500">No reviews available yet.</p>
      </div>
    </div>
  );
};

export default CarDetails;
