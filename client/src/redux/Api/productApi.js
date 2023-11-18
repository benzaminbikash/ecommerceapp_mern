import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.68:8000/api/product/",
  }),
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: () => ({
        url: "allproduct",
        method: "get",
      }),
    }),
    categoryProduct: builder.query({
      query: (id) => ({
        url: `categoryproduct/${id}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetProductListQuery, useCategoryProductQuery } = productApi;
