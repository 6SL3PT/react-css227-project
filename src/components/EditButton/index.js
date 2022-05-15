import { useState } from 'react'
import { IconButton } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

import style from './style.module.css'
import useClickOutside from '../useClickOutside'
import UserEdit from './UserEditForm/form'
import TrackEdit from './TrackEditForm/form'
import PlaylistEdit from './PlaylistEditForm/form'

const EditButton = ({ type, data }) => {
    const [isActive, setIsActive] = useState(false)

    const domNode = useClickOutside(() => {
        setIsActive(false)
    })

    return (
        <>
            <IconButton onClick={() => setIsActive(true)}>
                {type === 'user' ? <AdminPanelSettingsIcon /> : <EditRoundedIcon />}
            </IconButton>
            {isActive && (
                <div className={style.Edit_containerWrapper}>
                    <div
                        className={`${style.EditContainer} ${style.___isExpanded}`}
                        style={{
                            margin: type === 'user' ? '30vh auto 0 auto' : '10vh auto 0 auto',
                        }}
                        ref={domNode}
                    >
                        {type === 'user' && <UserEdit setIsActive={setIsActive} userData={data} />}
                        {type === 'track' && (
                            <TrackEdit setIsActive={setIsActive} trackData={data} />
                        )}
                        {type === 'playlist' && (
                            <PlaylistEdit setIsActive={setIsActive} playlistData={data} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default EditButton
