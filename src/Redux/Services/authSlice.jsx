import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: {},
  token: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    putUserData: (state, { payload }) => {
      (state.user = payload.user), (state.token = payload.token);
      Cookies.set("token", payload.token);
      Cookies.set("user", JSON.stringify(payload.user));
    },
  },
});
export const { putUserData } = authSlice.actions;
export default authSlice.reducer;
