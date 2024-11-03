import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllReviewsQuery } from "@/redux/features/review/review.api";
import { TReview } from "@/tyeps";
import Loading from "@/components/share/Loading";
import moment from "moment";
import Rating from "@/components/share/Rating";

const Testimonials = () => {
  // fetching all review data with the help of RTK query
  const {
    data: reviewData,
    isFetching,
    isError,
  } = useGetAllReviewsQuery(undefined);

  const reviews = reviewData?.data as TReview[];

  if (isFetching) {
    return <Loading />;
  }

  if (isError || !reviews || reviews.length === 0) {
    return (
      <div className="text-center mt-12 text-lg text-gray-500">
        No reviews available at the moment.
      </div>
    );
  }

  return (
    <div className="mt-12 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Customer Testimonials
      </h2>
      {/* carousol with user review info */}
      <div className="max-w-[85%] md:max-w-full mx-auto">
        <Carousel className="mx-5 md:mx-14">
          <CarouselContent>
            {/* displaying reviews with carousel */}
            {reviews?.map((review) => (
              <CarouselItem key={review?._id} className="flex justify-center">
                <div className="p-4 w-full max-w-2xl min-h-[450px] md:min-h-[400px]">
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
                            | {moment(review?.createdAt).format("MMMM D, YYYY")}
                          </span>
                        </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                        <img
                          className="w-40 h-40 rounded-lg md:rounded-full object-cover"
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
    </div>
  );
};

export default Testimonials;
