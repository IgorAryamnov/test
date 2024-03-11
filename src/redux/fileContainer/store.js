import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "filesContainer",
  initialState: {
    filesInContainer: [],
  },
  reducers: {
    setFileInContainer: (state, action) => {
      state.filesInContainer.push(action.payload);
    },
    deleteFileFromContainer: (state, action) => {
      state.filesInContainer = state.filesInContainer.filter(
        (item) => item.name !== action.payload
      );
    },
    deleteAllFilesFromStore: (state, action) => {
      state.filesInContainer = [];
    },
  },
});

export const {
  setFileInContainer,
  deleteFileFromContainer,
  deleteAllFilesFromStore,
} = filesSlice.actions;
export default filesSlice;
