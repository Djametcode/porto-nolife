import { createSlice } from "@reduxjs/toolkit";

interface IData {
    isLoading: boolean;
}

const initialState: IData = {
    isLoading: false
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
        }
    }
})

export const globalSlice = globalState.reducer
export const { startLoading, finishLoading } = globalState.actions