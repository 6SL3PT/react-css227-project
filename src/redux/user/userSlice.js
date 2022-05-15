import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    userData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await userService.getUser(token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateFavTrack = createAsyncThunk('user/updateFavTrack', async (trackId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await userService.updateFavTrack(trackId, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk('user/updateUser', async (body, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await userService.updateUser(body, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.userData = []
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
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getUser.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.userData = action.payload
            })
            .addCase(updateFavTrack.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateFavTrack.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateFavTrack.fulfilled, (state, action) => {
                const index = state.userData.favList.indexOf(action.payload)
                index === -1
                    ? state.userData.favList.push(action.payload)
                    : state.userData.favList.splice(index, 1)
                state.isLoading = false
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userData = action.payload
            })
    },
})

export const { reset, generalStateReset } = userSlice.actions
export default userSlice.reducer
