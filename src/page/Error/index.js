import { Link } from 'react-router-dom'
import logo from '../../images/logo_black.svg'
import style from './style.module.css'

const ErrorPage = () => {
    window.scrollTo(0, 0)

    return (
        <div id={style.Error}>
            <div className={`${style.Container} ${style.Page_content}`}>
                <div className={style.Page_contentImg}>
                    <img src={logo} />
                </div>
                <div className={style.Page_contentMessage}>
                    <h1>Page not found</h1>
                    <p>
                        We could not find the page on our servers.<br></br>
                        Please check if you type the url correctly,<br></br>
                        or you can go back to <Link to="/">Home Page</Link> to try again.
                        <br></br>
                        <br></br>
                        Sorry for your inconvenient.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
