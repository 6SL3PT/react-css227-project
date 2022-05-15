import { Link } from 'react-router-dom'
import useForm from '../useSignInForm'
import formValidateInfo from '../formSignInValidateInfo'
import logo from '../../../../images/logo_black.svg'
import alert from '../../../../images/alert.svg'
import style from './style.module.css'

const SignInForm = ({ submitForm }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, formValidateInfo)

    return (
        <form className={style.SignInForm} onSubmit={handleSubmit}>
            <img src={logo} id={style.Logo} />
            <hr style={{ width: '100%', marginTop: '20px', marginBottom: '50px' }}></hr>
            <div className={`${style.Container} ${style.SignInForm_form}`}>
                <h5>To continue, log in to Vein Administration.</h5>
                {(errors.email || errors.pwd) && (
                    <div className={style.SignInForm_formErrorBox}>
                        <img src={alert} />
                        Incorrect username or password.
                    </div>
                )}
                <hr style={{ width: '100%', marginBottom: '20px' }}></hr>

                <div className={style.SignInForm_formLabelGroup}>
                    <label htmlFor="email">Email</label>
                </div>
                <input
                    type="text"
                    name="email"
                    placeholder="Email address"
                    value={values.email}
                    onChange={handleChange}
                />

                <div className={style.SignInForm_formLabelGroup}>
                    <label htmlFor="pwd">Password</label>
                </div>
                <input
                    type="password"
                    name="pwd"
                    placeholder="Password"
                    value={values.pwd}
                    onChange={handleChange}
                />

                <button type="submit">LOG IN</button>
            </div>
        </form>
    )
}

export default SignInForm
