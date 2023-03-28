import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: null,
  name: "",
  winners: []
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
    },
    setWinner: (state, action) => {
      state.winners = [...state.winners, action.payload]
    }
  }
});

export const { setLevel, setName, setWinner } = settingsSlice.actions;

export default settingsSlice.reducer;
