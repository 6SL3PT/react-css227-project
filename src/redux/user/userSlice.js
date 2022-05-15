import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
    usersData: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const createUser = createAsyncThunk('auth/createUser', async (body, thunkAPI) => {
    try {
        return await userService.createUser(body)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllUser = createAsyncThunk('user/getAllUser', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await userService.getAllUser(token)
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
        return await userService.updateUser(body._id, body.data, token)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user
        return await userService.deleteUser(userId, token)
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
            state.usersData = []
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
            .addCase(createUser.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.usersData.push(action.payload)
            })
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getAllUser.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.usersData = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateUser.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const users = current(state.usersData)
                const index = users.map((user) => user._id).indexOf(action.payload._id)
                state.usersData[index] = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.usersData = action.payload
            })
    },
})

export const { reset, generalStateReset, resetError } = userSlice.actions
export default userSlice.reducer
