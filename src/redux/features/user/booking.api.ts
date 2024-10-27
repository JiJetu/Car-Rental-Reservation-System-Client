import { baseApi } from "@/redux/api/baseApi";
import { TBooking, TQueryParam, TResponseRedux } from "@/tyeps";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (args) => {
        console.log({ args });
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/bookings",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TBooking>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    // getSingleCar: builder.query({
    //   query: (id) => {
    //     console.log(id);
    //     return { url: `/cars/${id}`, method: "GET" };
    //   },
    // }),
    getUserBooking: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
    addBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    // updateCar: builder.mutation({
    //   query: (data) => ({
    //     url: `/cars/${data?.id}`,
    //     method: "PUT",
    //     body: data?.data,
    //   }),
    // }),
    // deleteCar: builder.mutation({
    //   query: (id) => ({
    //     url: `/cars/${id}`,
    //     method: `DELETE`,
    //   }),
    // }),
  }),
});

export const {
  useGetBookingsQuery,
  useAddBookingMutation,
  useGetUserBookingQuery,
} = carApi;
