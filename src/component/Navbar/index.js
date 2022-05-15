import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { IconButton } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'

import { logout, reset as authReset } from '../../redux/auth/authSlice'
import { getUser, reset as userReset } from '../../redux/user/userSlice'
import { reset as playlistReset } from '../../redux/playlist/playlistSlice'
import useClickOutside from '../useClickOutside'
import logo from '../../images/logo_white.svg'
import style from './style.module.css'

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { userData } = useSelector((state) => state.user)

    const [dropdownActive, setDropdownActive] = useState(false)
    const [onSearchPage, setOnSearchPage] = useState(false)
    const [isScroll, setIsScroll] = useState(false)

    const toHomePage = () => {
        window.scrollTo(0, 0)
        user ? navigate('/discovery') : navigate('/')
    }

    const toPremium = () => {
        navigate('/profile')
        window.scrollTo({ top: 400, left: 0, behavior: 'smooth' })
    }

    const onLogOut = () => {
        dispatch(logout())
        dispatch(authReset())
        dispatch(userReset())
        dispatch(playlistReset())
        navigate('/')
    }

    const changeBackground = () => {
        window.scrollY >= 10 ? setIsScroll(true) : setIsScroll(false)
    }

    useEffect(() => {
        user && dispatch(getUser())
    }, [user, dispatch])

    useEffect(() => {
        window.location.pathname === '/search' ? setOnSearchPage(true) : setOnSearchPage(false)
    })

    const domNode = useClickOutside(() => {
        setDropdownActive(false)
    })

    window.addEventListener('scroll', changeBackground)

    return (
        <nav className={`${isScroll ? style.Navbar___isChangeBackground : style.Navbar}`}>
            <div className={style.Container}>
                <ul className={style.Navbar_leftElement}>
                    <li>
                        <img src={logo} id={style.Logo} onClick={toHomePage} />
                    </li>
                    {user && (
                        <li className={style.Navbar_list}>
                            <Link to="/discovery" onClick={() => window.scrollTo(0, 0)}>
                                <p id={style.FirstChild}>Home</p>
                            </Link>
                            <Link to="/library" onClick={() => window.scrollTo(0, 0)}>
                                <p>Library</p>
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className={style.Navbar_rightElement}>
                    {user ? (
                        <li className={style.Navbar_dropdown} ref={domNode}>
                            <div
                                className={`${style.Dropdown_head} ${
                                    isScroll && style.___isDisplayBorder
                                }`}
                                onClick={() => setDropdownActive(!dropdownActive)}
                            >
                                <p>Hi, {userData ? userData.username : 'user'}</p>
                                {dropdownActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </div>
                            {dropdownActive && (
                                <div className={style.Dropdown_body}>
                                    <Link to="/profile">
                                        <p
                                            className={style.Dropdown_bodyList}
                                            onClick={() => (
                                                setDropdownActive(false), window.scrollTo(0, 0)
                                            )}
                                        >
                                            Profile
                                        </p>
                                    </Link>
                                    {userData.isPremium ? null : (
                                        <p
                                            className={style.Dropdown_bodyList}
                                            onClick={() => (setDropdownActive(false), toPremium())}
                                        >
                                            Upgrade to Premium
                                        </p>
                                    )}
                                    <p
                                        className={style.Dropdown_bodyList}
                                        id={style.LogOutBtn}
                                        onClick={() => onLogOut()}
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li className="Navbar_btnWrapper">
                            <Link to="/login">
                                <button id={style.SignInBtn}>Sign in</button>
                            </Link>
                            <Link to="/register">
                                <button id={style.CreateBtn}>Create Account</button>
                            </Link>
                        </li>
                    )}
                    {onSearchPage ? null : (
                        <li>
                            <IconButton
                                id={style.SearchCircle}
                                onClick={() => (window.scrollTo(0, 0), navigate('/search'))}
                            >
                                <SearchIcon />
                            </IconButton>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
