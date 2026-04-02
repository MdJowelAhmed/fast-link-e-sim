import { baseApi } from "./baseApi";

const eSimApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEsims: builder.query({
      query: ({ type, country, page = 1, limit = 12 }) => ({
        url: "/esim/packages",
        method: "POST",
        body: {
          type,
          ...(country ? { country } : {}),
          page,
          limit,
        },
      }),
      providesTags: ["Esim"],
    }),
    getEsimRegions: builder.query({
      query: ({ slug, page = 1, limit = 12 }) => ({
        url: `/esim/packages/${slug}`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Esim"],
    }),
    esimCheckout: builder.mutation({
      query: (data) => ({
        url: `/esim/order`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Esim"],
    }),
    couponCheck: builder.mutation({
      query: (data) => ({
        url: `/coupon/check`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Esim"],
    }),
  }),
});

export const { useGetEsimsQuery, useGetEsimRegionsQuery, useEsimCheckoutMutation, useCouponCheckMutation } = eSimApi;