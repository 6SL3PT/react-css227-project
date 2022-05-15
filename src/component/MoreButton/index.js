import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from './style.module.css'
import { removeTrack } from '../../redux/playlist/playlistSlice'
import { setCurrentTrack, addQueue } from '../../redux/player/playerSlice'
import useClickOutside from '../useClickOutside'

const MoreButton = ({ tracks, playlist }) => {
    const [isActive, setIsActive] = useState(false)
    const { userData } = useSelector((state) => state.user)
    const { currentTrack } = useSelector((state) => state.player)
    const dispatch = useDispatch()

    const handleAddQueue = () => {
        if (!currentTrack) {
            if (Array.isArray(tracks)) {
                const payload = {
                    track: tracks[0],
                    action: 'play',
                }
                dispatch(setCurrentTrack(payload))
                dispatch(addQueue(tracks))
            } else {
                const payload = {
                    track: tracks,
                    action: 'play',
                }
                dispatch(setCurrentTrack(payload))
                dispatch(addQueue(tracks))
            }
        } else {
            dispatch(addQueue(tracks))
        }
    }

    const handleRemoveTrack = () => {
        const body = { playlist_id: playlist._id, track_id: tracks._id }
        dispatch(removeTrack(body))
    }

    const domNode = useClickOutside(() => {
        setIsActive(false)
    })

    return (
        <div id={style.MoreBtn} ref={domNode}>
            <IconButton onClick={() => setIsActive(!isActive)}>
                <MoreHorizIcon />
            </IconButton>

            {isActive && (
                <div
                    className={`${
                        playlist && playlist.user && playlist.user._id === userData._id
                            ? style.MoreOption_dropdown___isExpand
                            : style.MoreOption_dropdown
                    }`}
                >
                    <p onClick={() => (handleAddQueue(), setIsActive(false))}>Add to queue</p>
                    {playlist && playlist.user && playlist.user._id === userData._id && (
                        <p onClick={() => (handleRemoveTrack(), setIsActive(false))}>
                            Remove from this playlist
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default MoreButton
