import { createSlice } from "@reduxjs/toolkit";

export const modeSlice = createSlice({
  name: "mode",
  initialState: localStorage.getItem("currentMode") || "dark",
  reducers: {
    changeMode: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { light, dark, changeMode } = modeSlice.actions;

export default modeSlice.reducer;
