import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import image from "../../assets/images/preview (1).png";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  // reviews components
  const reviews = [
    {
      id: 1,
      image: image,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim dolore neque ullam recusandae fuga fugiat!",
      name: "Mr. X",
      date: "JUN 2024",
    },
    {
      id: 2,
      image: image,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim dolore neque ullam recusandae fuga fugiat!",
      name: "Mr. Y",
      date: "JUN 2024",
    },
    {
      id: 3,
      image: image,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim dolore neque ullam recusandae fuga fugiat!",
      name: "Mrs. Z",
      date: "JUN 2024",
    },
    {
      id: 4,
      image: image,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim dolore neque ullam recusandae fuga fugiat!",
      name: "Mr. A",
      date: "JUN 2024",
    },
    {
      id: 5,
      image: image,
      review:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, enim dolore neque ullam recusandae fuga fugiat!",
      name: "Mrs. B",
      date: "JUN 2024",
    },
  ];

  return (
    <div className="mt-12 container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Customer Testimonials
      </h2>
      <div className="max-w-[85%] md:max-w-full mx-auto">
        <Carousel className="mx-5 md:mx-14">
          <CarouselContent>
            {/* displaying reviews with carousel */}
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="flex justify-center">
                <div className="p-4 w-full max-w-2xl min-h-[450px] md:min-h-[400px]">
                  <Card className="h-full shadow-lg">
                    <CardContent className="dark:bg-[#1a1919] flex flex-col-reverse md:flex-row items-center justify-between h-full p-6">
                      <div className="md:w-2/3 mb-6 md:mb-0 md:mr-6 space-y-4">
                        <h3 className="text-base text-gray-500 dark:text-white">
                          Customer Review
                        </h3>
                        <p className="md:text-xl dark:text-white font-semibold">
                          {review.review}
                        </p>
                        <p className="text-base space-x-2 text-gray-500 dark:text-white flex items-center">
                          <span className="text-3xl">-</span>
                          <span>{review.name}</span> |<span>{review.date}</span>
                        </p>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                        <img
                          className="rounded-lg w-40 h-40 object-cover"
                          src={review.image}
                          alt={review.name}
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
