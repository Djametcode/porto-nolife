import { createSlice } from "@reduxjs/toolkit";

interface IData {
    isLoading: boolean;
    refresher: number
    login: {
        email: string;
        password: string
    }
    regist: {
        username: string;
        email: string;
        password: string;
    }
    update: boolean
}

const initialState: IData = {
    isLoading: false,
    refresher: 0,
    login: {
        email: '',
        password: ''
    },
    regist: {
        username: '',
        email: '',
        password: ''
    },
    update: false

}

const globalState = createSlice({
    name: 'global',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        finishLoading: (state) => {
            state.isLoading = false
        },
        refresh: (state) => {
            state.refresher += 1
        },
        loginRedux: (state, action: { payload: { email: string; password: string; } }) => {
            state.login = { email: action.payload.email, password: action.payload.password }
        },
        registRedux: (state, action: { payload: { username: string; email: string; password: string } }) => {
            state.regist = { username: action.payload.username, email: action.payload.email, password: action.payload.password }
        },
        updateProfile: (state) => {
            state.update = true
        }
    }
})

export const globalSlice = globalState.reducer
export const { startLoading, finishLoading, refresh, loginRedux, registRedux, updateProfile } = globalState.actions