import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: (params) => ({
            url: "/imagebanner",
            method: "GET",
            params,
      }),
      providesTags: ["Banner"],
    }),
   
  }),
});

export const { useGetBannersQuery  } = bannerApi;