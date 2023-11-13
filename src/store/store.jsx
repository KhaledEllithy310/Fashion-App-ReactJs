import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/modeSlice";
import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import wishListSlice from "./slices/wishListSlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    cart: cartSlice,
    users: userSlice,
    wishList: wishListSlice,
  },
});
