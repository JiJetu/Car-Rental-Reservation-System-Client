import { Alert, Checkbox, Skeleton, Tag } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { CarStatus, TCar } from "@/tyeps";
import { useGetSingleCarQuery } from "@/redux/features/admin/carApi";
import ReactImageMagnifier from "simple-image-magnifier/react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import { additionalFeaturesOptions } from "@/constant/manageCar";
// import logo from "../../assets/images/pexels-mikebirdy-244206.jpg";

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData, isFetching, isError } = useGetSingleCarQuery(id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  console.log(selectedFeatures);

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
    pricePerHour,
    status,
    description,
    carImage,
  } = carData?.data as TCar;

  const handleBookNow = () => {
    Swal.fire({
      title: "Book Now",
      text: "Would you like to proceed to the booking page?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/booking/${id}`;
      }
    });
  };

  const handleFeatureChange = (value: string[]) => {
    setSelectedFeatures(value);
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
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              $ {pricePerHour} <span className="text-sm">/ hour</span>
            </p>
          </div>

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

          {/* additional features with Checkbox group */}
          <div className="my-6">
            <h2 className="text-lg font-bold">Select Additional Features:</h2>
            <Checkbox.Group
              options={additionalFeaturesOptions}
              value={selectedFeatures}
              onChange={handleFeatureChange}
              className="w-full mt-4"
            />
          </div>

          <Button
            onClick={handleBookNow}
            className="bg-[#00712D] text-lg px-6 hover:bg-[#005B21] text-white"
          >
            Book Now
          </Button>
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
