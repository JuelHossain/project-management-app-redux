import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members.email=${email}`,
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
      onQueryStarted: async (data, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
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
        data: { data },
      }),
      onQueryStarted: async ({ id, data }, { dispatch, queryFulfilled }) => {
        // optimistic update
        dispatch(
          teamsApi.util.updateQueryData("getTeam", id, (draft) => {
            draft.members.push(data);
          })
        );
      },
    }),
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation,useEditTeamMutation } = teamsApi;
