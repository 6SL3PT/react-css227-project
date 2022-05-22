import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

import { setCurrentTrack, addQueue, clearQueue } from '../../redux/player/playerSlice'
import style from './style.module.css'

const PlayButton = ({ track }) => {
    const { currentTrack } = useSelector((state) => state.player)
    const dispatch = useDispatch()

    const handlePlay = () => {
        if (
            currentTrack &&
            currentTrack.track &&
            currentTrack.action === 'play' &&
            currentTrack.track._id === track._id
        ) {
            const payload = {
                track: track,
                action: 'pause',
            }
            dispatch(setCurrentTrack(payload))
        } else {
            const payload = {
                track: track,
                action: 'play',
            }
            dispatch(setCurrentTrack(payload))
            dispatch(clearQueue())
            dispatch(addQueue(track))
        }
    }

    return (
        <IconButton id={style.PlayBtn} onClick={handlePlay}>
            {currentTrack &&
            currentTrack.track &&
            currentTrack.action === 'play' &&
            currentTrack.track._id === track._id ? (
                <PauseIcon />
            ) : (
                <PlayArrowIcon />
            )}
        </IconButton>
    )
}

export default PlayButton
