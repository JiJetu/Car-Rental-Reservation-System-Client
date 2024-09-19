import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCarsQuery } = carApi;
