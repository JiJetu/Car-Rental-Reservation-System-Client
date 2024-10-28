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
      providesTags: ["bookings"],
      transformResponse: (response: TResponseRedux<TBooking>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
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
    approveBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/approve/${data?.bookingId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["bookings"],
    }),
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/cancel/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useAddBookingMutation,
  useGetUserBookingQuery,
  useApproveBookingMutation,
  useCancelBookingMutation,
} = carApi;
