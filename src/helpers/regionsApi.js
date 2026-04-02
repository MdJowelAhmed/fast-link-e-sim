import { baseApi } from "./baseApi";

const regionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegions: builder.query({
      query: () => ({
        url: "/country/regions",
        method: "GET",
      }),
      providesTags: ["Region"],
    }),
    getCountriesBasedOnRegion: builder.query({
      query: (region) => ({
        url: "/country",
        params: { region },
        method: "GET",
      }),
      providesTags: ["Region"],
    }),
  }),
});

export const { useGetRegionsQuery, useGetCountriesBasedOnRegionQuery } = regionsApi;