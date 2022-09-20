import { apiSlice } from "../api/apiSlice";

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
        // pessimistic cache update
        dispatch(
          teamsApi.util.updateQueryData(
            "getTeams",
            data?.createdBy,
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
          await queryFulfilled;
        } catch {
          patchResult.undo();
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
  useDeleteTeamMemberMutation,
} = teamsApi;
