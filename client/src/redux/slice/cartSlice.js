import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "CART",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.carts.push(action.payload);
    },
    removeCart: (state, action) => {
      const product = state.carts.filter((d) => d._id != action.payload._id);
      state.carts = product;
    },
    clearCart: (state) => {
      state.carts = [];
    },
    increaseQty: (state, action) => {
      const findProduct = state.carts.find((d) => d._id === action.payload._id);
      findProduct.qty++;
    },
    decreaseQty: (state, action) => {
      const findProduct = state.carts.find((d) => d._id === action.payload._id);
      findProduct.qty--;
    },
  },
});

export const { addToCart, clearCart, removeCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
