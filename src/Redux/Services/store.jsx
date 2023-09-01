import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";
import { authApi } from "../Api/auth";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    movieSlice: movieSlice,
    authSlice: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
