import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import userReducer from './user/userSlice'
import trackReducer from './track/trackSlice'
import playlistReducer from './playlist/playlistSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        track: trackReducer,
        playlist: playlistReducer,
    },
})

export default store
