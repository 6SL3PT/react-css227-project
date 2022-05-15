import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import axios from 'axios'

import style from './style.module.css'
import { deletePlaylist } from '../../redux/playlist/playlistSlice'
import PlaylistEdit from './Edit/form'
import PlaylistPlayButton from '../../component/PlaylistPlayButton'
import MoreButton from '../../component/MoreButton'
import TrackTable from '../../component/TrackTable'
import default_img from '../../images/default_img.png'
import useClickOutside from '../../component/useClickOutside'

const Playlist = () => {
    const { playlistId } = useParams()
    const [playlist, setPlaylist] = useState([])
    const [tracks, setTracks] = useState([])
    const [editActive, setEditActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlist)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const playlistInit = async (playlistId) => {
        try {
            const url = process.env.REACT_APP_API_URL + `/playlist/get/${playlistId}`
            const { data } = await axios.get(url)
            setPlaylist(data.data.playlist)
            setTracks(data.data.tracks)
        } catch (error) {
            navigate('/not-found')
        }
    }

    const handleSetPlaylist = (values) => {
        const data = {
            _id: playlist._id,
            name: values.name,
            user: playlist.user,
            desc: values.desc,
            tracks: playlist.tracks,
            img: values.img,
        }
        setPlaylist(data)
    }

    const handleDeletePlaylist = () => {
        dispatch(deletePlaylist(playlistId))
        navigate('/library')
    }

    const handleEditPopUp = (isActive) => {
        setEditActive(isActive)
    }

    useEffect(() => {
        const index = playlists.map((playlist) => playlist._id).indexOf(playlistId)
        index !== -1 ? playlistInit(playlists[index]._id) : playlistInit(playlistId)
    }, [playlists, playlistId])

    const domNode = useClickOutside(() => {
        setEditActive(false)
    })

    const handleImageError = (e) => {
        e.target.src = default_img
    }

    return (
        <div id={style.Playlist}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>

            <div className={style.PlaylistContentWrapper}>
                {playlist && playlist.user && (
                    <div className={style.PlaylistContent_playlistDetailWrapper}>
                        <div className={style.PlaylistDetail_topElementWrapper}>
                            <img
                                src={playlist.img ? playlist.img : default_img}
                                onError={handleImageError}
                            />
                            <div className={style.PlaylistDetail_topElement}>
                                <div className={style.PlaylistDetail_previewText}>
                                    <p id={style.Type}>PLAYLIST</p>
                                    <h1>{playlist.name}</h1>
                                    <div className={style.PreviewText_subDetail}>
                                        <div className={style.SubDetail_authorName}>
                                            <p>
                                                by{' '}
                                                {playlist.user.adminRights
                                                    ? 'Vein'
                                                    : playlist.user.username}
                                            </p>
                                            {playlist.user && playlist.user.adminRights && (
                                                <CheckCircleIcon />
                                            )}
                                        </div>
                                        <p className={style.SubDetail_trackAmount}>
                                            <MusicNoteIcon />
                                            {playlist.tracks && playlist.tracks.length} tracks
                                        </p>
                                    </div>
                                </div>
                                <div className={style.PlaylistDetail_btnControl}>
                                    <PlaylistPlayButton tracks={tracks} playlistId={playlistId} />
                                    {playlist.user._id === userData._id && (
                                        <>
                                            <IconButton
                                                style={{ color: 'white' }}
                                                onClick={() => setEditActive(!editActive)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{ color: 'white' }}
                                                onClick={() => setDeleteActive(!deleteActive)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                    {playlist.tracks && <MoreButton tracks={tracks} />}
                                </div>
                            </div>
                        </div>
                        {editActive && (
                            <div className={style.PlaylistPopupWrapper}>
                                <div className={style.PlaylistEdit_mainElement} ref={domNode}>
                                    <PlaylistEdit
                                        handleEditPopUp={handleEditPopUp}
                                        handleSetPlaylist={handleSetPlaylist}
                                        playlist={playlist}
                                    />
                                </div>
                            </div>
                        )}
                        {deleteActive && (
                            <div className={style.PlaylistPopupWrapper}>
                                <div className={style.PlaylistDelete_mainElement} ref={domNode}>
                                    <h3>Delete {playlist.name}?</h3>
                                    <p>This action cannot be undone.</p>
                                    <button
                                        onClick={() => setDeleteActive(false)}
                                        id={style.CancelBtn}
                                    >
                                        CANCEL
                                    </button>
                                    <button onClick={() => handleDeletePlaylist()}>DELETE</button>
                                </div>
                            </div>
                        )}
                        <div className={style.PlaylistContent_bottomElementWrapper}>
                            <h3>About</h3>
                            <div className={style.PlaylistAboutWrapper}>
                                {playlist.desc ? (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: playlist.desc.replace(
                                                new RegExp('\u000a', 'g'),
                                                '<br>',
                                            ),
                                        }}
                                    />
                                ) : (
                                    <p>This playlist does not have description.</p>
                                )}
                            </div>
                            <h3>Tracks</h3>

                            <div className={style.PlaylistTracksWrapper}>
                                {playlist.tracks && playlist.tracks.length !== 0 ? (
                                    <TrackTable
                                        tracksData={tracks}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                        playlist={playlist}
                                    />
                                ) : (
                                    <p>This playlist does not have track.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Playlist
