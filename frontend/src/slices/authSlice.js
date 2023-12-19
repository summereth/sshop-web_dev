// Handle FE localStorage/state
// usersApiSlice.js is responsible to call BE Api

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice;