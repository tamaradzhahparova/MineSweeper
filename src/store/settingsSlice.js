import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: null,
  bestResults: [],
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
  },
});

export const { setLevel } = settingsSlice.actions;

export default settingsSlice.reducer;
