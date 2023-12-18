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
    }),
});

export const { useLoginMutation } = usersApiSlice;