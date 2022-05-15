import { IconButton } from '@mui/material'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import style from './style.module.css'
import EditButton from '../../EditButton'
import DeleteButton from '../../DeleteButton'
import default_img from '../../../images/default_img.png'
import { addTrack } from '../../../redux/playlist/playlistSlice'

const TrackRow = ({ track, playlist, fullTable, btnDisplay, addBtn, lineBreakColor }) => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const formatDuration = (duration) => {
        const minute = Math.floor(duration / 60)
        const second = Math.floor(duration - minute * 60)
        const formattedSecond = ('0' + second).slice(-2)

        return `${minute}:${formattedSecond}`
    }

    const numberFormatter = (num) => {
        return num >= 100000000
            ? (num / 1000000).toFixed(0) + 'M'
            : num > 10000000
            ? (num / 1000000).toFixed(1) + 'M'
            : num >= 1000000
            ? (num / 1000000).toFixed(2) + 'M'
            : num >= 10000
            ? (num / 1000).toFixed(1) + 'K'
            : num >= 1000
            ? (num / 1000).toFixed(2) + 'K'
            : num
    }

    const favAmount = numberFormatter(track.favAmount)

    const handleAddTrack = () => {
        const body = { playlist_id: playlist._id, track_id: track._id }
        dispatch(addTrack(body))
    }

    const handleErrorImage = (e) => {
        e.target.src = default_img
    }

    return (
        <>
            <tr style={{ boxShadow: !isActive && `0 -1px 0 0 inset ${lineBreakColor}` }}>
                {fullTable && (
                    <td className={style.TrackBody_id}>
                        <p>{track._id}</p>
                    </td>
                )}
                <td className={style.TrackBody_title}>
                    <div className={style.TrackBody_titleTextWrapper}>
                        <p className={style.TrackBody_titleName}>{track.name}</p>
                        <p className={style.TrackBody_titleArtist}>{track.artist}</p>
                    </div>
                </td>
                <td className={style.TrackTable_spacing} />
                {fullTable && <td className={style.TrackBody_favAmount}>{favAmount}</td>}
                {fullTable && <td className={style.TrackTable_spacing} />}
                {fullTable && <td className={style.TrackBody_genre}>{track.genre}</td>}
                {fullTable && <td className={style.TrackTable_spacing} />}

                <td className={style.TrackBody_duration}>{formatDuration(track.duration)}</td>
                {btnDisplay && (
                    <td className={`${style.TrackBody_btnControl} ${addBtn && style.___isNarrow}`}>
                        <div id={style.TrackBody_btnWrapper}>
                            {addBtn ? (
                                <IconButton onClick={() => handleAddTrack()}>
                                    <AddCircleRoundedIcon />
                                </IconButton>
                            ) : (
                                <>
                                    <EditButton type="track" data={track} />
                                    <DeleteButton type="track" id={track._id} />
                                    <IconButton onClick={() => setIsActive(!isActive)}>
                                        {isActive ? (
                                            <KeyboardArrowUpRoundedIcon />
                                        ) : (
                                            <KeyboardArrowDownRoundedIcon />
                                        )}
                                    </IconButton>
                                </>
                            )}
                        </div>
                    </td>
                )}
            </tr>
            {isActive && (
                <tr
                    className={style.TrackBody_fullDetailRow}
                    style={{
                        boxShadow: `0 -1px 0 0 inset ${lineBreakColor}`,
                    }}
                >
                    <td className={style.TrackBody_fullDetailColumn}>
                        <img src={track.img} onError={handleErrorImage} />
                        <h3>Track Detail</h3>
                        <div className={style.TrackBody_fullDetailWrapper}>
                            <p className={style.TrackBody_trackDetail}>Name: {track.name}</p>
                            <p className={style.TrackBody_trackDetail}>Artist: {track.artist}</p>
                            <p className={style.TrackBody_trackDetail}>Genre: {track.genre}</p>
                            <p className={style.TrackBody_trackDetail}>
                                Total Favorite: {track.favAmount}
                            </p>
                            <p className={style.TrackBody_trackDetail}>
                                Duration: {formatDuration(track.duration)}
                            </p>
                            <p
                                className={style.TrackBody_trackDetail}
                                style={{ wordBreak: 'break-all' }}
                            >
                                Audio URL:
                                <br />
                                {track.track}
                            </p>
                        </div>
                    </td>
                    {fullTable && (
                        <>
                            <td className={style.TrackTable_spacing} />
                            <td className={style.TrackBody_fullDetailColumn}>
                                <h3>Lyric</h3>
                                <div className={style.TrackBody_fullDetailWrapper}>
                                    <p
                                        className={style.TrackBody_trackDetail}
                                        dangerouslySetInnerHTML={{
                                            __html: track.lyric.replace(
                                                new RegExp('\u000a', 'g'),
                                                '<br>',
                                            ),
                                        }}
                                    />
                                </div>
                            </td>
                        </>
                    )}
                </tr>
            )}
        </>
    )
}

const TrackTable = ({
    tracksData,
    playlist,
    headerEnable,
    fullTable,
    btnDisplay,
    addBtn,
    sortEnable,
    textColor,
    lineBreakColor,
}) => {
    const [sortKey, setSortKey] = useState('none')
    const [sortDescend, setSortDescend] = useState(false) // false: asc, true: desc
    const [idSort, setIdSort] = useState(0) // 0: none, 1: id asc, 2: id desc
    const [titleSort, setTitleSort] = useState(0) // 0: none, 1: name asc, 2: name desc, 3: artist asc, 4: artist desc
    const [durationSort, setDurationSort] = useState(0) // 0: none, 1: duration asc, 2: duration desc
    const [genreSort, setGenreSort] = useState(0) // 0: none, 1: genre asc, 2: genre desc
    const [favSort, setFavSort] = useState(0) // 0: none, 1: favAmount asc, 2: favAmount desc

    const handleSort = (sort) => {
        if (sort === 'id') {
            idSort !== 2
                ? idSort === 0
                    ? (setIdSort(idSort + 1),
                      setDurationSort(0),
                      setTitleSort(0),
                      setGenreSort(0),
                      setFavSort(0))
                    : setIdSort(idSort + 1)
                : setIdSort(1)
        }

        if (sort === 'title') {
            titleSort !== 4
                ? titleSort === 0
                    ? (setTitleSort(titleSort + 1),
                      setIdSort(0),
                      setDurationSort(0),
                      setGenreSort(0),
                      setFavSort(0))
                    : setTitleSort(titleSort + 1)
                : setTitleSort(1)
        }

        if (sort === 'duration') {
            durationSort !== 2
                ? durationSort === 0
                    ? (setDurationSort(durationSort + 1),
                      setIdSort(0),
                      setTitleSort(0),
                      setGenreSort(0),
                      setFavSort(0))
                    : setDurationSort(durationSort + 1)
                : setDurationSort(1)
        }

        if (sort === 'genre') {
            genreSort !== 2
                ? genreSort === 0
                    ? (setGenreSort(genreSort + 1),
                      setIdSort(0),
                      setTitleSort(0),
                      setDurationSort(0),
                      setFavSort(0))
                    : setGenreSort(genreSort + 1)
                : setGenreSort(1)
        }

        if (sort === 'favAmount') {
            favSort !== 2
                ? favSort === 0
                    ? (setFavSort(favSort + 1),
                      setIdSort(0),
                      setTitleSort(0),
                      setDurationSort(0),
                      setGenreSort(0))
                    : setFavSort(favSort + 1)
                : setFavSort(1)
        }
    }

    useEffect(() => {
        idSort === 1 && setSortKey('_id')
        if (idSort !== 0) {
            idSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        titleSort === 1 && setSortKey('name')
        titleSort === 3 && setSortKey('artist')
        if (titleSort !== 0) {
            titleSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        durationSort === 1 && setSortKey('duration')
        if (durationSort !== 0) {
            durationSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        genreSort === 1 && setSortKey('genre')
        if (genreSort !== 0) {
            genreSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        favSort === 1 && setSortKey('favAmount')
        if (favSort !== 0) {
            favSort % 2 === 0 ? setSortDescend(true) : setSortDescend(false)
        }

        idSort === 0 &&
            titleSort === 0 &&
            durationSort === 0 &&
            genreSort === 0 &&
            favSort === 0 &&
            (setSortKey('none'), setSortDescend(false))
    }, [idSort, titleSort, durationSort, genreSort, favSort])

    const sortData = ({ tableData, sortKey, desc }) => {
        if (sortKey === 'none') {
            return tableData
        }

        const data = [...tableData]
        const sortedData = data.sort((a, b) => {
            if (sortKey === 'duration' || sortKey === 'favAmount') {
                return a[sortKey] > b[sortKey] ? 1 : -1
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
        () => sortData({ tableData: tracksData, sortKey, desc: sortDescend }),
        [tracksData, sortKey, sortDescend],
    )

    return (
        <table
            className={`${style.TrackTable_container} ${sortEnable && style.___isSortable}`}
            style={{ color: textColor }}
        >
            {headerEnable && (
                <thead>
                    <tr>
                        {fullTable && (
                            <th
                                className={style.TrackHeader_id}
                                onClick={() => sortEnable && handleSort('id')}
                            >
                                ID
                                {idSort === 1 && <ArrowDropUpIcon className={style.SortArrow} />}
                                {idSort === 2 && <ArrowDropDownIcon className={style.SortArrow} />}
                            </th>
                        )}
                        <th
                            className={style.TrackHeader_title}
                            onClick={() => sortEnable && handleSort('title')}
                        >
                            {sortEnable ? (titleSort < 3 ? 'TITLE' : 'ARTIST') : 'TITLE'}
                            {(titleSort === 1 || titleSort === 3) && (
                                <ArrowDropUpIcon className={style.SortArrow} />
                            )}
                            {(titleSort === 2 || titleSort === 4) && (
                                <ArrowDropDownIcon className={style.SortArrow} />
                            )}
                        </th>
                        <th className={style.TrackTable_spacing} />
                        {fullTable && (
                            <th
                                className={style.TrackHeader_favAmount}
                                onClick={() => sortEnable && handleSort('favAmount')}
                            >
                                <div id={style.TrackFavAmount}>
                                    {favSort === 1 && (
                                        <ArrowDropUpIcon className={style.SortArrow} />
                                    )}
                                    {favSort === 2 && (
                                        <ArrowDropDownIcon className={style.SortArrow} />
                                    )}
                                    #FAV
                                </div>
                            </th>
                        )}
                        {fullTable && <th className={style.TrackTable_spacing} />}
                        {fullTable && (
                            <th
                                className={style.TrackHeader_genre}
                                onClick={() => sortEnable && handleSort('genre')}
                            >
                                <div id={style.TrackGenre}>
                                    {genreSort === 1 && (
                                        <ArrowDropUpIcon className={style.SortArrow} />
                                    )}
                                    {genreSort === 2 && (
                                        <ArrowDropDownIcon className={style.SortArrow} />
                                    )}
                                    GENRE
                                </div>
                            </th>
                        )}
                        {fullTable && <td className={style.TrackTable_spacing} />}
                        <th
                            className={style.TrackHeader_duration}
                            onClick={() => sortEnable && handleSort('duration')}
                        >
                            <div id={style.TrackDuration}>
                                {durationSort === 1 && (
                                    <ArrowDropUpIcon className={style.SortArrow} />
                                )}
                                {durationSort === 2 && (
                                    <ArrowDropDownIcon className={style.SortArrow} />
                                )}
                                <AccessTimeRoundedIcon />
                            </div>
                        </th>
                        {btnDisplay && <th className={style.TrackHeader_btnControl}></th>}
                    </tr>
                </thead>
            )}
            <tbody>
                {sortedData().map((track) => (
                    <Fragment key={track._id}>
                        <TrackRow
                            track={track}
                            playlist={playlist}
                            fullTable={fullTable}
                            btnDisplay={btnDisplay}
                            addBtn={addBtn}
                            lineBreakColor={lineBreakColor}
                        />
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default TrackTable
