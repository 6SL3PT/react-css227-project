import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'

import logo from '../../images/logo_white.svg'
import style from './style.module.css'
import { useState, useEffect } from 'react'

const Footer = () => {
    const [noMediaPage, setNoMediaPage] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const { currentTrack } = useSelector((state) => state.player)

    useEffect(() => {
        window.location.pathname === '/profile' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/register'
            ? setNoMediaPage(true)
            : setNoMediaPage(false)
    })

    return (
        <footer
            id={`${
                currentTrack && !noMediaPage
                    ? style.Footer___isExpanded
                    : noMediaPage
                    ? style.Footer___isDisableMargin
                    : style.Footer
            }`}
        >
            <div className={(style.Container, style.Footer_content)}>
                <div className={style.Footer_contentAbout}>
                    <img src={logo}></img>
                    <p>
                        Created in 2022, Vein is a music service website<br></br>
                        conceived by KMUTT, CSS227 course's assignment.<br></br>
                        Its mission is to get a good score on the project.
                    </p>
                </div>
                <div className={style.Footer_contentLink}>
                    <h2>Link</h2>
                    {user ? <Link to="/discovery">Home</Link> : <Link to="/">Home</Link>}
                    <Link to="#">Services</Link>
                    <Link to="#">Contact us</Link>
                </div>
                <div className={style.Footer_contentSocialMediaWrapper}>
                    <h2>Social Media</h2>
                    <div className={style.Footer_contentSocialMedia}>
                        <FacebookIcon />
                        <a href={`${process.env.REACT_APP_FACEBOOK_URL}`}>Facebook</a>
                    </div>
                    <div className={style.Footer_contentSocialMedia}>
                        <InstagramIcon />
                        <a href={`${process.env.REACT_APP_INSTAGRAM_URL}`}>Instagram</a>
                    </div>
                    <div className={style.Footer_contentSocialMedia}>
                        <YouTubeIcon />
                        <a href={`${process.env.REACT_APP_YOUTUBE_URL}`}>Youtube</a>
                    </div>
                </div>
            </div>
            <div className={style.Footer_paragraph}>
                <p>&copy;2022 Poohdish Thawornsusin | KMUTT, CSS227 Project | All right reserved</p>
            </div>
        </footer>
    )
}

export default Footer
