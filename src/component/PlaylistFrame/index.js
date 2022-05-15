import { useNavigate } from 'react-router-dom'

import style from './style.module.css'
import default_img from '../../images/default_img.png'

const PlaylistFrame = ({ playlist }) => {
    const navigate = useNavigate()

    const handleImageError = (e) => {
        e.target.src = default_img
    }

    return (
        <div
            className={style.Playlist_container}
            onClick={() => (window.scrollTo(0, 0), navigate(`/playlist/${playlist._id}`))}
        >
            <div className={style.Playlist_mainWrapper}>
                <img
                    id="playlistImg"
                    src={playlist.img ? playlist.img : default_img}
                    onError={handleImageError}
                    className={style.Playlist_image}
                />
            </div>
            <p className={style.Playlist_name}>{playlist.name}</p>
            <p className={style.Playlist_desc}>
                {playlist.desc ? playlist.desc : "Playlist by Vein's User"}
            </p>
        </div>
    )
}

export default PlaylistFrame
