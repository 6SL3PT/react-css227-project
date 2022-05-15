import { Link } from 'react-router-dom'
import useForm from '../useRegisterForm'
import formValidateInfo from '../formRegisterValidateInfo'
import logo from '../../../../images/logo_black.svg'
import alert from '../../../../images/alert.svg'
import style from './style.module.css'

const Form = ({ submitForm }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(submitForm, formValidateInfo)

    return (
        <form className={`${style.Container} ${style.RegisterForm}`} onSubmit={handleSubmit}>
            <img src={logo} />
            <h1>Sign up for free to start listening.</h1>
            <hr style={{ width: '80%', marginBottom: '50px' }}></hr>
            <div id={style.RegisterForm_form}>
                <div className={style.RegisterForm_formLabelGroup}>
                    <label htmlFor="email">Email</label>
                </div>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.email}
                    </p>
                )}

                <div className={style.RegisterForm_formLabelGroup}>
                    <label htmlFor="con-email">Confirm email</label>
                </div>
                <input
                    type="text"
                    name="conEmail"
                    placeholder="Enter your email again"
                    value={values.conEmail}
                    onChange={handleChange}
                />
                {errors.conEmail && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.conEmail}
                    </p>
                )}

                <div className={style.RegisterForm_formLabelGroup}>
                    <label htmlFor="pwd">Password</label>
                </div>
                <input
                    type="password"
                    name="pwd"
                    placeholder="Enter your password"
                    value={values.pwd}
                    onChange={handleChange}
                />
                {errors.pwd && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.pwd}
                    </p>
                )}

                <div className={style.RegisterForm_formLabelGroup}>
                    <label htmlFor="username">Username</label>
                </div>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={values.username}
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.username}
                    </p>
                )}

                <div className={style.RegisterForm_formLabelGroup}>
                    <label>Date of Birth</label>
                </div>
                <div className={style.RegisterForm_dob}>
                    <div className={style.RegisterForm_dobDate}>
                        <div className={style.RegisterForm_formLabelGroup}>
                            <label htmlFor="date">Day</label>
                        </div>
                        <input
                            type="text"
                            name="date"
                            placeholder="DD"
                            maxLength="2"
                            value={values.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={style.RegisterForm_dobMonth}>
                        <div className={style.RegisterForm_formLabelGroup}>
                            <label htmlFor="month">Month</label>
                        </div>

                        <select name="month" value={values.month} onChange={handleChange}>
                            <option disabled value="">
                                Month
                            </option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>

                    <div className={style.RegisterForm_dobYear}>
                        <div className={style.RegisterForm_formLabelGroup}>
                            <label htmlFor="year">Year</label>
                        </div>
                        <input
                            type="text"
                            name="year"
                            placeholder="YYYY"
                            maxLength="4"
                            value={values.year}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {errors.date && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.date}
                    </p>
                )}
                {errors.month && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.month}
                    </p>
                )}
                {errors.year && (
                    <p className={style.RegisterForm_errorMessage}>
                        <img src={alert} />
                        {errors.year}
                    </p>
                )}

                <div className={style.RegisterForm_gender}>
                    <div className={style.RegisterForm_formLabelGroup}>
                        <label>Gender</label>
                    </div>
                    <div className={style.RegisterForm_genderRadio}>
                        <div className={style.RegisterForm_genderType}>
                            <input
                                type="radio"
                                value="male"
                                name="gender"
                                onChange={handleChange}
                            />
                            <label htmlFor="radio-male">Male</label>
                        </div>

                        <div className={style.RegisterForm_genderType}>
                            <input
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleChange}
                            />
                            <label htmlFor="radio-female">Female</label>
                        </div>

                        <div className={style.RegisterForm_genderType}>
                            <input
                                type="radio"
                                value="non-bi"
                                name="gender"
                                onChange={handleChange}
                            />
                            <label htmlFor="radio-non-bi">Non-binary</label>
                        </div>
                    </div>
                    {errors.gender && (
                        <p className={style.RegisterForm_errorMessage}>
                            <img src={alert} />
                            {errors.gender}
                        </p>
                    )}
                </div>
            </div>
            <p className={style.RegisterForm_agreement}>
                By clicking on create account, you agree on Vein's{' '}
                <Link to="#">Terms and Conditions of Use</Link>.
            </p>
            <button className={style.RegisterForm_inputButton} type="submit">
                Create Account
            </button>
            <h4>
                Have an account? <Link to="/login">Sign in</Link>.
            </h4>
        </form>
    )
}

export default Form
