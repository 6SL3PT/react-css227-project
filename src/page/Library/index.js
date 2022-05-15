import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

import style from './style.module.css'
import { createPlaylist, getUserPlaylist } from '../../redux/playlist/playlistSlice'
import PlaylistFrame from '../../component/PlaylistFrame'

const Library = () => {
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlist)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreatePlaylist = () => {
        const body = {
            name: `My Playlist #${playlists.length + 1}`,
            user: userData._id,
            desc: '',
            tracks: [],
            img: '',
        }
        dispatch(createPlaylist(body))
    }

    useEffect(() => {
        user && dispatch(getUserPlaylist())
    }, [user, dispatch])

    document.title = 'Library - Vein'

    return (
        <div id={style.Library}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>

            <h3>Playlists</h3>

            <div className={style.elementWrapper_container}>
                <div className={style.playlistContainer_frameWrapper}>
                    <div id={style.Library_favTrack} onClick={() => navigate('/favorite')}>
                        <h1>Favorite Tracks</h1>
                        {userData.favList && <p>{userData.favList.length} Tracks</p>}
                    </div>
                    {playlists &&
                        playlists.length !== 0 &&
                        playlists.map((playlist) => (
                            <Fragment key={playlist._id}>
                                <PlaylistFrame playlist={playlist} />
                            </Fragment>
                        ))}
                    <div id={style.Library_createPlaylist} onClick={() => handleCreatePlaylist()}>
                        <AddRoundedIcon />
                        <p>Create Playlist</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Library
