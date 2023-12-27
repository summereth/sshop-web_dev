import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // POST request uses mutation instead of query
        login: builder.mutation({
            query: (data) => ({ 
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation ({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            // provide tag in case data can't be refreshed after modification
            providesTags: ["Users"],
            keepUnusedDataFor: 5,
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useGetUserByIdQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApiSlice;