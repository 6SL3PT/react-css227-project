import Helmet from 'react-helmet'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { toast } from 'react-toastify'
import axios from 'axios'

import style from './style.module.css'
import MoreButton from '../../component/MoreButton'
import TrackTable from '../../component/TrackTable'

const Favorite = () => {
    const [tracks, setTracks] = useState([])
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)
    const navigate = useNavigate()

    const favInit = async () => {
        try {
            const url = process.env.REACT_APP_API_URL + '/track/like'
            const { data } = await axios.get(url, {
                headers: {
                    'x-auth-token': user,
                },
            })
            setTracks(data.data)
        } catch (error) {
            toast.error('Something went wrong!')
            navigate('/discovery')
        }
    }

    useEffect(() => {
        favInit()
    })

    return (
        <div id={style.Favorite}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>

            <div className={style.FavContentWrapper}>
                {userData.favList && (
                    <div className={style.FavContent_favDetailWrapper}>
                        <div className={style.FavDetail_topElementWrapper}>
                            <div className={style.FavDetail_image}>
                                <FavoriteRoundedIcon />
                            </div>
                            <div className={style.FavDetail_topElement}>
                                <div className={style.FavDetail_previewText}>
                                    <p id={style.Type}>PLAYLIST</p>
                                    <h1>Favorite Tracks</h1>
                                    <p id={style.Author}>
                                        by {userData.username} <MusicNoteIcon />
                                        {userData.favList.length} tracks
                                    </p>
                                </div>
                                <div className={style.FavDetail_btnControl}>
                                    {/* <PlaylistPlayButton tracks={playlist.tracks} /> */}
                                    <MoreButton tracks={tracks} />
                                </div>
                            </div>
                        </div>

                        <div className={style.FavContent_bottomElementWrapper}>
                            <div className={style.FavTracksWrapper}>
                                {userData.favList.length !== 0 ? (
                                    <TrackTable
                                        tracksData={tracks}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                    />
                                ) : (
                                    <p>You still not have favorite tracks yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorite
