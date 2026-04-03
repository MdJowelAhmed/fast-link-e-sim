import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/helpers/baseApi";
import "@/helpers/authApi";
import "@/helpers/inviteEarnApi";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
