import { baseApi } from "./baseApi";

const eSimApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEsims: builder.query({
      query: () => ({
        url: "/esim",
        method: "GET",
      }),
    }),
    getEsimById: builder.query({
      query: (id) => ({
        url: `/esim/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEsimsQuery, useGetEsimByIdQuery } = eSimApi;