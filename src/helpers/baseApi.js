import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@/config/env-config";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_V1_BASE,
  prepareHeaders: (headers, { endpoint }) => {
    if (typeof window !== "undefined") {
      if (endpoint === "resetPassword") {
        const resetToken = localStorage.getItem("resetToken");
        if (resetToken) {
          headers.set("token", resetToken);
        }
      } else {
        const token = localStorage.getItem("token");
        if (token) headers.set("Authorization", `Bearer ${token}`);
      }
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["Auth", "User", "Blog", "Review"],
  endpoints: () => ({}),
});
