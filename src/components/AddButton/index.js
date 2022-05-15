import { useState } from 'react'
import AudioFileIcon from '@mui/icons-material/AudioFile'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'

import style from './style.module.css'
import useClickOutside from '../useClickOutside'
import AddUser from './AddUserForm/form'
import AddTrack from './AddTrackForm/form'
import AddPlaylist from './AddPlaylistForm/form'
import AddTrackToPlaylist from './AddTrackToPlaylist'

const AddButton = ({ type, playlist }) => {
    const [isActive, setIsActive] = useState(false)

    const domNode = useClickOutside(() => {
        setIsActive(false)
    })

    return (
        <>
            <button
                className={`${style.AddButton} ${type === 'trackToPlaylist' && style.___isShrink}`}
                onClick={() => setIsActive(true)}
            >
                {type === 'user' && (
                    <>
                        <PersonAddAltRoundedIcon />
                        Add New User
                    </>
                )}
                {type === 'track' && (
                    <>
                        <AudioFileIcon /> Add New Track
                    </>
                )}
                {type === 'playlist' && (
                    <>
                        <PlaylistAddIcon /> Add New Playlist
                    </>
                )}
                {type === 'trackToPlaylist' && (
                    <>
                        <AddCircleRoundedIcon /> Add
                    </>
                )}
            </button>
            {isActive && (
                <div className={style.AddForm_containerWrapper}>
                    <div className={style.AddFormContainer} ref={domNode}>
                        {type === 'user' && <AddUser setIsActive={setIsActive} />}
                        {type === 'track' && <AddTrack setIsActive={setIsActive} />}
                        {type === 'playlist' && <AddPlaylist setIsActive={setIsActive} />}
                        {type === 'trackToPlaylist' && (
                            <AddTrackToPlaylist setIsActive={setIsActive} playlist={playlist} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default AddButton
