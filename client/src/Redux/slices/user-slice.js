import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    isAuthenticated: false,
}   

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isAuthenticated = true;
        },
        removeUserData: (state, action) => {
            state.userData = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUserData, removeUserData } = userSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;