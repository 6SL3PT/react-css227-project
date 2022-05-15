import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

import FeatureTrack from './FeatureTrack'
import TopTrack from './TopTrack'
import logo from '../../images/logo_white.svg'
import style from './style.module.css'

const Home = () => {
    const [featureIsSearching, setFeatureIsSearching] = useState(false)
    const [featureTrackFirstRow, setFeatureTrackFirstRow] = useState([])
    const [featureTrackSecondRow, setFeatureTrackSecondRow] = useState([])
    const [topIsSearching, setTopIsSearching] = useState(false)
    const [topTrack, setTopTrack] = useState([])

    const getFeatureTrack = async () => {
        try {
            setFeatureIsSearching(true)
            const url = process.env.REACT_APP_API_URL + '/track'
            const { data } = await axios.get(url)
            const firstRow = data.data.splice(0, 5)
            const secondRow = data.data.splice(0, 5)
            setFeatureTrackFirstRow(firstRow)
            setFeatureTrackSecondRow(secondRow)
            setFeatureIsSearching(false)
        } catch (error) {
            setFeatureIsSearching(false)
        }
    }

    const getTopTrack = async () => {
        try {
            setTopIsSearching(true)
            const url = process.env.REACT_APP_API_URL + '/track/top'
            const { data } = await axios.get(url)
            setTopTrack(data.data.splice(0, 3))
            setTopIsSearching(false)
        } catch (error) {
            setTopIsSearching(false)
        }
    }

    useEffect(() => {
        getFeatureTrack()
        getTopTrack()
    }, [])

    document.title = 'Vein - Music Streaming'

    return (
        <div id={style.Home}>
            <section id={style.Showcase}>
                <div className={style.Container}>
                    <img src={logo} />
                    <h1>Music in Our Vein</h1>
                    <p>
                        Explore, discover, and share mix of music from many artists around the
                        world.
                    </p>
                    <Link to="/register">
                        <button>Sign up for free</button>
                    </Link>
                </div>
            </section>
            <div className={style.Container}>
                <section id={style.Container_main}>
                    <h1>Featured Tracks</h1>
                    <div className={style.FeatureTrack_wrapper}>
                        {featureIsSearching && (
                            <div className={style.FeatureProgress_container}>
                                <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                            </div>
                        )}
                        {featureTrackFirstRow.length !== 0 && (
                            <div className={style.FeatureTrack_container}>
                                {featureTrackFirstRow.map((track) => (
                                    <Fragment key={track._id}>
                                        <FeatureTrack track={track} />
                                    </Fragment>
                                ))}
                            </div>
                        )}
                        {featureTrackSecondRow.length !== 0 && (
                            <div className={style.FeatureTrack_container}>
                                {featureTrackSecondRow.map((track) => (
                                    <Fragment key={track._id}>
                                        <FeatureTrack track={track} />
                                    </Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className={style.DiscoverBtn_wrapper}>
                        <Link to="/discovery">
                            <button onClick={() => window.scrollTo(0, 0)}>
                                Explore more tracks
                            </button>
                        </Link>
                    </div>
                </section>
                <aside id={style.Container_sidebar}>
                    <h1>Top Favorite Tracks</h1>
                    {topIsSearching && (
                        <div className={style.TopProgress_container}>
                            <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                        </div>
                    )}
                    {topTrack.length !== 0 && (
                        <div className={style.TopTrack_container}>
                            {topTrack.map((track) => (
                                <Fragment key={track._id}>
                                    <TopTrack track={track} />
                                </Fragment>
                            ))}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default Home
