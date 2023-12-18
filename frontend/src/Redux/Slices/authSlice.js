import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    user: null,
    // token: null,
    error: null,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        loginPending: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, { payload }) => {
            state.isLoading = false;
            state.user = payload;
            // state.token = payload.token;
        },
        loginFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        logout: (state) => {
            state.isLoading = false;
            state.user = null;
            state.error = false;
        },
        signupPending: (state) => {
            state.isLoading = true;
        },
        signupSuccess: (state, { payload }) => {
            state.isLoading = false;
        },
        signupFailed: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload.message;
        },
    }
});

const { reducer, actions } = AuthSlice;

export const { loginPending, loginSuccess, loginFailed, logout, signupPending, signupSuccess, signupFailed } = actions;

export default reducer;
