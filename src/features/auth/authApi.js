import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUser: builder.query({
      query: (email) => `/users?email_like=${email}`,
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        // optimistic update will not work here
        try {
          const { data: { user } = {} } = await queryFulfilled;

          // pessimistic update
          dispatch(
            authApi.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.push(user);
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        // optimist cache update
        const deleteResult = dispatch(
          authApi.util.updateQueryData("getUsers", undefined, (draft) => {
            return draft.filter((user) => user.id !== id);
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
  useLoginMutation,
  useCreateUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
} = authApi;
