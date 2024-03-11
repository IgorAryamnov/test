import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./fileContainer/store";
import tokenSlice from "./token/store";
import serverFilesSlice from "./filesFromServerContainer/store";

export const store = configureStore({
  reducer: {
    filesContainer: filesSlice.reducer,
    tokenContainer: tokenSlice.reducer,
    filesFromServerContainer: serverFilesSlice.reducer,
  },
});
