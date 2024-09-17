import CarCard from "@/components/share/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedCars = () => {
  const featuredCars = [
    {
      id: 1,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "SUV X5",
      description: "Luxury SUV with top features for a comfortable drive.",
      price: "$120/day",
    },
    {
      id: 2,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "Sedan A4",
      description: "Sleek sedan with an elegant design and advanced tech.",
      price: "$90/day",
    },
    {
      id: 3,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "Convertible Z4",
      description: "Perfect for a fun weekend with the top down.",
      price: "$150/day",
    },
    {
      id: 1,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "SUV X5",
      description: "Luxury SUV with top features for a comfortable drive.",
      price: "$120/day",
    },
    {
      id: 2,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "Sedan A4",
      description: "Sleek sedan with an elegant design and advanced tech.",
      price: "$90/day",
    },
    {
      id: 3,
      image: "https://carfromjapan.com/wp-content/uploads/2019/03/1-19.jpg",
      name: "Convertible Z4",
      description: "Perfect for a fun weekend with the top down.",
      price: "$150/day",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Cars</h2>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Check out our top picks for your next journey.
        </p>

        <div className="max-w-[85%] md:max-w-full mx-auto">
          <Carousel opts={{ align: "start" }} className="mx-5 md:mx-14">
            {featuredCars.length <= 0 ? (
              <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center">
                <p>No featured cars available. Please add more cars.</p>
              </div>
            ) : (
              <CarouselContent>
                {featuredCars.map((car) => (
                  <CarouselItem
                    key={car.id}
                    className="my-4 md:basis-1/2 lg:basis-1/4 mx-auto"
                  >
                    <CarCard car={car} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}
            {featuredCars.length > 0 && <CarouselPrevious />}
            {featuredCars.length > 0 && <CarouselNext />}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
