import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: ["backlog", "ready", "doing", "review", "blocked", "done"],
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const {} = projectSlice.actions;

export default projectSlice.reducer;
