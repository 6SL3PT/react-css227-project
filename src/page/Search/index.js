import { Helmet } from 'react-helmet'
import { Fragment, useState } from 'react'
import { CircularProgress } from '@mui/material'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import axios from 'axios'

import style from './style.module.css'
import TrackTable from '../../component/TrackTable'
import PlaylistFrame from '../../component/PlaylistFrame'

const Search = () => {
    const [searchInput, setSearchInput] = useState('')
    const [result, setResult] = useState({})
    const [isSearching, setIsSearching] = useState(false)
    const [trackDisplayAll, setTrackDisplayAll] = useState(false)
    const [artistDisplayAll, setArtistDisplayAll] = useState(false)
    const [playlistDisplayAll, setPlaylistDisplayAll] = useState(false)

    const handleSearch = async ({ currentTarget: input }) => {
        setSearchInput(input.value)
        setResult({})
        try {
            if (input.value) {
                setIsSearching(true)
                const url = process.env.REACT_APP_API_URL + `/?search=${input.value}`
                const { data } = await axios.get(url)
                setResult(data)
                setIsSearching(false)
            }
        } catch (error) {
            console.log(error)
            setIsSearching(false)
        }
    }

    document.title = 'Search - Vein'

    return (
        <div id={style.SearchPage}>
            <Helmet>
                <style>
                    {
                        'body {background: linear-gradient(180deg, #333333 60%, #000000 100%); background-attachment: fixed;}'
                    }
                </style>
            </Helmet>
            <div className={style.SearchBarWrapper_container}>
                <input
                    type="text"
                    placeholder="Artists, tracks or playlists"
                    id={style.SearchBar}
                    onChange={handleSearch}
                    value={searchInput}
                />
            </div>

            <div className={style.SearchResultWrapper_container}>
                {isSearching ? (
                    <div className={style.loadingWrapper_container}>
                        <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                    </div>
                ) : Object.keys(result).length !== 0 ? (
                    <div className={style.SearchResult_resultElementWrapper}>
                        <div className={style.SearchResult_headerGroup}>
                            <h3>Tracks</h3>
                            <p onClick={() => setTrackDisplayAll(!trackDisplayAll)}>
                                {trackDisplayAll ? 'Collapse' : 'See All'}
                            </p>
                        </div>
                        {result.tracks.length !== 0 ? (
                            trackDisplayAll ? (
                                <div className={style.TrackWrapper_container}>
                                    <TrackTable
                                        tracksData={result.tracks}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                    />
                                </div>
                            ) : (
                                <div className={style.TrackWrapper_container}>
                                    <TrackTable
                                        tracksData={result.tracks.slice(0, 5)}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                    />
                                </div>
                            )
                        ) : (
                            <div className={style.TrackWrapper_container}>
                                <div id={style.TrackNotFoundText}>
                                    <h3>No track results found for "{searchInput}"</h3>
                                    <p>
                                        Please make sure your words are spelled correctly, possibly
                                        that we do not have this track yet. We are sorry for the
                                        inconvenience.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className={style.SearchResult_headerGroup}>
                            <h3>Artist's Tracks</h3>
                            <p onClick={() => setArtistDisplayAll(!artistDisplayAll)}>
                                {artistDisplayAll ? 'Collapse' : 'See All'}
                            </p>
                        </div>
                        {result.artists.length !== 0 ? (
                            artistDisplayAll ? (
                                <div className={style.TrackWrapper_container}>
                                    <TrackTable
                                        tracksData={result.artists}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                    />
                                </div>
                            ) : (
                                <div className={style.TrackWrapper_container}>
                                    <TrackTable
                                        tracksData={result.artists.slice(0, 5)}
                                        favAmountEnable={false}
                                        sortEnable={true}
                                    />
                                </div>
                            )
                        ) : (
                            <div className={style.TrackWrapper_container}>
                                <div id={style.TrackNotFoundText}>
                                    <h3>No track results found for artist "{searchInput}"</h3>
                                    <p>
                                        Please make sure your words are spelled correctly, possibly
                                        that we do not have this artist's tracks yet. We are sorry
                                        for the inconvenience.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className={style.SearchResult_headerGroup}>
                            <h3>Playlists</h3>
                            <p onClick={() => setPlaylistDisplayAll(!playlistDisplayAll)}>
                                {playlistDisplayAll ? 'Collapse' : 'See All'}
                            </p>
                        </div>
                        {result.playlists.length !== 0 ? (
                            <div
                                className={`${style.playlistWrapper_container} ${
                                    playlistDisplayAll && style.___displayAll
                                }`}
                            >
                                <div className={style.playlistContainer_frameWrapper}>
                                    {result.playlists.map((playlist) => (
                                        <Fragment key={playlist._id}>
                                            <PlaylistFrame playlist={playlist} />
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={style.TrackWrapper_container}>
                                <div id={style.TrackNotFoundText}>
                                    <h3>No playlist results found for "{searchInput}"</h3>
                                    <p>
                                        Please make sure your words are spelled correctly or use
                                        less or different keywords.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div id={style.InitiateSearchText}>
                        <ManageSearchRoundedIcon />
                        Enter tracks, artists, or playlist name to search.
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
