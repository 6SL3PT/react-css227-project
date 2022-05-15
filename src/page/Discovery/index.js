import { Fragment, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

import style from './style.module.css'
import PlaylistFrame from '../../component/PlaylistFrame'
import TrackTable from '../../component/TrackTable'

const Discovery = () => {
    const [playlistSearching, setPlaylistSearching] = useState(false)
    const [trackSearching, setTrackSearching] = useState(false)
    const [topTrackSearching, setTopTrackSearching] = useState(false)
    const [playlistDisplayAll, setPlaylistDisplayAll] = useState(false)
    const [trackDisplayAll, setTrackDisplayAll] = useState(false)
    const [topTrackDisplayAll, setTopTrackDisplayAll] = useState(false)

    const [playlists, setPlaylists] = useState([])
    const [tracksPreviewList, setTracksPreviewList] = useState([])
    const [tracksFullList, setTracksFullList] = useState([])
    const [topTrackPreviewList, setTopTrackPreviewList] = useState([])
    const [topTrackFullList, setTopTrackFullList] = useState([])

    const discoverPlaylist = async () => {
        try {
            setPlaylistSearching(true)
            const url = process.env.REACT_APP_API_URL + '/playlist/random'
            const { data } = await axios.get(url)
            setPlaylists(data.data)
            setPlaylistSearching(false)
        } catch (error) {
            setPlaylistSearching(false)
        }
    }

    const discoverTracks = async () => {
        try {
            setTrackSearching(true)
            const url = process.env.REACT_APP_API_URL + '/track/random'
            const { data } = await axios.get(url)
            setTracksFullList(data.data)
            setTracksPreviewList(data.data.slice(0, 5))
            setTrackSearching(false)
        } catch (error) {
            setTrackSearching(false)
        }
    }

    const mostFavTrack = async () => {
        try {
            setTopTrackSearching(true)
            const url = process.env.REACT_APP_API_URL + '/track/top'
            const { data } = await axios.get(url)
            setTopTrackFullList(data.data)
            setTopTrackPreviewList(data.data.slice(0, 5))
            setTopTrackSearching(false)
        } catch (error) {
            setTopTrackSearching(false)
        }
    }

    useEffect(() => {
        discoverTracks()
        discoverPlaylist()
        mostFavTrack()
    }, [])

    document.title = 'Vein - Discovery'

    return (
        <div id={style.Discovery}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>
            <section id={style.Showcase}>
                <div className={style.Container}>
                    <h1>VEIN DISCOVERY</h1>
                    <h3>DISCOVER AND EXPLORE THE MUSIC YOU LOVE</h3>
                </div>
            </section>

            <div className={style.Discover_playlistContainer}>
                <div className={style.Discover_headerGroup}>
                    <h3>Discover Playlists</h3>
                    <p onClick={() => setPlaylistDisplayAll(!playlistDisplayAll)}>
                        {playlistDisplayAll ? 'Collapse' : 'See All'}
                    </p>
                </div>
                {playlistSearching && (
                    <div className={style.loadingWrapper_container}>
                        <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                    </div>
                )}
                {playlists.length !== 0 && (
                    <div
                        className={`${style.playlistWrapper_container} ${
                            playlistDisplayAll && style.___displayAll
                        }`}
                    >
                        <div className={style.playlistContainer_frameWrapper}>
                            {playlists.map((playlist) => (
                                <Fragment key={playlist._id}>
                                    <PlaylistFrame playlist={playlist} />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={style.Discover_trackAndTopWrapper}>
                <div className={style.Discover_trackContainer}>
                    <div className={style.Discover_headerGroup}>
                        <h3>Discover Tracks</h3>
                        <p onClick={() => setTrackDisplayAll(!trackDisplayAll)}>
                            {trackDisplayAll ? 'Collapse' : 'See All'}
                        </p>
                    </div>
                    {trackSearching && (
                        <div className={style.trackWrapper_container}>
                            <div className={style.loadingWrapper_container}>
                                <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                            </div>
                        </div>
                    )}

                    {trackDisplayAll
                        ? tracksFullList.length !== 0 && (
                              <div className={style.trackWrapper_container}>
                                  <TrackTable
                                      tracksData={tracksFullList}
                                      favAmountEnable={false}
                                      sortEnable={true}
                                  />
                              </div>
                          )
                        : tracksPreviewList.length !== 0 && (
                              <div className={style.trackWrapper_container}>
                                  <TrackTable
                                      tracksData={tracksPreviewList}
                                      favAmountEnable={false}
                                      sortEnable={true}
                                  />
                              </div>
                          )}
                </div>

                <div className={style.Discover_trackContainer}>
                    <div className={style.Discover_headerGroup}>
                        <h3>Most Favorite Track</h3>
                        <p onClick={() => setTopTrackDisplayAll(!topTrackDisplayAll)}>
                            {topTrackDisplayAll ? 'Collapse' : 'See All'}
                        </p>
                    </div>
                    {topTrackSearching && (
                        <div className={style.trackWrapper_container}>
                            <div className={style.loadingWrapper_container}>
                                <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                            </div>
                        </div>
                    )}
                    {topTrackDisplayAll
                        ? topTrackFullList.length !== 0 && (
                              <div className={style.trackWrapper_container}>
                                  <TrackTable
                                      tracksData={topTrackFullList}
                                      favAmountEnable={true}
                                      sortEnable={false}
                                  />
                              </div>
                          )
                        : topTrackPreviewList.length !== 0 && (
                              <div className={style.trackWrapper_container}>
                                  <TrackTable
                                      tracksData={topTrackPreviewList}
                                      favAmountEnable={true}
                                      sortEnable={false}
                                  />
                              </div>
                          )}
                </div>
            </div>
        </div>
    )
}

export default Discovery
