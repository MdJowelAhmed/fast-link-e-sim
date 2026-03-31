import { baseApi } from "./baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params) => ({
            url: "/blog",
            method: "GET",
            params,
      }),
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogsQuery , useGetBlogByIdQuery } = blogsApi;