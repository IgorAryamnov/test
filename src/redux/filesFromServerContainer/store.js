import { createSlice } from "@reduxjs/toolkit";

const serverFilesSlice = createSlice({
  name: "filesFromServerContainer",
  initialState: {
    filesFromServerContainer: [],
  },
  reducers: {
    setFilesFromServerInContainer: (state, action) => {
      state.filesFromServerContainer = action.payload;
    },
    deleteFileFromServerContainer: (state, action) => {
      state.filesFromServerContainer = state.filesFromServerContainer.filter(
        (item) => item.name !== action.payload
      );
    },
  },
});

export const { setFilesFromServerInContainer, deleteFileFromServerContainer } =
  serverFilesSlice.actions;
export default serverFilesSlice;
