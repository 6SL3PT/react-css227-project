import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import playlistService from './playlistService'

const initialState = {
    playlistsData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const getAllPlaylist = createAsyncThunk('playlist/getAllPlaylist', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await playlistService.getAllPlaylist(token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addTrack = createAsyncThunk('playlist/addTrack', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await playlistService.addTrack(body, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const removeTrack = createAsyncThunk('playlist/removeTrack', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await playlistService.removeTrack(body, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updatePlaylist = createAsyncThunk(
    'playlist/updatePlaylist',
    async (body, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await playlistService.updatePlaylist(body._id, body.data, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const createPlaylist = createAsyncThunk(
    'playlist/createPlaylist',
    async (body, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await playlistService.createPlaylist(body, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const deletePlaylist = createAsyncThunk(
    'playlist/deletePlaylist',
    async (playlistId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user
            return await playlistService.deletePlaylist(playlistId, token)
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        reset: (state) => {
            state.playlistsData = []
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        resetError: (state) => {
            state.isError = false
            state.message = ''
        },
        generalStateReset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPlaylist.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(getAllPlaylist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllPlaylist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.playlistsData = action.payload
            })
            .addCase(addTrack.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(addTrack.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addTrack.fulfilled, (state, action) => {
                const playlists = current(state.playlistsData)
                const index = playlists.map((playlist) => playlist._id).indexOf(action.payload._id)
                state.playlistsData[index] = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(removeTrack.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(removeTrack.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(removeTrack.fulfilled, (state, action) => {
                const playlists = current(state.playlistsData)
                const index = playlists.map((playlist) => playlist._id).indexOf(action.payload._id)
                state.playlistsData[index] = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(updatePlaylist.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(updatePlaylist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updatePlaylist.fulfilled, (state, action) => {
                const playlists = current(state.playlistsData)
                const index = playlists.map((playlist) => playlist._id).indexOf(action.payload._id)
                state.playlistsData[index] = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createPlaylist.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(createPlaylist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createPlaylist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.playlistsData.push(action.payload)
            })
            .addCase(deletePlaylist.pending, (state) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
                state.message = ''
            })
            .addCase(deletePlaylist.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePlaylist.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.playlistsData = action.payload
            })
    },
})

export const { reset, resetError, generalStateReset } = playlistSlice.actions
export default playlistSlice.reducer
