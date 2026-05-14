import { baseApi } from "./baseApi";

/** Default matches backend expectation for package ordering. */
export const DEFAULT_ESIM_PACKAGE_SORT = "validity_more_to_less";

/** Allowed `sort_order` values for POST /esim/packages and GET /esim/packages/:slug */
export const ESIM_PACKAGE_SORT_OPTIONS = [
  { label: "Price: low to high", value: "price_low_to_high" },
  { label: "Price: high to low", value: "price_high_to_low" },
  { label: "Validity: less to more", value: "validity_less_to_more" },
  { label: "Validity: more to less", value: "validity_more_to_less" },
];

const eSimApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEsims: builder.query({
      query: ({
        type,
        country,
        page = 1,
        limit = 12,
        sort_order = DEFAULT_ESIM_PACKAGE_SORT,
      }) => ({
        url: "/esim/packages",
        method: "POST",
        body: {
          type,
          ...(country ? { country } : {}),
          page,
          limit,
          sort_order,
        },
      }),
      providesTags: ["Esim"],
    }),
    getEsimRegions: builder.query({
      query: ({
        slug,
        page = 1,
        limit = 12,
        sort_order = DEFAULT_ESIM_PACKAGE_SORT,
      }) => ({
        url: `/esim/packages/${slug}`,
        method: "GET",
        params: { page, limit, sort_order },
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