import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    teams: builder.query({
      query: (email) => `/teams?q=${email}`,
    }),
  }),
});

export const { useTeamsQuery } = teamsApi;
