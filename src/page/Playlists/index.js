import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from './style.module.css'
import { getAllPlaylist } from '../../redux/playlist/playlistSlice'
import PlaylistTable from '../../components/Table/PlaylistTable'
import AddButton from '../../components/AddButton'

const Playlists = () => {
    const { user } = useSelector((state) => state.auth)
    const { playlistsData } = useSelector((state) => state.playlist)
    const dispatch = useDispatch()

    const totalPlaylist = playlistsData.length
    const totalTrack = playlistsData
        .map((playlist) => playlist.tracks.length)
        .reduce((a, b) => a + b, 0)
    const maxTrack = playlistsData
        .map((playlist) => playlist.tracks.length)
        .reduce((a, b) => (a = a > b ? a : b), 0)

    useEffect(() => {
        playlistsData.length === 0 && user && dispatch(getAllPlaylist())
    }, [playlistsData, user, dispatch])

    return (
        <div id={style.Playlist}>
            {playlistsData && (
                <div className={style.Playlist_elementWrapper}>
                    <div className={style.PlaylistHeader}>
                        <h1>Playlists</h1>
                        <AddButton type="playlist" />
                    </div>
                    <div className={style.Playlist_paperWrapper}>
                        <Paper className={style.ElementPaper}>
                            <h4>Playlists Detail Overview</h4>
                            <table id={style.OverviewTable}>
                                <tbody>
                                    <tr>
                                        <td>Total Playlist :</td>
                                        <td>{totalPlaylist}</td>
                                    </tr>
                                    <tr>
                                        <td>Most Tracks in Playlist :</td>
                                        <td>{maxTrack}</td>
                                    </tr>
                                    <tr>
                                        <td>Avg. Tracks / Playlist :</td>
                                        <td>{(totalTrack / totalPlaylist).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Paper>
                        <Paper className={style.ElementPaper}>
                            <h4>Playlists List</h4>
                            <PlaylistTable
                                playlistsData={playlistsData}
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

export default Playlists
