import { baseApi } from "@/redux/api/baseApi";
import { TCar, TQueryParam, TResponseRedux } from "@/tyeps";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        console.log({ args });
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/cars",
          method: "GET",
          params,
        };
      },
      providesTags: ["cars"],
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleCar: builder.query({
      query: (id) => {
        console.log(id);
        return { url: `/cars/${id}`, method: "GET" };
      },
      providesTags: ["cars"],
    }),
    addCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cars"],
    }),
    updateCar: builder.mutation({
      query: (args) => ({
        url: `/cars/${args?.carId}`,
        method: "PUT",
        body: args?.data,
      }),
      invalidatesTags: ["cars"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useGetSingleCarQuery,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
