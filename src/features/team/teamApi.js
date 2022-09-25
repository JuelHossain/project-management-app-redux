import { apiSlice } from "../api/apiSlice";
import { projectsApi } from "../projects/projectsApi";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?q=${email}`,
    }),
    getTeam: builder.query({
      query: (id) => `/teams/${id}`,
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;
        console.log(data);
        // pessimistic cache update
        dispatch(
          teamsApi.util.updateQueryData(
            "getTeams",
            data?.createdBy?.email,
            (draft) => {
              draft.push(data);
            }
          )
        );
      },
    }),
    editTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        // optimistic update
        const patchResult = dispatch(
          teamsApi.util.updateQueryData("getTeam", id, (draft) => {
            Object.assign(draft, data);
          })
        );

        try {
          const { data: updatedTeam } = await queryFulfilled;
          // updating projects team details;
          const projectsOfThisTeam = await dispatch(
            projectsApi.endpoints.getProjectByTeam.initiate(id)
          ).unwrap();
          projectsOfThisTeam.forEach((project) => {
            dispatch(
              projectsApi.endpoints.editProject.initiate({
                id: project.id,
                data: { team: updatedTeam },
              })
            );
          });
        } catch {
          patchResult.undo();
        }
      },
    }),
    deleteTeam: builder.mutation({
      query: ({ id }) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async ({ id, email }, { queryFulfilled, dispatch }) => {
        // optimistic cache update
        const deleteResult = dispatch(
          teamsApi.util.updateQueryData("getTeams", email, (draft) => {
            return draft.filter((team) => team.id !== id);
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
  useGetTeamsQuery,
  useGetTeamQuery,
  useCreateTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
