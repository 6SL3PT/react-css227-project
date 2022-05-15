import Helmet from 'react-helmet'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import EditIcon from '@mui/icons-material/Edit'
import LockIcon from '@mui/icons-material/Lock'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'

import { getUserPlaylist } from '../../redux/playlist/playlistSlice'
import { generalStateReset } from '../../redux/user/userSlice'
import style from './style.module.css'
import Overview from './Overview/index'
import ProfileEdit from './Edit/form/index'
import PasswordChange from './Password/form/index'
import useClickOutside from '../../component/useClickOutside'

const Profile = () => {
    const [dropdownActive, setDropdownActive] = useState(false)
    const [contentSelected, setContentSelected] = useState('overview')
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)
    const { playlists } = useSelector((state) => state.playlist)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavbar = (content) => {
        setContentSelected(content)
        dispatch(generalStateReset())
        setDropdownActive(false)
    }

    const handleSwitchContent = (content) => {
        setContentSelected(content)
        dispatch(generalStateReset())
    }

    useEffect(() => {
        user && dispatch(getUserPlaylist())
    }, [user, dispatch])

    const domNode = useClickOutside(() => {
        setDropdownActive(false)
    })

    contentSelected === 'overview' && (window.document.title = 'Vein - Account Overview')
    contentSelected === 'edit' && (window.document.title = 'Vein - Edit Profile')
    contentSelected === 'pwd' && (window.document.title = 'Vein - Change Your Password')

    return (
        <div id={style.Profile}>
            <Helmet>
                <style>
                    {'body {background: linear-gradient(180deg, #985500 0%, #000000 100%);}'}
                </style>
            </Helmet>
            <div className={style.Profile_extendNavBar} ref={domNode}>
                <div
                    className={style.ExtendNavBar_head}
                    onClick={() => setDropdownActive(!dropdownActive)}
                >
                    {contentSelected === 'overview' && (
                        <div className={style.ExtendNavBar_dropdownElement}>
                            <HomeIcon />
                            <p>Account Overview</p>
                        </div>
                    )}
                    {contentSelected === 'edit' && (
                        <div className={style.ExtendNavBar_dropdownElement}>
                            <EditIcon />
                            <p>Edit Profile</p>
                        </div>
                    )}
                    {contentSelected === 'pwd' && (
                        <div className={style.ExtendNavBar_dropdownElement}>
                            <LockIcon />
                            <p>Change Password</p>
                        </div>
                    )}
                    {dropdownActive ? (
                        <KeyboardArrowUpRoundedIcon />
                    ) : (
                        <KeyboardArrowDownRoundedIcon />
                    )}
                </div>
                {dropdownActive && (
                    <div className={style.ExtendNavBar_dropdownWrapper}>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => handleNavbar('overview')}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <HomeIcon />
                                <p>Account Overview</p>
                            </div>
                        </div>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => handleNavbar('edit')}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <EditIcon />
                                <p>Edit Profile</p>
                            </div>
                        </div>
                        <div
                            className={style.ExtendNavBar_dropdownElementWrapper}
                            onClick={() => handleNavbar('pwd')}
                        >
                            <div className={style.ExtendNavBar_dropdownElement}>
                                <LockIcon />
                                <p>Change Password</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={style.Profile_sideBar}>
                <h4 id={style.SideBarName}>{userData && userData.username}</h4>
                <div className={style.SideBar_contentHeaderWrapper}>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            contentSelected === 'overview' && style.isSelected
                        }`}
                        onClick={() => handleSwitchContent('overview')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <HomeIcon />
                            <p>Account Overview</p>
                        </div>
                    </div>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            contentSelected === 'edit' && style.isSelected
                        }`}
                        onClick={() => handleSwitchContent('edit')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <EditIcon />
                            <p>Edit Profile</p>
                        </div>
                    </div>
                    <div
                        className={`${style.SideBar_contentHeader} ${
                            contentSelected === 'pwd' && style.isSelected
                        }`}
                        onClick={() => handleSwitchContent('pwd')}
                    >
                        <div className={style.ContentHeader_elementWrapper}>
                            <LockIcon />
                            <p>Change Password</p>
                        </div>
                    </div>
                </div>
                <p id={style.UserPlaylistHeader}>Your Playlists</p>
                <div id={style.UserPlaylistElement}>
                    <p onClick={() => navigate('/favorite')}>Favorite Tracks</p>
                    {playlists.map((playlist) => (
                        <p key={playlist._id} onClick={() => navigate(`/playlist/${playlist._id}`)}>
                            {playlist.name}
                        </p>
                    ))}
                </div>
            </div>
            <div className={style.Profile_mainContent}>
                {contentSelected === 'overview' && (
                    <Overview handleSwitchContent={handleSwitchContent} />
                )}
                {contentSelected === 'edit' && (
                    <ProfileEdit handleSwitchContent={handleSwitchContent} />
                )}
                {contentSelected === 'pwd' && (
                    <PasswordChange handleSwitchContent={handleSwitchContent} />
                )}
            </div>
        </div>
    )
}

export default Profile
