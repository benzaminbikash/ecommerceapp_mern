import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Api/userApi";
import { categoryApi } from "./Api/categoryApi";
import { productApi } from "./Api/productApi";
import cartSlice from "./slice/cartSlice";
import tokenSlice from "./slice/tokenSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    cart: cartSlice,
    token: tokenSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      categoryApi.middleware,
      productApi.middleware
    ),
});
setupListeners(store.dispatch);
