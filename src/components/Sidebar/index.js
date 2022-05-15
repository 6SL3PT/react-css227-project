import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { logout } from '../../redux/auth/authSlice'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import PersonIcon from '@mui/icons-material/Person'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'

import style from './style.module.css'
import logo from '../../images/logo_white.svg'

const Sidebar = () => {
    const [dropdownActive, setDropdownActive] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div id={style.SideBar}>
            <div className={style.SideBar_extendNavBar}>
                <div className={style.ExtendNavBar_headWrapper}>
                    <div
                        className={style.ExtendNavBar_head}
                        onClick={() => setDropdownActive(!dropdownActive)}
                    >
                        {location.pathname === '/dashboard' && (
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <DashboardIcon />
                                <p>Dashboard</p>
                            </div>
                        )}
                        {location.pathname === '/user' && (
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <PersonIcon />
                                <p>Users</p>
                            </div>
                        )}
                        {location.pathname === '/track' && (
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <AudiotrackIcon />
                                <p>Tracks</p>
                            </div>
                        )}
                        {location.pathname === '/playlist' && (
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <MenuIcon />
                                <p>Playlists</p>
                            </div>
                        )}
                        {dropdownActive ? (
                            <KeyboardArrowUpRoundedIcon />
                        ) : (
                            <KeyboardArrowDownRoundedIcon />
                        )}
                    </div>
                    <button onClick={() => (dispatch(logout()), navigate('/'))}>Logout</button>
                </div>

                {dropdownActive && (
                    <div className={style.ExtendNavBar_dropdownWrapper}>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => (navigate('/dashboard'), setDropdownActive(false))}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <DashboardIcon />
                                <p>Dashboard</p>
                            </div>
                        </div>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => (navigate('/user'), setDropdownActive(false))}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <PersonIcon />
                                <p>Users</p>
                            </div>
                        </div>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => (navigate('/track'), setDropdownActive(false))}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <AudiotrackIcon />
                                <p>Tracks</p>
                            </div>
                        </div>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => (navigate('/playlist'), setDropdownActive(false))}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <MenuIcon />
                                <p>Playlists</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={style.SideBar_mainSideBar}>
                <div className={style.SideBar_titleWrapper}>
                    <img src={logo} />
                    <p>Administration</p>
                </div>
                <div className={style.SideBar_contentHeaderWrapper}>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            location.pathname === '/dashboard' && style.isSelected
                        }`}
                        onClick={() => navigate('/dashboard')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <DashboardIcon />
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            location.pathname === '/user' && style.isSelected
                        }`}
                        onClick={() => navigate('/user')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <PersonIcon />
                            <p>Users</p>
                        </div>
                    </div>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            location.pathname === '/track' && style.isSelected
                        }`}
                        onClick={() => navigate('/track')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <AudiotrackIcon />
                            <p>Tracks</p>
                        </div>
                    </div>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            location.pathname === '/playlist' && style.isSelected
                        }`}
                        onClick={() => navigate('/playlist')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <MenuIcon />
                            <p>Playlists</p>
                        </div>
                    </div>
                    <div
                        className={style.SideBar_contentHeader}
                        onClick={() => (dispatch(logout()), navigate('/'))}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <LogoutRoundedIcon />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
