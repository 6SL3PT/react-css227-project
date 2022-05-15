import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import style from './style.module.css'
import PlayButton from '../PlayButton/index'
import MoreButton from '../MoreButton/index'
import FavoriteButton from '../FavoriteButton/index'
import AddTrackToPlaylist from '../AddTrackToPlaylist/index'
import default_img from '../../images/default_img.png'

const TrackRow = ({ track, favAmountEnable, playlist }) => {
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate()

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

    const handleImageError = (e) => {
        e.target.src = default_img
    }

    return (
        <tr onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover ? (
                <>
                    <td className={`${style.TrackBody_rowCounter} ${isHover && style.___isHover}`}>
                        <PlayButton track={track} />
                    </td>
                </>
            ) : (
                <td className={style.TrackBody_rowCounter} />
            )}
            <td className={`${favAmountEnable ? style.TrackBodyFav_title : style.TrackBody_title}`}>
                <img
                    src={track.img}
                    onClick={() => (window.scrollTo(0, 0), navigate(`/track/${track._id}`))}
                    onError={handleImageError}
                />
                <div
                    className={`${
                        favAmountEnable
                            ? style.TrackBodyFav_titleTextWrapper
                            : style.TrackBody_titleTextWrapper
                    }`}
                >
                    <p
                        className={style.TrackBody_titleName}
                        onClick={() => (window.scrollTo(0, 0), navigate(`/track/${track._id}`))}
                    >
                        {track.name}
                    </p>
                    <p className={style.TrackBody_titleArtist}>{track.artist}</p>
                </div>
            </td>
            <td className={style.TrackTable_spacing} />
            {favAmountEnable ? (
                <td className={style.TrackBody_favAmount}>{favAmount}</td>
            ) : (
                <td className={style.TrackBody_genre}>{track.genre}</td>
            )}
            <td className={style.TrackTable_spacing} />
            <td className={style.TrackBody_btnControl}>
                {isHover && (
                    <div id={style.TrackBody_btnWrapper}>
                        <FavoriteButton trackId={track._id} />
                        <AddTrackToPlaylist
                            trackId={track._id}
                            dropdownTranslate={'-170px, 325px'}
                            fixedHeight={true}
                        />
                    </div>
                )}
            </td>

            <td className={style.TrackBody_duration}>{formatDuration(track.duration)}</td>
            <td className={style.TrackTable_spacing} />

            <td className={style.TrackBody_moreBtn}>
                {isHover && <MoreButton tracks={track} playlist={playlist} />}
            </td>
        </tr>
    )
}

const TrackTable = ({ tracksData, favAmountEnable, sortEnable, playlist }) => {
    const [sortKey, setSortKey] = useState('none')
    const [sortDescend, setSortDescend] = useState(false) // false: asc, true: desc
    const [titleSort, setTitleSort] = useState(0) // 0: none, 1: name asc, 2: name desc, 3: artist asc, 4: artist desc
    const [durationSort, setDurationSort] = useState(0) // 0: none, 1: duration asc, 2: duration desc
    const [genreSort, setGenreSort] = useState(0) // 0: none, 1: genre asc, 2: genre desc
    const [favSort, setFavSort] = useState(0) // 0: none, 1: favAmount asc, 2: favAmount desc

    const handleSort = (sort) => {
        if (sort === 'title') {
            titleSort !== 4
                ? titleSort === 0
                    ? (setTitleSort(titleSort + 1),
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
                      setTitleSort(0),
                      setDurationSort(0),
                      setGenreSort(0))
                    : setFavSort(favSort + 1)
                : setFavSort(1)
        }
    }

    useEffect(() => {
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

        titleSort === 0 &&
            durationSort === 0 &&
            genreSort === 0 &&
            favSort === 0 &&
            (setSortKey('none'), setSortDescend(false))
    }, [titleSort, durationSort, genreSort, favSort])

    const sortData = ({ tableData, sortKey, desc }) => {
        if (sortKey === 'none') {
            return tableData
        }

        const data = tableData
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
        <table className={`${style.TrackTable_container} ${sortEnable && style.___isSortable}`}>
            <thead>
                <tr>
                    <th className={style.TrackHeader_rowCounter}>#</th>
                    <th
                        className={`${
                            favAmountEnable ? style.TrackHeaderFav_title : style.TrackHeader_title
                        }`}
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
                    {favAmountEnable ? (
                        <th
                            className={style.TrackHeader_favAmount}
                            onClick={() => sortEnable && handleSort('favAmount')}
                        >
                            <div id={style.TrackFavAmount}>
                                {favSort === 1 && <ArrowDropUpIcon className={style.SortArrow} />}
                                {favSort === 2 && <ArrowDropDownIcon className={style.SortArrow} />}
                                FAVs
                            </div>
                        </th>
                    ) : (
                        <th
                            className={style.TrackHeader_genre}
                            onClick={() => sortEnable && handleSort('genre')}
                        >
                            <div id={style.TrackGenre}>
                                {genreSort === 1 && <ArrowDropUpIcon className={style.SortArrow} />}
                                {genreSort === 2 && (
                                    <ArrowDropDownIcon className={style.SortArrow} />
                                )}
                                GENRE
                            </div>
                        </th>
                    )}
                    <th className={style.TrackTable_spacing} />
                    <th className={style.TrackHeader_btnControl}></th>
                    <th
                        className={style.TrackHeader_duration}
                        onClick={() => sortEnable && handleSort('duration')}
                    >
                        <div id={style.TrackDuration}>
                            {durationSort === 1 && <ArrowDropUpIcon className={style.SortArrow} />}
                            {durationSort === 2 && (
                                <ArrowDropDownIcon className={style.SortArrow} />
                            )}
                            <AccessTimeRoundedIcon />
                        </div>
                    </th>
                    <th className={style.TrackTable_spacing} />
                    <th className={style.TrackHeader_moreBtn} />
                </tr>
            </thead>
            <tbody>
                {sortedData().map((track) => (
                    <Fragment key={track._id}>
                        <TrackRow
                            track={track}
                            favAmountEnable={favAmountEnable}
                            playlist={playlist}
                        />
                    </Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default TrackTable
