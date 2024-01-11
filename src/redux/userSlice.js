import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload.user._id;
      state.email = action.payload.user.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state._id = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
