import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../../Services/UsersApi";

const localStorageData = JSON.parse(localStorage.getItem("isLoggedIn")) || {
  isAuth: false,
  userData: null,
};

export const getUsers = createAsyncThunk("users", async () => {
  const users = await getAllUsers();
  return users.data;
});

const initialState = {
  users: [],
  ...localStorageData,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addNewUser: (state, action) => {
      state.users.push(action.payload);
    },
    logIn: (state, action) => {
      const userData = action.payload;
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify({ isAuth: true, userData })
      );
    },
    logOut: (state, action) => {
      const userData = null;
      localStorage.setItem(
        "isLoggedIn",
        JSON.stringify({ isAuth: false, userData })
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { addNewUser, logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
