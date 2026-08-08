import { baseApi } from "./baseApi";

const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createNewsletter: builder.mutation({
      query: (body) => ({
        url: `/newsletter`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Newsletter"],
    }),

  }),
});

export const { useCreateNewsletterMutation } = newsletterApi;