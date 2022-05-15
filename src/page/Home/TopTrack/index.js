import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import PlayButton from '../../../component/PlayButton/index'
import style from './style.module.css'

const TopTrack = ({ track }) => {
    const navigate = useNavigate()

    const formatDuration = (duration) => {
        const minute = Math.floor(duration / 60)
        const second = Math.floor(duration - minute * 60)
        const formattedSecond = ('0' + second).slice(-2)

        return `${minute}:${formattedSecond}`
    }

    return (
        <div className={style.TopTrack_container}>
            <div className={style.TopTrack_imageWrapper}>
                <img
                    src={track.img}
                    className={style.TopTrack_image}
                    onClick={() => (window.scrollTo(0, 0), navigate(`/track/${track._id}`))}
                />
            </div>
            <div className={style.TopTrack_textWrapper}>
                <p
                    className={style.TopTrack_name}
                    onClick={() => (window.scrollTo(0, 0), navigate(`/track/${track._id}`))}
                >
                    {track.name}
                </p>
                <p className={style.TopTrack_artist}>{track.artist}</p>
                <p className={style.TopTrack_favAmount}>
                    Total Favorite: &nbsp;&nbsp;{track.favAmount}
                </p>
                <div className={style.TopTrack_btnWrapper}>
                    <Fragment key={track}>
                        <PlayButton track={track} />
                    </Fragment>
                    {formatDuration(track.duration)}
                </div>
            </div>
        </div>
    )
}

export default TopTrack
