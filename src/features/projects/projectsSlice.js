import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: ["backlog", "ready", "doing", "review", "blocked", "done"],
  search: "",
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const {} = projectSlice.actions;

export default projectSlice.reducer;
export const { setSearch } = projectSlice.actions;
