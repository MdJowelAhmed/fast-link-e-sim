import { baseApi } from "./baseApi";

const disclaimerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDisclaimer: builder.query({
      query: (type) => ({
        url: "/disclaimer",
        method: "GET",
        params: { type },
      }),
    }),
  }),
});

export const { useGetDisclaimerQuery } = disclaimerApi;