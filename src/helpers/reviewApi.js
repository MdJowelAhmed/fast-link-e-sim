import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (params) => ({
            url: "/review",
            method: "GET",
            params,
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: `/review`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetReviewsQuery , useCreateReviewMutation } = reviewApi;