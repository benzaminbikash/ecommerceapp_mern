import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.68:8000/api/category/",
  }),
  endpoints: (builder) => ({
    getCategoryList: builder.query({
      query: () => ({
        url: "allcategory",
        method: "get",
      }),
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryApi;
