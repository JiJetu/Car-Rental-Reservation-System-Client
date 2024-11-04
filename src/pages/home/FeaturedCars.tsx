import CarCard from "@/components/share/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { TCar } from "@/tyeps/car.types";

const FeaturedCars = () => {
  // fetching all car data with the help of RTK query
  const { data: carsData, isError } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: 1 },
    { name: "isDeleted", value: false },
  ]);
  const cars = carsData?.data;

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Cars</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8 dark:text-white">
          Check out our top picks for your next journey.
        </p>

        {/* showing car data with carousel  */}
        <div className="max-w-[85%] md:max-w-full mx-auto">
          <Carousel opts={{ align: "start" }} className="mx-5 md:mx-14">
            {(cars && cars.length > 0) || isError ? (
              <CarouselContent>
                {cars?.map((car: TCar) => (
                  <CarouselItem
                    key={car._id}
                    className="my-4 md:basis-1/2 lg:basis-1/4 mx-auto"
                  >
                    <CarCard showRating={false} car={car} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            ) : (
              <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
                <p>No featured cars available.</p>
              </div>
            )}
            {cars && cars.length > 0 && <CarouselPrevious />}
            {cars && cars.length > 0 && <CarouselNext />}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
