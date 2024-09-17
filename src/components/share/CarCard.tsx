import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type TCar = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
};

type TCarProps = {
  car: TCar;
};

const CarCard = ({ car }: TCarProps) => {
  return (
    <div className="p-1 flex flex-col h-full">
      <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
        <CardHeader>
          <img
            src={car.image}
            alt={car.name}
            className="rounded-t-lg w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-2 flex-grow">
          <CardTitle className="text-xl font-semibold">{car.name}</CardTitle>
          <p className="text-gray-600 mt-2">{car.description}</p>
        </CardContent>
        <CardFooter className="md:flex justify-between items-center">
          <span className="text-lg font-bold">{car.price}</span>
          <button className="px-4 py-2 bg-[#00712D] text-white rounded-lg hover:bg-[#02a744]">
            Rent Now
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CarCard;
