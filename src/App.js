import { Navigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'

import AudioPlayer from './component/AudioPlayer/index'
import Footer from './component/Footer/index'
import Navbar from './component/Navbar/index'
import Home from './page/Home/index'
import Register from './page/Register/index'
import Profile from './page/Profile'
import ErrorPage from './page/Error/index'
import SignIn from './page/SignIn/index'
import Discovery from './page/Discovery/index'
import Search from './page/Search/index'
import Library from './page/Library/index'
import Playlist from './page/Playlist/index'
import Track from './page/Track/index'
import Favorite from './page/Favorite'

const App = () => {
    const location = useLocation()
    const { user } = useSelector((state) => state.auth)
    const { currentTrack } = useSelector((state) => state.player)

    return (
        <Fragment>
            {location.pathname !== '/register' &&
                location.pathname !== '/login' &&
                location.pathname !== '/not-found' && (
                    <Fragment>
                        <Navbar />
                        {location.pathname !== '/profile' && currentTrack && <AudioPlayer />}
                    </Fragment>
                )}
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/search" element={<Search />} />
                {!user && <Route path="/profile" element={<Navigate to="/login" replace />} />}
                {!user && <Route path="/library" element={<Navigate to="/login" replace />} />}
                {!user && <Route path="/favorite" element={<Navigate to="/login" replace />} />}
                {user && <Route path="/register" element={<Navigate to="/discovery" replace />} />}
                {user && <Route path="/login" element={<Navigate to="/discovery" replace />} />}
                <Route path="/profile" element={<Profile />} />
                <Route path="/library" element={<Library />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/playlist/:playlistId" exact element={<Playlist />} />
                <Route path="/track/:trackId" exact element={<Track />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/not-found" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>

            <Footer />
        </Fragment>
    )
}

export default App
