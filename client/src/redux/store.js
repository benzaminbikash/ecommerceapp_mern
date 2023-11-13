import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./Api/userApi";
import { categoryApi } from "./Api/categoryApi";
import { productApi } from "./Api/productApi";
import cartSlice from "./slice/cartSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      categoryApi.middleware,
      productApi.middleware
    ),
});
setupListeners(store.dispatch);
