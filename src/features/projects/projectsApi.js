import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    projects: builder.query({
      query: (stage) => `/projects?stage_like=${stage}`,
    }),
  }),
});

export const { useProjectsQuery } = projectsApi;
