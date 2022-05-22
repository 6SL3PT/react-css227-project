import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import AddBoxIcon from '@mui/icons-material/AddBox'

import {
    addTrack,
    getUserPlaylist,
    createPlaylist,
    resetError,
} from '../../redux/playlist/playlistSlice'
import useClickOutside from '../useClickOutside'
import style from './style.module.css'

const AddTrackToPlaylist = ({ trackId, dropdownTranslate, fixedHeight }) => {
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)
    const { playlists, message, isError } = useSelector((state) => state.playlist)
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const dropdownMaxHeight = '258px'

    useEffect(() => {
        user && dispatch(getUserPlaylist())
    }, [user, dispatch])

    useEffect(() => {
        isError && toast.warn(message)
        dispatch(resetError())
    }, [isError, message, dispatch])

    const handleCreateTrack = () => {
        if (user) {
            const body = {
                name: `My Playlist #${playlists.length + 1}`,
                user: userData._id,
                desc: '',
                tracks: [trackId],
                img: '',
            }
            dispatch(createPlaylist(body))
        } else {
            toast.warn('This feature available after login')
        }
        setIsActive(false)
    }

    const handleAddTrack = (playlistId) => {
        if (user) {
            const body = { playlist_id: playlistId, track_id: trackId }
            dispatch(addTrack(body))
        } else {
            toast.warn('This feature available after login')
        }
        setIsActive(false)
    }

    const domNode = useClickOutside(() => {
        setIsActive(false)
    })

    return (
        <div className={style.PlaylistOption_container} ref={domNode}>
            <div className={style.PlaylistOption_btnWrapper}>
                <IconButton id={style.AddToPlaylist} onClick={() => setIsActive(!isActive)}>
                    <PlaylistAddIcon />
                </IconButton>
            </div>
            {isActive && (
                <div
                    className={style.PlaylistOption_optionWrapper}
                    style={{ transform: `translate(${dropdownTranslate})` }}
                >
                    <h4 id={style.OptionHeader}>Add to Playlist</h4>
                    <p id={style.AddNewPlaylist} onClick={() => handleCreateTrack()}>
                        <AddBoxIcon />
                        Add to new playlist
                    </p>
                    <div
                        id={style.OptionElement}
                        style={
                            fixedHeight
                                ? { height: dropdownMaxHeight }
                                : { maxHeight: dropdownMaxHeight }
                        }
                    >
                        {playlists.length !== 0 ? (
                            playlists.map((playlist) => (
                                <p key={playlist._id} onClick={() => handleAddTrack(playlist._id)}>
                                    {playlist.name}
                                </p>
                            ))
                        ) : (
                            <div className={style.OptionElement_noPlaylist}>
                                <p
                                    style={
                                        fixedHeight ? { paddingTop: '80px' } : { padding: '20px 0' }
                                    }
                                >
                                    You don't have any playlist yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddTrackToPlaylist
