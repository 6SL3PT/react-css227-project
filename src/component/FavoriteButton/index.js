import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

import { updateFavTrack } from '../../redux/user/userSlice'
import style from './style.module.css'
import { IconButton } from '@mui/material'

const FavoriteButton = ({ trackId }) => {
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleFavorite = () => {
        user ? dispatch(updateFavTrack(trackId)) : toast.warn('This feature available after login')
    }

    return (
        <div id={style.FavBtn} onClick={() => handleFavorite()}>
            {user ? (
                userData.favList && userData.favList.indexOf(trackId) === -1 ? (
                    <IconButton>
                        <FavoriteBorderRoundedIcon id={style.NotLikedTrack} />
                    </IconButton>
                ) : (
                    <IconButton>
                        <FavoriteRoundedIcon id={style.LikedTrack} />
                    </IconButton>
                )
            ) : (
                <FavoriteBorderRoundedIcon />
            )}
        </div>
    )
}

export default FavoriteButton
