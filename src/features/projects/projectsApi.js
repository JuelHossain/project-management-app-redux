import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (section) => `/projects?section=${section}`,
      providesTags: (result, error, section) => {
        return [{ type: "getProjects", id: section }];
      },
    }),
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        // pessimistic update
        dispatch(
          projectsApi.util.updateQueryData(
            "getProjects",
            data?.section,
            (draft) => {
              draft.push(data);
            }
          )
        );
      },
    }),
    editProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id, data }) => {

        return [{ type: "getProjects", id: data.section }];
      },
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        // optimistic cache update
        const patchResult = dispatch(
          projectsApi.util.updateQueryData("getProject", id, (draft) => {
            Object.assign(draft, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ id, section }) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ id, section }, { dispatch, queryFulfilled }) => {
        // optimistic cache update
        const deleteResult = dispatch(
          projectsApi.util.updateQueryData("getProjects", section, (draft) => {
            return draft.filter((project) => project.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
