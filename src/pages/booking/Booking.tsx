import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { CarStatus, TCar, TQueryParam, TResponse } from "@/tyeps";
import BookingForm from "./BookingForm";
import BookingConfirm from "./BookingConfirm";
import SearchResult from "./SearchResult";
import { toast } from "sonner";
import { useAddBookingMutation } from "@/redux/features/user/booking.api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearWishList,
  selectedBooking,
} from "@/redux/features/user/booking.slice";

const Booking = () => {
  // params is for getting new search param and prevParam is for saving previous search
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [prevParams, setPrevParams] = useState<TQueryParam[]>([]);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [searchCar, setSearchCar] = useState<boolean>(false);
  const [additionalInsurance, setAdditionalInsurance] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<any | undefined>(
    undefined
  );
  const [allCars, setAllCars] = useState<TCar[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchFetching, setIsSearchFetching] = useState(false);
  const [addBooking] = useAddBookingMutation();
  const navigate = useNavigate();
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

  // update params based on wishListCarInfo
  useEffect(() => {
    const queryParams: TQueryParam[] = [];

    if (wishListCarInfo?.wishCar) {
      if (wishListCarInfo.wishCar.color) {
        queryParams.push({
          name: "color",
          value: wishListCarInfo.wishCar.color,
        });
      }
      if (wishListCarInfo.wishCar.name) {
        queryParams.push({
          name: "searchTerm",
          value: wishListCarInfo.wishCar.name,
        });
      }
      if (wishListCarInfo.wishCar.pricePerHour) {
        queryParams.push({
          name: "pricePerHour",
          value: wishListCarInfo.wishCar.pricePerHour,
        });
      }
      if (wishListCarInfo.wishCar.location) {
        queryParams.push({
          name: "location",
          value: wishListCarInfo.wishCar.location,
        });
      }
      if (wishListCarInfo.wishCar.type) {
        queryParams.push({ name: "type", value: wishListCarInfo.wishCar.type });
      }
      if (
        wishListCarInfo?.wishCar?.features?.length &&
        wishListCarInfo?.wishCar?.features?.length > 0
      ) {
        wishListCarInfo?.wishCar?.features?.forEach((feature: string) => {
          queryParams.push({ name: "features", value: feature });
        });
      }

      setSearchCar(true);
    } else {
      setSearchCar(false);
    }
    setParams(queryParams);

    dispatch(clearWishList());
  }, []);

  // for getting all data at a time and refetch data if it's the first page
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

  // search form handler and set the query to get require car data
  const handleSearch: SubmitHandler<FieldValues> = (data) => {
    setSearchCar(true);

    const queryParams: TQueryParam[] = [];

    // Apply search filters based on user input
    if (data.carType) {
      queryParams.push({ name: "type", value: data.carType });
    }

    if (data.search) {
      queryParams.push({ name: "searchTerm", value: data.search });
    }

    if (data.location) {
      queryParams.push({ name: "location", value: data.location });
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

    // compare with previous search params to avoid redundant fetching
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

  // handle click on booking button and save the car data for booking form and final booking
  const handleConfirmBooking = (car: TCar, addInsurance: string[]) => {
    setSelectedCar(car);
    setAdditionalInsurance(addInsurance);
  };

  // booking form for getting user info, time and date for booking car
  const handleBookingSubmit: SubmitHandler<FieldValues> = (data) => {
    const startTime = data.startTime.format("HH:mm");
    const endTime = data.endTime.format("HH:mm");
    const bookingInfo = {
      ...data,
      selectedCar,
      startTime,
      endTime,
    };

    setBookingDetails(bookingInfo as any);
  };

  // confirm booking and save info into booking history
  const handleFinalizeBooking = async () => {
    const toastId = toast.loading("Creating....");

    const bookingInfo = {
      carId: selectedCar?._id,
      startDate: bookingDetails?.startDate,
      startTime: bookingDetails?.startTime,
      expectedEndDate: bookingDetails?.endDate,
      expectedEndTime: bookingDetails?.endTime,
      additionalFeatures: bookingDetails?.additionalFeatures,
      nidOrPassport: bookingDetails?.nidOrPassport,
      drivingLicense: bookingDetails?.drivingLicense,
      additionalInsurance,
    };

    try {
      const res = (await addBooking(bookingInfo)) as TResponse<any>;

      if (res?.error) {
        return toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }

      // todo: dispatch clean wish list
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
      {/* search form section */}
      {!selectedCar && !bookingDetails && (
        <>
          <SearchForm onSearch={handleSearch} loading={isFetching} />
        </>
      )}

      {/* showing result section */}
      {!selectedCar && searchCar && !bookingDetails && (
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
      )}

      {/* sowing booking from section */}
      {selectedCar && !bookingDetails && (
        <BookingForm
          selectedCar={selectedCar}
          additionalInsurance={additionalInsurance}
          onBookingSubmit={handleBookingSubmit}
        />
      )}

      {/* revision and finalize section for booking */}
      {bookingDetails && (
        <BookingConfirm
          additionalInsurance={additionalInsurance}
          handleFinalizeBooking={handleFinalizeBooking}
          bookingDetails={bookingDetails}
        />
      )}
    </div>
  );
};

export default Booking;
