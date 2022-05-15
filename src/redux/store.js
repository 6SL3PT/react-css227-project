import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import authReducer from './auth/authSlice'
import playerReducer from './player/playerSlice'
import playlistReducer from './playlist/playlistSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        player: playerReducer,
        playlist: playlistReducer,
    },
})

export default store
