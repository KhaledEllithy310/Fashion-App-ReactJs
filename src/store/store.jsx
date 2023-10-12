import { configureStore } from "@reduxjs/toolkit";
import modeSlice from "./slices/modeSlice";

export const store = configureStore({
  reducer: {
    mode: modeSlice,
  },
});
