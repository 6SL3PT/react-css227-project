import { IconButton } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import style from './style.module.css'
import useClickOutside from '../useClickOutside'
import { deleteUser } from '../../redux/user/userSlice'
import { deleteTrack } from '../../redux/track/trackSlice'
import { deletePlaylist } from '../../redux/playlist/playlistSlice'

const DeleteButton = ({ type, id }) => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const handleDelete = () => {
        if (type === 'user') {
            dispatch(deleteUser(id))
        } else if (type === 'track') {
            dispatch(deleteTrack(id))
        } else if (type === 'playlist') {
            dispatch(deletePlaylist(id))
        }
        setIsActive(false)
    }

    const domNode = useClickOutside(() => {
        setIsActive(false)
    })

    return (
        <>
            <IconButton onClick={() => setIsActive(true)}>
                <DeleteRoundedIcon />
            </IconButton>
            {isActive && (
                <div className={style.Delete_containerWrapper}>
                    <div className={style.DeleteContainer} ref={domNode}>
                        <div className={style.DeleteContainer_textWrapper}>
                            <h3>
                                Delete {type} {id}?
                            </h3>
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className={style.DeleteContainer_btnWrapper}>
                            <button onClick={() => setIsActive(false)}>CANCEL</button>
                            <button onClick={() => handleDelete()}>DELETE</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DeleteButton
