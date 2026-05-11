import { baseApi } from "@/helpers/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth","User"],
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendVerificationEmail: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
 
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forget-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User","Auth"],
    }),
    updateMyProfile: builder.mutation({
      query: (body) => ({
        url: "/user/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User","Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = authApi;
