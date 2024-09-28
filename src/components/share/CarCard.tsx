import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TCar } from "@/tyeps";
import { Link } from "react-router-dom";

type TCarProps = {
  car: TCar;
};

const CarCard = ({ car }: TCarProps) => {
  return (
    <Link to={`/car/${car._id}`}>
      <div className="p-4 flex flex-col h-full">
        <Card className="flex flex-col h-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out bg-white border border-gray-200 rounded-lg">
          <CardHeader className="relative">
            <img
              src={car.carImage}
              alt={car.name}
              className="rounded-t-lg w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-2xl font-bold">{car.name}</CardTitle>
            <p className="text-gray-700 mt-2">{car.shortDescription}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4 bg-gray-50 rounded-b-lg">
            <span className="text-lg font-semibold text-[#00712D]">
              {car.pricePerHour}/hr
            </span>

            <button className="px-4 py-2 bg-[#00712D] text-white rounded-lg hover:bg-[#02a744] transition duration-200 ease-in-out shadow-md hover:shadow-lg">
              View Details
            </button>
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};

export default CarCard;
