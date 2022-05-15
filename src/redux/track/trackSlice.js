import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import trackService from './trackService'

const initialState = {
    tracksData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const getAllTrack = createAsyncThunk('track/getAllTrack', async (_, thunkAPI) => {
    try {
        return await trackService.getAllTrack()
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addTrack = createAsyncThunk('track/addTrack', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await trackService.addTrack(body, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTrack = createAsyncThunk('track/updateTrack', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await trackService.updateTrack(body._id, body.data, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTrack = createAsyncThunk('track/deleteTrack', async (trackId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await trackService.deleteTrack(trackId, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.tracksData = []
            state.message = ''
        },
        generalStateReset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        resetError: (state) => {
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTrack.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getAllTrack.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getAllTrack.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tracksData = action.payload
            })
            .addCase(addTrack.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(addTrack.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(addTrack.fulfilled, (state, action) => {
                state.tracksData.push(action.payload)
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updateTrack.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(updateTrack.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(updateTrack.fulfilled, (state, action) => {
                const tracks = current(state.tracksData)
                const index = tracks.map((track) => track._id).indexOf(action.payload._id)
                state.tracksData[index] = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteTrack.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(deleteTrack.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteTrack.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tracksData = action.payload
            })
    },
})

export const { reset, generalStateReset, resetError } = trackSlice.actions
export default trackSlice.reducer
