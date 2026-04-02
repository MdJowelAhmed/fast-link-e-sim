import { baseApi } from "./baseApi";

const myESimApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyESims: builder.query({
      query: ({ page = 1, limit = 10 } = {}) => ({
        url: "/esim/order",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["MyESim"],
    }),
    getMyESimById: builder.query({
      query: (id) => ({
        url: `/esim/order/${id}`,
        method: "GET",
      }),
      providesTags: ["MyESim"],
    }),
  }),
});

export const { useGetMyESimsQuery, useGetMyESimByIdQuery } = myESimApi;