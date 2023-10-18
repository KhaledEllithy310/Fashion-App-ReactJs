import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/modeSlice";
import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    cart: cartSlice,
    products: productsSlice,
  },
});
