import { Paper } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded'
import FeaturedPlayListRoundedIcon from '@mui/icons-material/FeaturedPlayListRounded'

import style from './style.module.css'
import { getAllUser } from '../../redux/user/userSlice'
import { getAllTrack } from '../../redux/track/trackSlice'
import { getAllPlaylist } from '../../redux/playlist/playlistSlice'
import TrackTable from '../../components/Table/TrackTable'
import UserTable from '../../components/Table/UserTable'
import PlaylistTable from '../../components/Table/PlaylistTable'

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)
    const { usersData } = useSelector((state) => state.user)
    const { tracksData } = useSelector((state) => state.track)
    const { playlistsData } = useSelector((state) => state.playlist)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalFav = tracksData.map((track) => track.favAmount).reduce((a, b) => a + b, 0)
    const totalAdmin = usersData.map((user) => user.adminRights).filter(Boolean).length
    const totalPremium = usersData.map((user) => user.isPremium).filter(Boolean).length - totalAdmin // admin is premium user
    const totalTracks = playlistsData
        .map((playlist) => playlist.tracks.length)
        .reduce((a, b) => a + b, 0)

    useEffect(() => {
        user && (dispatch(getAllUser()), dispatch(getAllTrack()), dispatch(getAllPlaylist()))
    }, [user, dispatch])

    return (
        <div id={style.Dashboard}>
            {usersData.length !== 0 && playlistsData.length !== 0 && tracksData.length !== 0 ? (
                <div className={style.Dashboard_elementWrapper}>
                    <h1>Dashboard</h1>
                    <div className={style.Dashboard_paperWrapper}>
                        <Paper className={style.ElementPaper} onClick={() => navigate('/user')}>
                            <div className={style.ElementPaper_mainDetail}>
                                <GroupRoundedIcon />
                                <h4>User Total</h4>
                                <p>
                                    {usersData.length - totalAdmin} users, {totalAdmin + ' admin'}
                                </p>
                            </div>

                            <p className={style.ElementPaper_subDetail}>
                                {(totalPremium / (usersData.length - totalAdmin)).toFixed(2) * 100}%
                                of users are premium
                            </p>
                        </Paper>
                        <Paper className={style.ElementPaper} onClick={() => navigate('/track')}>
                            <div className={style.ElementPaper_mainDetail}>
                                <LibraryMusicRoundedIcon />
                                <h4>Track Total</h4>
                                <p>{tracksData.length} tracks</p>
                            </div>
                            <p className={style.ElementPaper_subDetail}>
                                Average {(totalFav / tracksData.length).toFixed(2)} favorites per
                                track
                            </p>
                        </Paper>
                        <Paper className={style.ElementPaper} onClick={() => navigate('/playlist')}>
                            <div className={style.ElementPaper_mainDetail}>
                                <FeaturedPlayListRoundedIcon />
                                <h4>Playlist Total</h4>
                                <p>{playlistsData.length} playlists</p>
                            </div>
                            <p className={style.ElementPaper_subDetail}>
                                Average {(totalTracks / playlistsData.length).toFixed(2)} tracks per
                                playlist
                            </p>
                        </Paper>
                    </div>
                    <div className={style.Dashboard_tableWrapper}>
                        <div className={style.ElementTable}>
                            <div className={style.ElementTable_textWrapper}>
                                <h4>Users List</h4>
                                <p onClick={() => navigate('/user')}>More Detail</p>
                            </div>
                            <div className={style.ElementTable_tableWrapper}>
                                <UserTable
                                    usersData={usersData}
                                    headerEnable={false}
                                    fullTable={false}
                                    btnDisplay={false}
                                    sortEnable={false}
                                    textColor="black"
                                    lineBreakColor="#e5e5e5"
                                />
                            </div>
                        </div>
                        <div className={style.ElementTable}>
                            <div className={style.ElementTable_textWrapper}>
                                <h4>Tracks List</h4>
                                <p onClick={() => navigate('/track')}>More Detail</p>
                            </div>
                            <div className={style.ElementTable_tableWrapper}>
                                <TrackTable
                                    tracksData={tracksData}
                                    headerEnable={false}
                                    fullTable={false}
                                    btnDisplay={false}
                                    sortEnable={false}
                                    textColor="black"
                                    lineBreakColor="#e5e5e5"
                                />
                            </div>
                        </div>
                        <div className={style.ElementTable}>
                            <div className={style.ElementTable_textWrapper}>
                                <h4>Playlists List</h4>
                                <p onClick={() => navigate('/playlist')}>More Detail</p>
                            </div>
                            <div className={style.ElementTable_tableWrapper}>
                                <PlaylistTable
                                    playlistsData={playlistsData}
                                    headerEnable={false}
                                    fullTable={false}
                                    btnDisplay={false}
                                    sortEnable={false}
                                    textColor="black"
                                    lineBreakColor="#e5e5e5"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.Dashboard_elementWrapperLoading}>
                    <div className={style.Dashboard_loadingCircle}>
                        <CircularProgress style={{ color: '#FF8C00' }} size="5rem" />
                    </div>
                    <h3>Fetching data...</h3>
                </div>
            )}
        </div>
    )
}

export default Dashboard
