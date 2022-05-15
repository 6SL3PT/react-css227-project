import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PlayButton from '../../../component/PlayButton/index'
import style from './style.module.css'

const FeatureTrack = ({ track }) => {
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()

    return (
        <div className={style.FeatureTrack_container}>
            <div
                className={style.FeatureTrack_mainWrapper}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img src={track.img} className={style.FeatureTrack_image} />
                <div
                    className={`${
                        isHover
                            ? style.FeatureTrack_btnWrapper
                            : style.FeatureTrack_btnWrapper___isHide
                    }`}
                >
                    <div id={style.PlayBtn}>
                        <Fragment key={track}>
                            <PlayButton track={track} />
                        </Fragment>
                    </div>
                </div>
            </div>
            <p
                className={style.FeatureTrack_name}
                onClick={() => (window.scrollTo(0, 0), navigate(`/track/${track._id}`))}
            >
                {track.name}
            </p>
            <p className={style.FeatureTrack_artist}>{track.artist}</p>
        </div>
    )
}

export default FeatureTrack
