import { IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from './style.module.css'
import EditButton from '../../EditButton'
import DeleteButton from '../../DeleteButton'
import AddButton from '../../AddButton'
import default_img from '../../../images/default_img.png'
import { getAllTrack } from '../../../redux/track/trackSlice'
import { removeTrack } from '../../../redux/playlist/playlistSlice'

const PlaylistRow = ({ playlist, headerEnable, fullTable, btnDisplay, lineBreakColor }) => {
    const { user } = useSelector((state) => state.auth)
    const { tracksData } = useSelector((state) => state.track)
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const playlistTracks = playlist.tracks
        .map((tracks) => tracksData.filter((track) => track._id === tracks))
        .flatMap((a) => a)

    const handleErrorImage = (e) => {
        e.target.src = default_img
    }

    const handleRemoveTrack = (trackId) => {
        const body = { playlist_id: playlist._id, track_id: trackId }
        dispatch(removeTrack(body))
    }

    useEffect(() => {
        tracksData.length === 0 && user && dispatch(getAllTrack())
    }, [tracksData, user, dispatch])

    return (
        <>
            <tr style={{ boxShadow: !isActive && `0 -1px 0 0 inset ${lineBreakColor}` }}>
                <td className={style.PlaylistBody_title}>
                    <div className={style.PlaylistBody_titleTextWrapper}>
                        <p className={style.PlaylistBody_titleName}>{playlist.name}</p>
                        <p className={style.PlaylistBody_titleId}>{playlist._id}</p>
                    </div>
                </td>
                {fullTable && (
                    <>
                        <td className={style.PlaylistBody_username}>
                            <p>{playlist.user._id}</p>
                        </td>
                        <td className={style.PlaylistTable_spacing} />
                    </>
                )}

                <td className={style.PlaylistBody_trackAmount}>
                    {playlist.tracks.length}{' '}
                    {!headerEnable && (playlist.tracks.length > 1 ? 'Tracks' : 'Track')}
                </td>

                {btnDisplay && (
                    <>
                        <td className={style.PlaylistTable_spacing} />

                        <td className={style.PlaylistBody_btnControl}>
                            <div id={style.PlaylistBody_btnWrapper}>
                                {playlist.user.adminRights && (
                                    <EditButton type="playlist" data={playlist} />
                                )}
                                <DeleteButton type="playlist" id={playlist._id} />
                                <IconButton onClick={() => setIsActive(!isActive)}>
                                    {isActive ? (
                                        <KeyboardArrowUpRoundedIcon />
                                    ) : (
                                        <KeyboardArrowDownRoundedIcon />
                                    )}
                                </IconButton>
                            </div>
                        </td>
                    </>
                )}
            </tr>
            {isActive && (
                <tr
                    className={style.PlaylistBody_fullDetailRow}
                    style={{
                        boxShadow: `0 -1px 0 0 inset ${lineBreakColor}`,
                    }}
                >
                    <td className={style.PlaylistBody_fullDetailColumn} id={style.PlaylistDetail}>
                        <img
                            src={playlist.img ? playlist.img : default_img}
                            onError={handleErrorImage}
                        />
                        <h3>Playlist Detail</h3>
                        <div className={style.PlaylistBody_fullDetailWrapper}>
                            <p className={style.PlaylistBody_playlistDetail}>
                                Name: {playlist.name}
                            </p>
                            <p className={style.PlaylistBody_playlistDetail}>
                                Owner: {playlist.user._id}
                            </p>
                            <p
                                className={style.PlaylistBody_playlistDetail}
                                style={{ wordBreak: 'break-all' }}
                            >
                                Image URL:
                                <br />
                                {playlist.img}
                            </p>
                        </div>
                    </td>
                    {fullTable && (
                        <>
                            <td
                                className={style.PlaylistTable_spacing}
                                id={style.PlaylistSpacing1}
                            />
                            <td
                                className={style.PlaylistBody_fullDetailColumn}
                                id={style.PlaylistDescription}
                            >
                                <h3>Description</h3>
                                <div
                                    className={style.PlaylistBody_fullDetailWrapper}
                                    style={{ height: '208px' }}
                                >
                                    <p
                                        className={style.PlaylistBody_playlistDetail}
                                        dangerouslySetInnerHTML={{
                                            __html: playlist.desc.replace(
                                                new RegExp('\u000a', 'g'),
                                                '<br>',
                                            ),
                                        }}
                                        style={{ wordBreak: 'break-all' }}
                                    />
                                </div>
                            </td>
                        </>
                    )}
                    {fullTable && (
                        <>
                            <td
                                className={style.PlaylistTable_spacing}
                                id={style.PlaylistSpacing2}
                            />
                            <td
                                className={style.PlaylistBody_fullDetailColumn}
                                id={style.PlaylistTrackList}
                            >
                                <div className={style.PlaylistBody_headerWrapper}>
                                    <h3>Track List</h3>
                                    {playlist.user.adminRights && (
                                        <AddButton type="trackToPlaylist" playlist={playlist} />
                                    )}
                                </div>

                                <div
                                    className={style.PlaylistBody_fullDetailWrapper}
                                    style={{ height: '208px' }}
                                >
                                    {playlistTracks.map((track) => (
                                        <div
                                            key={track._id}
                                            className={style.PlaylistBody_playlistDetail_TrackList}
                                        >
                                            <div className={style.PlaylistDetail_textWrapper}>
                                                <p>{track.name}</p>
                                                <p>{track.artist}</p>
                                            </div>
                                            {playlist.user.adminRights && (
                                                <div className={style.PlaylistDetail_btnWrapper}>
                                                    <DoNotDisturbOnRoundedIcon
                                                        onClick={() => handleRemoveTrack(track._id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </>
                    )}
                </tr>
            )}
        </>
    )
}

const PlaylistTable = ({
    playlistsData,
    headerEnable,
    fullTable,
    btnDisplay,
    sortEnable,
    textColor,
    lineBreakColor,
}) => {
    const [sortKey, setSortKey] = useState('none')
    const [sortDescend, setSortDescend] = useState(false) // false: asc, true: desc
    const [nameIdSort, setNameIdSort] = useState(0) // 0: none, 1: name asc, 2: name desc, 3: id asc, 4: id desc
    const [userSort, setUserSort] = useState(0) // 0: none, 1: username asc, 2: username desc
    const [trackAmountSort, setTrackAmountSort] = useState(0) // 0: none, 1: track amount asc, 2: track amount desc

    const handleSort = (sort) => {
        if (sort === 'name&id') {
            nameIdSort !== 4
                ? nameIdSort === 0
                    ? (setNameIdSort(nameIdSort + 1), setUserSort(0), setTrackAmountSort(0))
                    : setNameIdSort(nameIdSort + 1)
                : setNameIdSort(1)
        }

        if (sort === 'user') {
            userSort !== 2
                ? userSort === 0
                    ? (setUserSort(userSort + 1), setNameIdSort(0), setTrackAmountSort(0))
                    : setUserSort(userSort + 1)
                : setUserSort(1)
        }

        if (sort === 'trackAmount') {
            trackAmountSort !== 2
                ? trackAmountSort === 0
                    ? (setTrackAmountSort(trackAmountSort + 1), setNameIdSort(0), setUserSort(0))
                    : setTrackAmountSort(trackAmountSort + 1)
                : setTrackAmountSort(1)
        }
    }

    useEffect(() => {
        nameIdSort === 1 && setSortKey('name')
        nameIdSort === 3 && setSortKey('_id')
        if (nameIdSort !== 0) {
            nameIdSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        userSort === 1 && setSortKey('user')
        if (userSort !== 0) {
            userSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        trackAmountSort === 1 && setSortKey('tracks')
        if (trackAmountSort !== 0) {
            trackAmountSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        nameIdSort === 0 &&
            userSort === 0 &&
            trackAmountSort === 0 &&
            (setSortKey('none'), setSortDescend(false))
    }, [nameIdSort, userSort, trackAmountSort])

    const sortData = ({ tableData, sortKey, desc }) => {
        if (sortKey === 'none') {
            return tableData
        }

        const data = [...tableData]
        const sortedData = data.sort((a, b) => {
            if (sortKey === 'tracks') {
                return a[sortKey].length > b[sortKey].length ? 1 : -1
            } else {
                return a[sortKey].toLowerCase() > b[sortKey].toLowerCase() ? 1 : -1
            }
        })

        if (desc) {
            return sortedData.reverse()
        }

        return sortedData
    }

    const sortedData = useCallback(
        () => sortData({ tableData: playlistsData, sortKey, desc: sortDescend }),
        [playlistsData, sortKey, sortDescend],
    )

    return (
        <table
            className={`${style.PlaylistTable_container} ${sortEnable && style.___isSortable}`}
            style={{ color: textColor }}
        >
            {headerEnable && (
                <thead>
                    <tr>
                        <th
                            className={style.PlaylistHeader_title}
                            onClick={() => sortEnable && handleSort('name&id')}
                        >
                            {sortEnable
                                ? nameIdSort === 0
                                    ? 'NAME & ID'
                                    : nameIdSort < 3
                                    ? 'NAME'
                                    : 'ID'
                                : 'NAME & ID'}
                            {(nameIdSort === 1 || nameIdSort === 3) && (
                                <ArrowDropUpIcon className={style.SortArrow} />
                            )}
                            {(nameIdSort === 2 || nameIdSort === 4) && (
                                <ArrowDropDownIcon className={style.SortArrow} />
                            )}
                        </th>
                        {fullTable && (
                            <>
                                <th
                                    className={style.PlaylistHeader_username}
                                    onClick={() => sortEnable && handleSort('user')}
                                >
                                    OWNER (USER ID)
                                    {userSort === 1 && (
                                        <ArrowDropUpIcon className={style.SortArrow} />
                                    )}
                                    {userSort === 2 && (
                                        <ArrowDropDownIcon className={style.SortArrow} />
                                    )}
                                </th>
                                <th className={style.PlaylistTable_spacing} />
                            </>
                        )}

                        <th
                            className={style.PlaylistHeader_trackAmount}
                            onClick={() => sortEnable && handleSort('trackAmount')}
                        >
                            <div id={style.PlaylistTrackAmount}>
                                {trackAmountSort === 1 && (
                                    <ArrowDropUpIcon className={style.SortArrow} />
                                )}
                                {trackAmountSort === 2 && (
                                    <ArrowDropDownIcon className={style.SortArrow} />
                                )}
                                #TRACK
                            </div>
                        </th>
                        {btnDisplay && <th className={style.PlaylistTable_spacing} />}
                        {btnDisplay && <th className={style.PlaylistHeader_btnControl}></th>}
                    </tr>
                </thead>
            )}
            <tbody>
                {sortedData().map((playlist) => (
                    <Fragment key={playlist._id}>
                        <PlaylistRow
                            playlist={playlist}
                            headerEnable={headerEnable}
                            fullTable={fullTable}
                            btnDisplay={btnDisplay}
                            lineBreakColor={lineBreakColor}
                        />
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default PlaylistTable
