import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  order: [],
  method: "",
  totalPrice,
};

const orderSlice = createSlice({
  name: "ORDER",
  initialState: initalState,
  reducers: {
    addOrder: (state, action) => {},
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
