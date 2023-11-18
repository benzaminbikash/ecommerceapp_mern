import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.68:8000/api/auth/" }),
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "post",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    //login
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "post",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    //get user info
    getUser: builder.query({
      query: (token) => ({
        url: "singleinfo",
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useGetUserQuery } =
  userApi;
