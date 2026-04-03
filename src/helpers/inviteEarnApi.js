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
  }),
});

export const { useGetInviteEarnQuery } = inviteEarnApi;