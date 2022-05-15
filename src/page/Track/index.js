import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import style from './style.module.css'
import PlayButton from '../../component/PlayButton'
import FavoriteBotton from '../../component/FavoriteButton'
import AddTrackToPlaylist from '../../component/AddTrackToPlaylist'
import MoreButton from '../../component/MoreButton'
import default_img from '../../images/default_img.png'

const Track = () => {
    const { trackId } = useParams()
    const [track, setTrack] = useState([])
    const navigate = useNavigate()

    const formatDuration = (duration) => {
        const minute = Math.floor(duration / 60)
        const second = Math.floor(duration - minute * 60)
        const formattedSecond = ('0' + second).slice(-2)

        return `${minute}:${formattedSecond}`
    }

    const trackInit = async (trackId) => {
        try {
            const url = process.env.REACT_APP_API_URL + `/track/get/${trackId}`
            const { data } = await axios.get(url)
            setTrack(data.data)
        } catch (error) {
            navigate('/not-found')
        }
    }

    useEffect(() => {
        trackInit(trackId)
    }, [trackId])

    const handleImageError = (e) => {
        e.target.src = default_img
    }

    document.title = `${track.artist} | ${track.name} - Vein`

    return (
        <div id={style.Track}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>
            <div className={style.TrackContentWrapper}>
                {track && (
                    <div className={style.TrackContent_trackDetailWrapper}>
                        <div className={style.TrackDetail_topElementWrapper}>
                            <img src={track.img} onError={handleImageError} />
                            <div className={style.TrackDetail_topElement}>
                                <div className={style.TrackDetail_previewText}>
                                    <p id={style.Type}>TRACK</p>
                                    <h1>{track.name}</h1>
                                    <p>{track.artist}</p>
                                </div>
                                <div className={style.TrackDetail_btnControl}>
                                    <PlayButton track={track} />
                                    <div id={style.TrackBtn_favBtn}>
                                        <FavoriteBotton trackId={track._id} />
                                    </div>
                                    <AddTrackToPlaylist
                                        trackId={track._id}
                                        dropdownTranslate={'-170px, 325px'}
                                        fixedHeight={true}
                                    />
                                    <MoreButton tracks={track} />
                                </div>
                            </div>
                        </div>
                        <div className={style.TrackDetail_bottomElement}>
                            <h2>Track's Detail</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className={style.BottomElement_type}>Name:</td>
                                        <td className={style.BottomElement_data}>{track.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.BottomElement_type}>Artist:</td>
                                        <td className={style.BottomElement_data}>{track.artist}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.BottomElement_type}>Duration:</td>
                                        <td className={style.BottomElement_data}>
                                            {formatDuration(track.duration)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={style.BottomElement_type}>Genre:</td>
                                        <td className={style.BottomElement_data}>{track.genre}</td>
                                    </tr>
                                    <tr>
                                        <td className={style.BottomElement_type}>
                                            Total Favorite:
                                        </td>
                                        <td className={style.BottomElement_data}>
                                            {track.favAmount}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {track.lyric && (
                    <div className={style.TrackContent_trackLyricWrapper}>
                        <h2>Lyric</h2>
                        <div className={style.TrackLyric_frame}>
                            <div
                                className={style.TrackLyric_body}
                                dangerouslySetInnerHTML={{
                                    __html: track.lyric.replace(
                                        new RegExp('\u000a', 'g'),
                                        '<br><br>',
                                    ),
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Track
