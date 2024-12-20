import { Alert, Card, Skeleton, Tag } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { CarStatus, TCar, TReview } from "@/tyeps";
import ReactImageMagnifier from "simple-image-magnifier/react";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteFilled,
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
import { useGetSpecificReviewsQuery } from "@/redux/features/review/review.api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import moment from "moment";
import { addToWishList } from "@/redux/features/user/booking.slice";
import Rating from "@/components/share/Rating";

const CarDetails = () => {
  const { id } = useParams();
  const { data: carData, isFetching, isError } = useGetSingleCarQuery(id);
  const {
    data: reviewData,
    isFetching: reviewFetching,
    isError: reviewError,
  } = useGetSpecificReviewsQuery(id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const reviews = reviewData?.data as TReview[];

  if (isFetching || reviewFetching) {
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
    averageRating,
    pricePerHour,
    status,
    description,
    isDeleted,
    carImage,
  } = carData?.data as TCar;

  const filteredAdditionalFeaturesOptions = additionalFeaturesOptions.filter(
    (option) => !features.includes(option.value)
  );

  const handleBookNow: SubmitHandler<FieldValues> = async (data) => {
    const wishListCarInfo = {
      car: carData?.data,
      ...data,
    };

    await dispatch(addToWishList({ wishListCarInfo }));

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
                isDeleted ? (
                  <DeleteFilled />
                ) : status === CarStatus.available ? (
                  <CheckOutlined />
                ) : (
                  <CloseOutlined />
                )
              }
              className="text-lg"
            >
              {isDeleted
                ? "Deleted"
                : status === CarStatus.available
                ? "Available"
                : "Unavailable"}
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

          {/* rating Badge */}
          <div className=" space-x-2 mb-4">
            <Rating color="yellow" rating={averageRating} />
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
              disabled={isDeleted || status === CarStatus.unavailable}
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

      {reviewError || reviews.length === 0 ? (
        <div className="space-y-6">
          <p className="text-gray-500">No reviews available yet.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="max-w-[85%] md:max-w-full mx-auto">
            <Carousel className="mx-5 md:mx-32">
              <CarouselContent>
                {/* displaying reviews with carousel */}
                {reviews?.map((review) => (
                  <CarouselItem
                    key={review?._id}
                    className="flex justify-center"
                  >
                    <div className="w-full max-w-2xl min-h-[450px] md:min-h-[300px]">
                      <Card className="h-full shadow-lg">
                        <CardContent className="dark:bg-[#1a1919] flex flex-col-reverse md:flex-row items-center justify-between h-full p-6">
                          <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6 space-y-4 text-center md:text-start">
                            <h3 className="text-base text-gray-500 dark:text-white">
                              Customer Review
                            </h3>
                            <div className="space-x-2 mb-4 flex justify-center md:justify-start">
                              <Rating color="yellow" rating={review.rating} />
                            </div>
                            <p className="md:text-xl dark:text-white font-semibold">
                              {review?.userReview}
                            </p>
                            <p className="text-base space-x-2 text-gray-500 dark:text-white flex flex-col md:flex-row items-center">
                              <span className="text-3xl">-</span>
                              <span>{review?.user?.name}</span>
                              <span>
                                |{" "}
                                {moment(review?.createdAt).format(
                                  "MMMM D, YYYY"
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="md:w-1/3 flex justify-center">
                            <img
                              className="rounded-lg w-40 h-40 object-cover"
                              src={review?.user?.userImage}
                              alt={review?.user?.name}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default CarDetails;
