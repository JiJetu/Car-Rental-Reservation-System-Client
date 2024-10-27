import Loading from "@/components/share/Loading";
import { TCar } from "@/tyeps";
import InfiniteScroll from "react-infinite-scroll-component";
import BookingCard from "./BookingCard";

type TSearchResultProps = {
  allCars: TCar[];
  loadMoreCars: any;
  handleConfirmBooking: any;
  hasMore: boolean;
  isSearchFetching: boolean;
  isFetching: boolean;
};

const SearchResult = ({
  allCars,
  loadMoreCars,
  hasMore,
  handleConfirmBooking,
  isSearchFetching,
  isFetching,
}: TSearchResultProps) => {
  return (
    <InfiniteScroll
      dataLength={allCars.length}
      next={loadMoreCars}
      hasMore={hasMore}
      loader={<Loading />}
    >
      {isSearchFetching ? (
        <div className="bg-white text-xl text-green-600 border border-green-600 font-bold p-5 flex justify-center items-center">
          <p>Data fetching.</p>
        </div>
      ) : allCars.length === 0 && !isFetching ? (
        <div className="bg-white text-xl text-red-600 border border-red-600 font-bold p-5 flex justify-center items-center">
          <p>No car Found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCars.map((car) => (
            <BookingCard
              key={car._id}
              car={car}
              handleConfirmBooking={handleConfirmBooking}
            />
          ))}
        </div>
      )}
    </InfiniteScroll>
  );
};

export default SearchResult;
