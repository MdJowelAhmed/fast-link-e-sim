import { baseApi } from "./baseApi";

const inviteEarnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInviteEarn: builder.query({
      query: () => ({
        url: "/user/refferal-info",
        method: "GET",
      }),
      providesTags: ["InviteEarn"],
    }),

    connectYourStripeAccount: builder.mutation({
      query: () => ({
        url: "/user/connected-account",
        method: "GET",
      }),
      invalidatesTags: ["InviteEarn"],
    }),
  }),
});

export const { useGetInviteEarnQuery, useConnectYourStripeAccountMutation } = inviteEarnApi;