import { baseApi } from "./baseApi";

const topHeaderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getTopHeader: builder.query({
      query: () => ({
            url: "/banner",
            method: "GET",
      }),
      providesTags: ["TopHeader"],
    }),

  }),
});

export const { useGetTopHeaderQuery  } = topHeaderApi;