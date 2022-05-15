import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

import { setCurrentTrack, addQueue, clearQueue } from '../../redux/player/playerSlice'
import style from './style.module.css'

const PlaylistPlayButton = ({ tracks, playlistId }) => {
    const { currentTrack } = useSelector((state) => state.player)
    const dispatch = useDispatch()

    const handlePlay = () => {
        if (
            currentTrack &&
            currentTrack.playlist &&
            currentTrack.action === 'play' &&
            currentTrack.playlist === playlistId
        ) {
            const payload = {
                track: currentTrack.track,
                playlist: playlistId,
                action: 'pause',
            }
            dispatch(setCurrentTrack(payload))
        } else {
            const payload = {
                track: tracks[0],
                playlist: playlistId,
                action: 'play',
            }
            dispatch(setCurrentTrack(payload))
            dispatch(clearQueue())
            tracks.map((track) => dispatch(addQueue({ track: track, playlist: playlistId })))
        }
    }

    return (
        <IconButton id={style.PlaylistPlayBtn} onClick={handlePlay}>
            {currentTrack &&
            currentTrack.playlist &&
            currentTrack.action === 'play' &&
            currentTrack.playlist === playlistId ? (
                <PauseIcon />
            ) : (
                <PlayArrowIcon />
            )}
        </IconButton>
    )
}

export default PlaylistPlayButton
