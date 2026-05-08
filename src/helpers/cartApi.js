import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (params) => ({
            url: "/cart",
            method: "GET",
            params,
      }),
      providesTags: ["Cart"],
    }),
    createCart: builder.mutation({
      query: (body) => ({
        url: `/cart`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery , useCreateCartMutation, useUpdateCartMutation, useDeleteCartMutation } = cartApi;