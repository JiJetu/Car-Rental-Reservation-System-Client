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
    }),
    addCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
    }),
    updateCar: builder.mutation({
      query: (data) => ({
        url: `/cars/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: `DELETE`,
      }),
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
