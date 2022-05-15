import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentTrack: null,
    queue: [],
}

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload
        },
        addQueue: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.queue = [...state.queue, ...action.payload]
            } else {
                state.queue = [...state.queue, action.payload]
            }
        },
        clearQueue: (state) => {
            state.queue = []
        },
    },
})

export const { setCurrentTrack, addQueue, clearQueue } = playerSlice.actions

export default playerSlice.reducer
