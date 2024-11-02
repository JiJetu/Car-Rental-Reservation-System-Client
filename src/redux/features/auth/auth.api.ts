import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signin",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation({
      query: (args) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: {
          Authorization: args.token,
        },
        body: args.userInfo,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
