import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: null,
  name: "",
  bestResults: []
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    }
  }
});

export const { setLevel, setName } = settingsSlice.actions;

export default settingsSlice.reducer;
