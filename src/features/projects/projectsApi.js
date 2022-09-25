import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (section) => `/projects?section=${section}`,
    }),
    getUserProjects: builder.query({
      query: (userEmail) => `/projects?createdBy.email=${userEmail}`,
    }),
    getProjectByTeam: builder.query({
      query: (teamId) => `/projects?team.id=${teamId}`,
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
        try {
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
        } catch {}
      },
    }),
    editProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),

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
    stageProject: builder.mutation({
      query: ({ data, patch }) => ({
        url: `/projects/${data.id}`,
        method: "PATCH",
        body: patch,
      }),

      onQueryStarted: async ({ data, patch }, { dispatch, queryFulfilled }) => {
        // optimistic cache update
        const putResult = dispatch(
          projectsApi.util.updateQueryData("getProject", data.id, (draft) => {
            return { ...data, ...patch };
          })
        );

        const patchResult = dispatch(
          projectsApi.util.updateQueryData(
            "getProjectByTeam",
            data.team.id,
            (draft) => {
              Object.assign(
                draft.find((project) => project.id === data.id),
                patch
              );
            }
          )
        );

        // optimistic cache update of project dropped section
        const pushResult = dispatch(
          projectsApi.util.updateQueryData(
            "getProjects",
            patch.section,
            (draft) => {
              return [...draft, { ...data, ...patch }];
            }
          )
        );
        // optimistic cache update of project drag section
        const popResult = dispatch(
          projectsApi.util.updateQueryData(
            "getProjects",
            data.section,
            (draft) => {
              return draft.filter((project) => project.id !== data.id);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          putResult.undo();
          pushResult.undo();
          popResult.undo();
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
  useGetProjectByTeamQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useStageProjectMutation,
  useGetUserProjectsQuery,
} = projectsApi;
