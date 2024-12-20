import { FieldValues, SubmitHandler } from "react-hook-form";
import { CarStatus, TQueryParam } from "@/tyeps";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { useEffect, useState } from "react";
import CarFilters from "./CarFilters";
import CarCard from "@/components/share/CarCard";
import Loading from "@/components/share/Loading";
import CustomForm from "@/components/form/CustomForm";
import { Pagination } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearWishList,
  selectedBooking,
} from "@/redux/features/user/booking.slice";

const CarListing = () => {
  // params for queary search
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  // getting RTK local saving info for wishListCarInfo
  const wishListCarInfo = useAppSelector(selectedBooking);
  const dispatch = useAppDispatch();
  // fetching with search params for all car data with the help of RTK query
  const {
    data: carsData,
    isFetching,
    isError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "isDeleted", value: false },
    { name: "status", value: CarStatus.available },
    ...params,
  ]);

  const cars = carsData?.data;
  const metaData = carsData?.meta;

  // Update params based on wishListCarInfo
  useEffect(() => {
    const queryParams: TQueryParam[] = [];

    if (wishListCarInfo?.wishCar) {
      if (wishListCarInfo.wishCar.location) {
        queryParams.push({
          name: "location",
          value: wishListCarInfo.wishCar.location,
        });
      }
    }
    setParams(queryParams);

    dispatch(clearWishList());
  }, []);

  // filter sumbmit handler for search and filter
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
    setPage(1);
  };

  return (
    <div className="container mx-auto">
      <div className="p-4">
        {/* form section for search */}
        <CustomForm resetFrom={false} onSubmit={handleFilterSubmit}>
          <CarFilters onSubmit={handleFilterSubmit} loading={isFetching} />
        </CustomForm>
      </div>

      {/* showing result sectiion */}
      {isFetching ? (
        <Loading />
      ) : cars?.length === 0 || isError ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>-----Sorry no car found-----</p>
        </div>
      ) : (
        <div className="my-4">
          <h2 className="text-4xl font-semibold text-center md:text-start mb-8">
            <span className="inline-block border-b-4 border-green-500 pb-2">
              Available Cars
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
          <div className="divider dark:divider-accent">
            <Pagination
              style={{ color: "red" }}
              className="text-red-700"
              align="center"
              current={page}
              onChange={(value) => setPage(value)}
              pageSize={metaData?.limit}
              total={metaData?.total}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarListing;
