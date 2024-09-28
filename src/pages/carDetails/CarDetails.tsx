import { Button, Checkbox, Skeleton, Tag } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TCar } from "@/tyeps";
import { useGetSingleCarQuery } from "@/redux/features/admin/carApi";
import ReactImageMagnifier from "simple-image-magnifier/react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData, isFetching } = useGetSingleCarQuery(id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  console.log(selectedFeatures);

  if (isFetching) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton active paragraph={{ rows: 8 }} />
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

  return (
    <div className="container mx-auto p-6 space-y-10">
      {/* car Image with magnifier */}
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="w-full md:w-1/2">
          <ReactImageMagnifier
            srcPreview={carImage}
            srcOriginal={carImage}
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>

        {/* car info */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-8">
          <h1 className="text-3xl font-extrabold text-gray-900">{name}</h1>
          <div className="flex items-center space-x-3 my-4">
            <Tag
              color={status === "available" ? "green" : "red"}
              icon={
                status === "available" ? <CheckOutlined /> : <CloseOutlined />
              }
              className="text-lg"
            >
              {status === "available" ? "Available" : "Unavailable"}
            </Tag>
            <p className="text-lg font-semibold text-gray-600">
              $ {pricePerHour} <span className="text-sm">/ hour</span>
            </p>
          </div>

          <p className="text-2xl font-bold mb-4">{shortDescription}</p>

          {/* car features */}
          <h2 className="text-lg font-bold text-gray-900 mb-3">Features:</h2>
          <ul className="list-disc list-inside space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-base text-gray-600">
                {feature}
              </li>
            ))}
          </ul>

          {/* additional features */}
          <div className="my-6">
            <h2 className="text-lg font-bold text-gray-900">
              Select Additional Features:
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {["Insurance", "GPS", "Child Seat"].map((feature) => (
                <Checkbox
                  key={feature}
                  value={feature.toLowerCase()}
                  onChange={(e) =>
                    setSelectedFeatures((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((f) => f !== e.target.value)
                    )
                  }
                  className="text-base"
                >
                  {feature}
                </Checkbox>
              ))}
            </div>
          </div>

          <Button
            onClick={handleBookNow}
            className="bg-[#0ccaab] w-full md:w-auto py-2 px-6 text-lg font-semibold text-white rounded-lg shadow-lg hover:bg-gradient-to-r from-cyan-500 to-yellow-500"
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* car description */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Car Description</h2>
        <p className="text-gray-600">{description}</p>
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
