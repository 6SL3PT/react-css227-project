import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import style from './style.module.css'
import { getAllTrack } from '../../../redux/track/trackSlice'
import TrackTable from '../../Table/TrackTable/index'

const AddTrackToPlaylist = ({ setIsActive, playlist }) => {
    const [tracks, setTracks] = useState([])
    const { user } = useSelector((state) => state.auth)
    const { tracksData } = useSelector((state) => state.track)
    const dispatch = useDispatch()

    useEffect(() => {
        tracksData.length === 0 && user && dispatch(getAllTrack())
    }, [user, tracksData, dispatch])

    useEffect(() => {
        if (tracksData) {
            const tracksNotInPlaylist = tracksData
                .map((track) => track._id)
                .filter((trackId) => !playlist.tracks.includes(trackId)) //Get track ID that not exist in playlist
                .map((track) =>
                    tracksData.filter((tracks) => tracks._id === track).map((tracks) => tracks),
                ) // Get track data of those ID
                .flatMap((a) => a)
            setTracks(tracksNotInPlaylist)
        }
    }, [tracksData, playlist])

    return (
        <div className={style.MainContent_elementWrapper}>
            <div className={style.AddTrackToPlaylist_headerWrapper}>
                <h3>Add Track</h3>
                <IconButton onClick={() => setIsActive(false)}>
                    <CloseRoundedIcon />
                </IconButton>
            </div>

            <div className={style.AddTrackToPlaylist_tableWrapper}>
                <TrackTable
                    tracksData={tracks}
                    playlist={playlist}
                    headerEnable={false}
                    fullTable={false}
                    btnDisplay={true}
                    addBtn={true}
                    sortEnable={false}
                    textColor="black"
                    lineBreakColor="#e5e5e5"
                />
            </div>
        </div>
    )
}

export default AddTrackToPlaylist
