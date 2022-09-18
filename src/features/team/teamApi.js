import { json } from "react-router-dom";
import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members.email=${email}`,
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
  }),
});

export const { useGetTeamsQuery, useCreateTeamMutation } = teamsApi;
