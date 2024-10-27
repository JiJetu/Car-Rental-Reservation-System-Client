import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { TCar, TQueryParam, TResponse } from "@/tyeps";
import BookingForm from "./BookingForm";
import BookingConfirm from "./BookingConfirm";
import SearchResult from "./SearchResult";
import { toast } from "sonner";
import { useAddBookingMutation } from "@/redux/features/user/booking.api";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [prevParams, setPrevParams] = useState<TQueryParam[]>([]);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<any | undefined>(
    undefined
  );
  const [allCars, setAllCars] = useState<TCar[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchFetching, setIsSearchFetching] = useState(false);
  const [addBooking] = useAddBookingMutation();
  const navigate = useNavigate();

  const {
    data: carsData,
    isFetching,
    isError,
  } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    { name: "isDeleted", value: false },
    ...params,
  ]);

  useEffect(() => {
    if (!isFetching && carsData && carsData.data) {
      if (page === 1) {
        setAllCars(carsData.data ?? []);
      } else if (carsData.data.length) {
        setAllCars((prevCars) => [...prevCars, ...(carsData?.data ?? [])]);
      }

      if (carsData.data.length < 10 || isError) {
        setHasMore(false);
      }

      if (isSearchFetching) {
        setIsSearchFetching(false);
      }
    }
  }, [
    carsData,
    page,
    isError,
    isFetching,
    isSearchFetching,
    setIsSearchFetching,
  ]);

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
      setParams(queryParams);
      setPrevParams(queryParams);
      setAllCars([]);
      setPage(1);
      setHasMore(true);
      setIsSearchFetching(true);
    }
  };

  const handleConfirmBooking = (car: TCar) => {
    console.log("Booking confirmed for car:", car);
    setSelectedCar(car);
    // setAdditionalFeatures(addFeatures);
  };

  const handleBookingSubmit: SubmitHandler<FieldValues> = (data) => {
    setAdditionalFeatures(data.additionalFeatures);
    const time = data.startTime.format("HH:mm");
    const bookingInfo = {
      ...data,
      selectedCar,
      startTime: time,
    };

    setBookingDetails(bookingInfo as any);
  };

  const handleFinalizeBooking = async () => {
    const toastId = toast.loading("Creating....");

    const bookingInfo = {
      carId: selectedCar?._id,
      date: bookingDetails?.pickUpDate,
      startTime: bookingDetails?.startTime,
    };

    try {
      const res = (await addBooking(bookingInfo)) as TResponse<any>;

      console.log(res);

      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      }

      toast.success(
        "Your request have received, But please wait for confirm your request",
        { id: toastId, duration: 5000 }
      );

      navigate("/user/booking-history");
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="container mx-auto p-6">
      {!selectedCar && !bookingDetails && (
        <>
          <SearchForm onSearch={handleSearch} loading={isFetching} />
          <div className="container mx-auto p-6">
            <SearchResult
              handleConfirmBooking={handleConfirmBooking}
              allCars={allCars}
              isFetching={isFetching}
              hasMore={hasMore}
              isSearchFetching={isSearchFetching}
              loadMoreCars={loadMoreCars}
            />
          </div>
        </>
      )}

      {selectedCar && !bookingDetails && (
        <BookingForm
          selectedCar={selectedCar}
          additionalFeatures={additionalFeatures}
          onBookingSubmit={handleBookingSubmit}
        />
      )}

      {bookingDetails && (
        <BookingConfirm
          additionalFeatures={additionalFeatures}
          handleFinalizeBooking={handleFinalizeBooking}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
};

export default Booking;
