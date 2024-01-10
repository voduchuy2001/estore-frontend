import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state._id = action.payload.user._id;
      state.email = action.payload.user.email;
    },
    logout: (state) => {
      state._id = "";
      state.image = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
