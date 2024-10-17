import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import Loading from "@/components/share/Loading";
import { TCar, TQueryParam } from "@/tyeps";
import InfiniteScroll from "react-infinite-scroll-component";
import CarCard from "@/components/share/CarCard";
import BookingForm from "./BookingForm";
import BookingConfirm from "./BookingConfirm";

const Booking = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [prevParams, setPrevParams] = useState<TQueryParam[]>([]);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [allCars, setAllCars] = useState<TCar[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialFetch, setIsInitialFetch] = useState(true);

  const {
    data: carsData,
    isFetching,
    isLoading,
    isError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "isDeleted", value: false },
    ...params,
  ]);

  useEffect(() => {
    if (!isFetching && carsData && carsData.data) {
      // Ensure carsData and carsData.data are not undefined
      if (page === 1) {
        setAllCars(carsData.data ?? []); // Reset cars on the first page
      } else if (carsData.data.length) {
        setAllCars((prevCars) => [...prevCars, ...(carsData?.data ?? [])]);
      }

      if (carsData.data.length < 10 || isError) {
        setHasMore(false); // Stop fetching if no more cars
      }
    }
  }, [carsData, page, isError, isFetching]);

  const loadMoreCars = () => {
    if (!isFetching && hasMore) {
      setPage((prePage) => prePage + 1);
    }
  };

  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const queryParams: TQueryParam[] = [];

    // Apply search filters based on user input
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

    // Compare with previous search params to avoid redundant fetching
    const isSameParams =
      JSON.stringify(prevParams) === JSON.stringify(queryParams);
    if (!isSameParams) {
      setParams(queryParams); // Set new params
      setPrevParams(queryParams); // Track previous params
      setAllCars([]); // Reset the car list
      setPage(1); // Reset page to 1
      setHasMore(true); // Reset infinite scroll state
      setIsInitialFetch(false); // Track that search is initiated
    }
  };

  const handleCarSelect = (car: TCar) => {
    setSelectedCar(car);
  };

  const handleBookingSubmit = (data: FieldValues) => {
    // const bookingInfo = {
    //   ...data,
    //   carName: selectedCar?.name,
    //   totalPrice:
    //     selectedCar?.pricePerDay *
    //     calculateDays(data.pickUpDate, data.dropOffDate),
    // };
    setBookingDetails(data);
  };

  return (
    <div className="container mx-auto p-6">
      {!selectedCar && !bookingDetails && (
        <SearchForm onSearch={handleSearch} loading={isFetching} />
      )}

      <div className="container mx-auto p-6">
        <InfiniteScroll
          dataLength={allCars.length}
          next={loadMoreCars}
          hasMore={hasMore}
          loader={<Loading />}
        >
          {isFetching && isInitialFetch ? (
            <div className="bg-white text-xl text-green-600 border border-green-600 font-bold p-5 flex justify-center items-center">
              <p>Data fetching.</p>
            </div>
          ) : allCars.length === 0 ? (
            <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
              <p>No car Found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </InfiniteScroll>
      </div>
      {selectedCar && !bookingDetails && (
        <BookingForm
          selectedCar={selectedCar}
          onBookingSubmit={handleBookingSubmit}
        />
      )}

      {bookingDetails && <BookingConfirm bookingDetails={bookingDetails} />}
    </div>
  );
};

export default Booking;
