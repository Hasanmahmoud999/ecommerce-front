import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { _id, color, size, quantity } = action.payload;

      const uniqueId =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      state.quantity += 1;
      state.products.push({ ...action.payload, uniqueId });
      state.total += action.payload.price * action.payload.quantity;
    },
    updateProduct: (state, action) => {
      const { product1, _id, color, size, quantity } = action.payload;
      const index = state.products.findIndex(
        (product) =>
          product.uniqueId === product1.uniqueId &&
          product.color === product1.color &&
          product.size === product1.size &&
          product.quantity === product1.quantity,
      );

      if (index !== -1) {
        const old = product1;
        state.products[index] = {
          ...old,
          color: action.payload.color,
          size: action.payload.size,
          quantity: action.payload.quantity,
        };
        state.total = state.products.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0,
        );
      }
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.uniqueId === action.payload,
      );
      const remove = state.products[index];
      if (index < 0) return;
      state.total -= remove.price * remove.quantity;
      state.quantity -= 1;
      state.products.splice(index, 1);
      console.log(index);
      console.log(remove);
      console.log(state.products);
    },
    decreaseQuantity: (state, action) => {
      const product = state.products.find((p) => p.uniqueId === action.payload);
      if (!product || product.quantity <= 1) return;
      product.quantity -= 1;
      state.total -= product.price;
    },
    increaseQuantity: (state, action) => {
      const product = state.products.find((p) => p.uniqueId === action.payload);
      product.quantity += 1;
      state.total += product.price;
    },
  },
});
export const {
  addProduct,
  updateProduct,
  removeProduct,
  decreaseQuantity,
  increaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
