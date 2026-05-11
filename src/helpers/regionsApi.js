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
      query: ({ region, countryName }) => {
        const params = { region };
        const trimmed =
          typeof countryName === "string" ? countryName.trim() : "";
        if (trimmed) params.countryName = trimmed;
        return {
          url: "/country",
          params,
          method: "GET",
        };
      },
      providesTags: ["Region"],
    }),
  }),
});

export const { useGetRegionsQuery, useGetCountriesBasedOnRegionQuery } = regionsApi;