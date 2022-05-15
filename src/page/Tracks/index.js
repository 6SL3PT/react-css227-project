import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@mui/material'

import style from './style.module.css'
import { getAllTrack } from '../../redux/track/trackSlice'
import TrackTable from '../../components/Table/TrackTable'
import AddButton from '../../components/AddButton'

const Users = () => {
    const { user } = useSelector((state) => state.auth)
    const { tracksData } = useSelector((state) => state.track)
    const dispatch = useDispatch()

    const totalTrack = tracksData.length
    const totalFav = tracksData.map((track) => track.favAmount).reduce((a, b) => a + b, 0)
    const totalDuration = tracksData.map((track) => track.duration).reduce((a, b) => a + b, 0)
    const genreCount = tracksData
        .map((track) => track.genre)
        .reduce((a, b) => ((a[b] = a[b] + 1 || 1), a), {})
    const genreTypeSort = Object.keys(genreCount)
        .sort((a, b) =>
            genreCount[a] == genreCount[b] ? a.localeCompare(b) : genreCount[b] - genreCount[a],
        )
        .reduce((a, b, index) => (index % 3 ? a[a.length - 1].push(b) : a.push([b])) && a, [])

    const formatDuration = (duration) => {
        const minute = Math.floor(duration / 60)
        const second = Math.floor(duration - minute * 60)
        const formattedSecond = ('0' + second).slice(-2)

        return `${minute}:${formattedSecond}`
    }

    useEffect(() => {
        tracksData.length === 0 && user && dispatch(getAllTrack())
    }, [user, tracksData, dispatch])

    return (
        <div id={style.Track}>
            {tracksData && (
                <div className={style.Track_elementWrapper}>
                    <div className={style.TrackHeader}>
                        <h1>Tracks</h1>
                        <AddButton type="track" />
                    </div>
                    <div className={style.Track_paperWrapper}>
                        <Paper className={style.ElementPaper}>
                            <h4>Tracks Detail Overview</h4>
                            <table id={style.OverviewTable}>
                                <tbody>
                                    <tr>
                                        <td>Total Track :</td>
                                        <td>{totalTrack}</td>
                                    </tr>
                                    <tr>
                                        <td>Avg. Favorites / Track :</td>
                                        <td>
                                            {totalFav &&
                                                totalTrack &&
                                                (totalFav / totalTrack).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Avg. Track Duration :</td>
                                        <td>
                                            {totalDuration &&
                                                totalTrack &&
                                                formatDuration(totalDuration / totalTrack) +
                                                    ` (${(totalDuration / totalTrack).toFixed(2)})`}
                                        </td>
                                    </tr>
                                    <tr className={style.OverviewTable_genreWrapper}>
                                        <td>Genre List (#Track) :</td>
                                        <td>
                                            {genreTypeSort.map((genres) => (
                                                <div
                                                    key={genres}
                                                    className={style.OverviewTable_genreListGrid}
                                                >
                                                    {genres.map((genre) => (
                                                        <p key={genre}>
                                                            {genreCount[genre]} - {genre}
                                                        </p>
                                                    ))}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Paper>
                        <Paper className={style.ElementPaper}>
                            <h4>Tracks List</h4>
                            <TrackTable
                                tracksData={tracksData}
                                headerEnable={true}
                                fullTable={true}
                                btnDisplay={true}
                                sortEnable={true}
                                textColor="black"
                                lineBreakColor="#e5e5e5"
                            />
                        </Paper>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users
