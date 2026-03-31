import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetFaqsQuery } = faqApi;