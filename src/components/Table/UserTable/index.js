import { IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { Fragment, useCallback, useEffect, useState } from 'react'

import style from './style.module.css'
import EditButton from '../../EditButton'
import DeleteButton from '../../DeleteButton'

const UserRow = ({ user, fullTable, btnDisplay, lineBreakColor }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <>
            <tr style={{ boxShadow: !isActive && `0 -1px 0 0 inset ${lineBreakColor}` }}>
                <td className={style.UserBody_title}>
                    <div className={style.UserBody_titleTextWrapper}>
                        <p className={style.UserBody_titleEmail}>{user.email}</p>
                        <p className={style.UserBody_titleId}>{user._id}</p>
                    </div>
                </td>
                <td className={style.UserTable_spacing} />
                {fullTable && (
                    <>
                        <td className={style.UserBody_favAmount}>{user.favList.length}</td>
                        <td className={style.UserTable_spacing} />
                    </>
                )}
                {fullTable && (
                    <>
                        <td className={style.UserBody_playlistAmount}>{user.playlist.length}</td>
                        <td className={style.UserTable_spacing} />
                    </>
                )}

                <td className={style.UserBody_package}>
                    {user.adminRights ? 'Admin' : user.isPremium ? 'Premium' : 'Free'}
                </td>
                {btnDisplay && (
                    <td className={style.UserBody_btnControl}>
                        <div id={style.UserBody_btnWrapper}>
                            <EditButton type="user" data={user} />
                            <DeleteButton type="user" id={user._id} />
                            <IconButton onClick={() => setIsActive(!isActive)}>
                                {isActive ? (
                                    <KeyboardArrowUpRoundedIcon />
                                ) : (
                                    <KeyboardArrowDownRoundedIcon />
                                )}
                            </IconButton>
                        </div>
                    </td>
                )}
            </tr>
            {isActive && (
                <tr
                    className={style.UserBody_fullDetailRow}
                    style={{ boxShadow: `0 -1px 0 0 inset ${lineBreakColor}` }}
                >
                    <td className={style.UserBody_fullDetailColumn}>
                        <h3>User Detail</h3>
                        <div className={style.UserBody_fullDetailWrapper}>
                            <p className={style.UserBody_userDetail}>Username: {user.username}</p>
                            <p className={style.UserBody_userDetail}>
                                DOB: {user.date}/{user.month}/{user.year}
                            </p>
                            <p className={style.UserBody_userDetail}>
                                Gender:{' '}
                                {user.gender === 'male'
                                    ? 'Male'
                                    : user.gender === 'female'
                                    ? 'Female'
                                    : 'Non-binary'}
                            </p>
                            <p className={style.UserBody_userDetail}>
                                Package: {user.isPremium ? 'Premium' : 'Free'}
                            </p>
                            <p className={style.UserBody_userDetail}>
                                Account Status: {user.adminRights ? 'Admin' : 'User'}
                            </p>
                        </div>
                    </td>

                    {fullTable && (
                        <>
                            <td className={style.UserTable_spacing} />
                            <td className={style.UserBody_fullDetailColumn}>
                                <h3>Favorite Tracks</h3>
                                <div className={style.UserBody_fullDetailWrapper}>
                                    {user.favList.map((track) => (
                                        <p className={style.UserBody_userDetail} key={track}>
                                            {track}
                                        </p>
                                    ))}
                                </div>
                            </td>
                        </>
                    )}
                    {fullTable && (
                        <>
                            <td className={style.UserTable_spacing} />
                            <td className={style.UserBody_fullDetailColumn}>
                                <h3>Playlist Detail</h3>
                                <div className={style.UserBody_fullDetailWrapper}>
                                    {user.playlist.map((playlist) => (
                                        <p className={style.UserBody_userDetail} key={playlist}>
                                            {playlist}
                                        </p>
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

const UserTable = ({
    usersData,
    headerEnable,
    fullTable,
    btnDisplay,
    sortEnable,
    textColor,
    lineBreakColor,
}) => {
    const [sortKey, setSortKey] = useState('none')
    const [sortDescend, setSortDescend] = useState(false) // false: asc, true: desc
    const [emailIdSort, setEmailIdSort] = useState(0) // 0: none, 1: email asc, 2: email desc, 3: id asc, 4: id desc
    const [packageSort, setPackageSort] = useState(0) // 0: none, 1: asc, 2: desc
    const [favAmountSort, setFavAmountSort] = useState(0) // 0: none, 1: asc, 2: desc
    const [playlistAmountSort, setPlaylistAmountSort] = useState(0) // 0: none, 1: asc, 2: desc
    const handleSort = (sort) => {
        if (sort === 'email&id') {
            emailIdSort !== 4
                ? emailIdSort === 0
                    ? (setEmailIdSort(emailIdSort + 1),
                      setPackageSort(0),
                      setFavAmountSort(0),
                      setPlaylistAmountSort(0))
                    : setEmailIdSort(emailIdSort + 1)
                : setEmailIdSort(1)
        }

        if (sort === 'package') {
            packageSort !== 2
                ? packageSort === 0
                    ? (setPackageSort(packageSort + 1),
                      setEmailIdSort(0),
                      setFavAmountSort(0),
                      setPlaylistAmountSort(0))
                    : setPackageSort(packageSort + 1)
                : setPackageSort(1)
        }

        if (sort === 'favAmount') {
            favAmountSort !== 2
                ? favAmountSort === 0
                    ? (setFavAmountSort(favAmountSort + 1),
                      setEmailIdSort(0),
                      setPackageSort(0),
                      setPlaylistAmountSort(0))
                    : setFavAmountSort(favAmountSort + 1)
                : setFavAmountSort(1)
        }

        if (sort === 'playlistAmount') {
            playlistAmountSort !== 2
                ? playlistAmountSort === 0
                    ? (setPlaylistAmountSort(playlistAmountSort + 1),
                      setEmailIdSort(0),
                      setPackageSort(0),
                      setFavAmountSort(0))
                    : setPlaylistAmountSort(playlistAmountSort + 1)
                : setPlaylistAmountSort(1)
        }
    }

    useEffect(() => {
        emailIdSort === 1 && setSortKey('email')
        emailIdSort === 3 && setSortKey('_id')
        packageSort === 1 && setSortKey('isPremium')
        favAmountSort === 1 && setSortKey('favList')
        playlistAmountSort === 1 && setSortKey('playlist')

        if (
            emailIdSort !== 0 ||
            packageSort !== 0 ||
            favAmountSort !== 0 ||
            playlistAmountSort !== 0
        ) {
            emailIdSort % 2 === 0 &&
            packageSort % 2 === 0 &&
            favAmountSort % 2 === 0 &&
            playlistAmountSort % 2 === 0
                ? setSortDescend(true)
                : setSortDescend(false)
        }

        emailIdSort === 0 &&
            packageSort === 0 &&
            favAmountSort === 0 &&
            playlistAmountSort === 0 &&
            (setSortKey('none'), setSortDescend(false))
    }, [emailIdSort, packageSort, favAmountSort, playlistAmountSort])

    const sortData = ({ tableData, sortKey, desc }) => {
        if (sortKey === 'none') {
            return tableData
        }

        const data = [...tableData]
        const sortedData = data.sort((a, b) => {
            if (sortKey === 'isPremium') {
                if (a['adminRights'] === b['adminRights']) {
                    return 0
                }

                if (a['adminRights'] === true) {
                    return -1
                }

                if (b['adminRights'] === true) {
                    return 1
                }

                return a[sortKey] > b[sortKey] ? 1 : -1
            } else if (sortKey === 'favList' || sortKey === 'playlist') {
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
        () => sortData({ tableData: usersData, sortKey, desc: sortDescend }),
        [usersData, sortKey, sortDescend],
    )

    return (
        <table
            className={`${style.UserTable_container} ${sortEnable && style.___isSortable}`}
            style={{ color: textColor }}
        >
            {headerEnable && (
                <thead>
                    <tr>
                        <th
                            className={style.UserHeader_title}
                            onClick={() => sortEnable && handleSort('email&id')}
                        >
                            {sortEnable
                                ? emailIdSort === 0
                                    ? 'EMAIL & ID'
                                    : emailIdSort < 3
                                    ? 'EMAIL'
                                    : 'ID'
                                : 'EMAIL & ID'}
                            {(emailIdSort === 1 || emailIdSort === 3) && (
                                <ArrowDropUpIcon className={style.SortArrow} />
                            )}
                            {(emailIdSort === 2 || emailIdSort === 4) && (
                                <ArrowDropDownIcon className={style.SortArrow} />
                            )}
                        </th>
                        <th className={style.UserTable_spacing} />
                        {fullTable && (
                            <>
                                <th
                                    className={style.UserHeader_favAmount}
                                    onClick={() => sortEnable && handleSort('favAmount')}
                                >
                                    <div id={style.HeaderElementWrapper}>
                                        {favAmountSort === 1 && (
                                            <ArrowDropUpIcon className={style.SortArrow} />
                                        )}
                                        {favAmountSort === 2 && (
                                            <ArrowDropDownIcon className={style.SortArrow} />
                                        )}
                                        #FAV TRACK
                                    </div>
                                </th>
                                <th className={style.UserTable_spacing} />
                            </>
                        )}
                        {fullTable && (
                            <>
                                <th
                                    className={style.UserHeader_playlistAmount}
                                    onClick={() => sortEnable && handleSort('playlistAmount')}
                                >
                                    <div id={style.HeaderElementWrapper}>
                                        {playlistAmountSort === 1 && (
                                            <ArrowDropUpIcon className={style.SortArrow} />
                                        )}
                                        {playlistAmountSort === 2 && (
                                            <ArrowDropDownIcon className={style.SortArrow} />
                                        )}
                                        #PLAYLIST
                                    </div>
                                </th>
                                <th className={style.UserTable_spacing} />
                            </>
                        )}
                        <th
                            className={style.UserHeader_package}
                            onClick={() => sortEnable && handleSort('package')}
                        >
                            <div id={style.HeaderElementWrapper}>
                                {packageSort === 1 && (
                                    <ArrowDropUpIcon className={style.SortArrow} />
                                )}
                                {packageSort === 2 && (
                                    <ArrowDropDownIcon className={style.SortArrow} />
                                )}
                                PACKAGE
                            </div>
                        </th>
                        {btnDisplay && <th className={style.UserHeader_btnControl} />}
                    </tr>
                </thead>
            )}
            <tbody>
                {sortedData().map((user) => (
                    <Fragment key={user._id}>
                        <UserRow
                            user={user}
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

export default UserTable
