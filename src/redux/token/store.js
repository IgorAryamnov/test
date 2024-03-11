import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "tokenContainer",
  initialState: {
    tokenContainer: "",
  },
  reducers: {
    setTokenInContainer: (state, action) => {
      state.tokenContainer = action.payload;
    },
    deleteTokenFromContainer: (state, action) => {
      state.tokenContainer = "";
    },
  },
});

export const { setTokenInContainer, deleteTokenFromContainer } =
  tokenSlice.actions;
export default tokenSlice;
