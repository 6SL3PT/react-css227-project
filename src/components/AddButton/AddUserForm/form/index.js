import { useDispatch } from 'react-redux'
import { generalStateReset } from '../../../../redux/user/userSlice'

import useForm from '../useAddUserForm'
import formValidateInfo from '../formAddUserValidateInfo'
import alert from '../../../../images/alert.svg'
import style from './style.module.css'

const AddUser = ({ setIsActive }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(setIsActive, formValidateInfo)
    const dispatch = useDispatch()

    return (
        <div className={style.MainContent_elementWrapper}>
            <h3>Add User</h3>
            <form className={style.MainContent_addUser} onSubmit={handleSubmit}>
                <div className={style.MainContent_inputWrapper}>
                    <div className={style.AddUser_formGroup}>
                        <div className={style.AddUser_formLabelGroup}>
                            <label htmlFor="email">Email</label>
                        </div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter user email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.email}
                            </p>
                        )}

                        <div className={style.AddUser_formLabelGroup}>
                            <label htmlFor="pwd">Password</label>
                        </div>
                        <input
                            type="password"
                            name="pwd"
                            placeholder="Enter user password"
                            value={values.pwd}
                            onChange={handleChange}
                        />
                        {errors.pwd && (
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.pwd}
                            </p>
                        )}

                        <div className={style.AddUser_formLabelGroup}>
                            <label htmlFor="username">Username</label>
                        </div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter user username"
                            value={values.username}
                            onChange={handleChange}
                        />
                        {errors.username && (
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.username}
                            </p>
                        )}

                        <div className={style.AddUser_formLabelGroup}>
                            <label>Date of Birth</label>
                        </div>
                        <div className={style.AddUser_dobWrapper}>
                            <div className={style.AddUser_dobDate}>
                                <div className={style.AddUser_formLabelGroup}>
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

                            <div className={style.AddUser_dobMonth}>
                                <div className={style.AddUser_formLabelGroup}>
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

                            <div className={style.AddUser_dobYear}>
                                <div className={style.AddUser_formLabelGroup}>
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
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.date}
                            </p>
                        )}
                        {errors.month && (
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.month}
                            </p>
                        )}
                        {errors.year && (
                            <p className={style.AddUser_errorMessage}>
                                <img src={alert} />
                                {errors.year}
                            </p>
                        )}

                        <div className={style.AddUser_genderWrapper}>
                            <div className={style.AddUser_formLabelGroup}>
                                <label>Gender</label>
                            </div>
                            <div className={style.AddUser_genderRadio}>
                                <div className={style.radioWrapper}>
                                    <input
                                        type="radio"
                                        value="male"
                                        name="gender"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="radio-male">Male</label>
                                </div>

                                <div className={style.radioWrapper}>
                                    <input
                                        type="radio"
                                        value="female"
                                        name="gender"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="radio-female">Female</label>
                                </div>

                                <div className={style.radioWrapper}>
                                    <input
                                        type="radio"
                                        value="non-bi"
                                        name="gender"
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="radio-non-bi">Non-binary</label>
                                </div>

                                {errors.gender && (
                                    <div className={style.AddUser_errorMessage}>
                                        <img src={alert} />
                                        <p>{errors.gender}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button id={style.SubmitBtn} type="submit">
                    CREATE USER
                </button>
                <button
                    id={style.CancelBtn}
                    onClick={() => (dispatch(generalStateReset()), setIsActive(false))}
                >
                    CANCEL
                </button>
            </form>
        </div>
    )
}

export default AddUser
