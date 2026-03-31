import { baseApi } from "./baseApi";

const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactUs: builder.mutation({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendContactUsMutation } = contactUsApi;