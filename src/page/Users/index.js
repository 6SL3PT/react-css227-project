import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@mui/material'

import style from './style.module.css'
import { getAllUser } from '../../redux/user/userSlice'
import UserTable from '../../components/Table/UserTable'
import AddButton from '../../components/AddButton'

const Users = () => {
    const { user } = useSelector((state) => state.auth)
    const { usersData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const totalAdmin = usersData.map((user) => user.adminRights).filter(Boolean).length
    const totalPremium = usersData.map((user) => user.isPremium).filter(Boolean).length - totalAdmin
    const totalUser = usersData.length - totalAdmin
    const totalFav = usersData
        .map((user) => !user.adminRights && user.favList.length)
        .reduce((a, b) => a + b, 0)
    const totalPlaylist = usersData
        .map((user) => !user.adminRights && user.playlist.length)
        .reduce((a, b) => a + b, 0)
    const currentYear = new Date().getFullYear()
    const totalAge = usersData
        .map((user) => !user.adminRights && currentYear - user.year)
        .reduce((a, b) => a + b, 0)
    const genderCount = usersData
        .map((user) => user.gender)
        .reduce((a, b) => ((a[b] = a[b] + 1 || 1), a), {})

    useEffect(() => {
        usersData.length === 0 && user && dispatch(getAllUser())
    }, [user, usersData, dispatch])

    return (
        <div id={style.User}>
            {usersData && (
                <div className={style.User_elementWrapper}>
                    <div className={style.UserHeader}>
                        <h1>Users</h1>
                        <AddButton type="user" />
                    </div>
                    <div className={style.User_paperWrapper}>
                        <Paper className={style.ElementPaper}>
                            <h4>Users Detail Overview</h4>
                            <table id={style.OverviewTable}>
                                <tbody>
                                    <tr>
                                        <td>Total User :</td>
                                        <td>
                                            {totalUser}{' '}
                                            <p className={style.OverviewTable_subDetail}>
                                                ({' '}
                                                {genderCount.length !== 0 &&
                                                    `${genderCount['male']} male, ${genderCount['female']} 
                                                female, ${genderCount['non-bi']} non-bi`}{' '}
                                                )
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Premium User :</td>
                                        <td>{totalPremium}</td>
                                    </tr>
                                    <tr>
                                        <td>Avg. Favorite Tracks / User :</td>
                                        <td>
                                            {totalFav &&
                                                totalUser &&
                                                (totalFav / totalUser).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Avg. Playlist / User :</td>
                                        <td>
                                            {totalPlaylist &&
                                                totalUser &&
                                                (totalPlaylist / totalUser).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Avg. User Age :</td>
                                        <td>
                                            {totalAge &&
                                                totalUser &&
                                                (totalAge / totalUser).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Paper>
                        <Paper className={style.ElementPaper}>
                            <h4>Users List</h4>
                            <UserTable
                                usersData={usersData}
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
