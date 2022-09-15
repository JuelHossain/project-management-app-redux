import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const teamSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = teamSlice.actions;

export default teamSlice.reducer;
