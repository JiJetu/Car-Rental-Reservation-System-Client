import { FieldValues, SubmitHandler } from "react-hook-form";
import { TQueryParam } from "@/tyeps";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { useState } from "react";
import CarFilters from "./CarFilters";
import CarCard from "@/components/share/CarCard";

const CarListing = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: carsData } = useGetAllCarsQuery(params);

  console.log(carsData);

  const cars = carsData?.data || [];

  const handleFilterSubmit: SubmitHandler<FieldValues> = (data) => {
    const queryParams: TQueryParam[] = [];

    if (data.carType) {
      queryParams.push({ name: "type", value: data.carType });
    }

    if (data.carColor) {
      queryParams.push({ name: "color", value: data.carColor });
    }

    if (data.carFeatures && data.carFeatures.length > 0) {
      data.carFeatures.forEach((feature: string) => {
        queryParams.push({ name: "features", value: feature });
      });
    }

    if (data.priceRange) {
      queryParams.push({
        name: "minPrice",
        value: data.priceRange[0],
      });
      queryParams.push({
        name: "maxPrice",
        value: data.priceRange[1],
      });
    }

    setParams(queryParams);
  };

  return (
    <div className="container mx-auto">
      <CarFilters onSubmit={handleFilterSubmit} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default CarListing;
