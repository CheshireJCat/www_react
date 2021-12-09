import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
    logined: boolean
}

const initialState: LoginState = {
    logined: false
}

const storeSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state) => {
            state.logined = true
        },
        logout: (state) => {
            console.log(state)
            state.logined = false
        }
    }
})

export const { login, logout } = storeSlice.actions;

export const loginReducer = storeSlice.reducer;

