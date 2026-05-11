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
      query: (arg) => {
        const trimmed =
          typeof arg?.countryName === "string"
            ? arg.countryName.trim()
            : "";
        if (trimmed) {
          return {
            url: "/country",
            params: { countryName: trimmed },
            method: "GET",
          };
        }
        return {
          url: "/country",
          params: { region: arg?.region },
          method: "GET",
        };
      },
      providesTags: ["Region"],
    }),
  }),
});

export const { useGetRegionsQuery, useGetCountriesBasedOnRegionQuery } = regionsApi;