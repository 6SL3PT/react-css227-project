import { Navigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment } from 'react'

import Dashboard from './page/Dashboard'
import Sidebar from './components/Sidebar'
import SignIn from './page/SignIn'
import ErrorPage from './page/Error'
import Users from './page/Users'
import Tracks from './page/Tracks'
import Playlists from './page/Playlists'

const App = () => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()

    return (
        <Fragment>
            {user && location.pathname !== '/not-found' && (
                <Fragment>
                    <Sidebar />
                </Fragment>
            )}
            <Routes>
                <Route
                    exact
                    path="/"
                    element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<SignIn />} />
                {user && (
                    <Fragment>
                        <Route exact path="/dashboard" element={<Dashboard />} />
                        <Route exact path="/user" element={<Users />} />
                        <Route exact path="/track" element={<Tracks />} />
                        <Route exact path="/playlist" element={<Playlists />} />
                        <Route path="/not-found" element={<ErrorPage />} />
                        <Route path="*" element={<Navigate to="/not-found" replace />} />
                    </Fragment>
                )}
                {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
            </Routes>
        </Fragment>
    )
}

export default App
