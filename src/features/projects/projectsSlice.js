import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const projectSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = projectSlice.actions;

export default projectSlice.reducer;
