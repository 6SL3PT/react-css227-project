import { Link } from 'react-router-dom'

import logo from '../../../../images/logo_black.svg'
import check_circle from '../../../../images/check.png'
import style from './style.module.css'

const FormSuccess = () => {
    document.title = 'Register success! - Vein'
    window.scrollTo(0, 0)

    return (
        <div className="FormSuccess">
            <div className={`${style.Container} ${style.Success_content}`}>
                <img src={logo} />
                <h1>Sign up for free to start listening.</h1>
                <hr style={{ width: '80%', marginBottom: '50px' }}></hr>
                <div className={style.Success_contentMainText}>
                    <h4>Thanks for joining us, we have received your request!</h4>
                    <img src={check_circle} />
                    <p>
                        You can now <Link to="/login">sign in</Link> using the account you just
                        registered, or you can go back to the home page.
                    </p>
                </div>
                <Link to="/">
                    <button>Go Back</button>
                </Link>
            </div>
        </div>
    )
}

export default FormSuccess
