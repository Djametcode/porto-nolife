import { createSlice } from "@reduxjs/toolkit";

interface IData {
    isLoading: boolean;
    refresher: number
}

const initialState: IData = {
    isLoading: false,
    refresher: 0
}

const globalState = createSlice({
    name: 'global',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = !state.isLoading
        },
        finishLoading: (state) => {
            state.isLoading = !state.isLoading
        },
        refresh: (state) => {
            state.refresher += 1
        }
    }
})

export const globalSlice = globalState.reducer
export const { startLoading, finishLoading, refresh } = globalState.actions