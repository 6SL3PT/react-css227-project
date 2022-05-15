import { useSelector } from 'react-redux'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

import style from './style.module.css'
import formValidateInfo from '../formProfileEditValidateInfo'
import useForm from '../useEditForm'
import alert from '../../../../images/alert.svg'

const ProfileEdit = ({ handleSwitchContent }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(formValidateInfo)
    const { userData, isSuccess } = useSelector((state) => state.user)

    return (
        <>
            {userData && (
                <div className={style.MainContent_elementWrapper}>
                    <h1>Edit Profile</h1>
                    {isSuccess && (
                        <p id={style.SubmitSuccessStatus}>
                            <CheckCircleRoundedIcon /> Profile saved
                        </p>
                    )}
                    <form className={style.MainContent_editProfile} onSubmit={handleSubmit}>
                        <div className={style.EditProfile_formGroup}>
                            <label className={style.EditProfile_formLabelGroup} htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className={style.ProfileEditForm_errorMessage}>
                                    <img src={alert} />
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className={style.EditProfile_formGroup}>
                            <label className={style.EditProfile_formLabelGroup} htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                            />
                            {errors.username && (
                                <p className={style.ProfileEditForm_errorMessage}>
                                    <img src={alert} />
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div className={style.EditProfile_formGroup}>
                            <label className={style.EditProfile_formLabelGroup} htmlFor="gender">
                                Gender
                            </label>
                            <select name="gender" value={values.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-bi">Non-binary</option>
                            </select>
                        </div>

                        <div className={style.EditProfile_formGroup}>
                            <label className={style.EditProfile_formLabelGroup}>
                                Date of Birth
                            </label>
                            <div className={style.EditProfile_dobGroup}>
                                <input
                                    type="text"
                                    name="date"
                                    maxLength="2"
                                    value={values.date}
                                    onChange={handleChange}
                                />
                                <select name="month" value={values.month} onChange={handleChange}>
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
                                <input
                                    type="text"
                                    name="year"
                                    maxLength="4"
                                    value={values.year}
                                    onChange={handleChange}
                                />
                                {errors.date && (
                                    <p className={style.ProfileEditForm_errorMessage}>
                                        <img src={alert} />
                                        {errors.date}
                                    </p>
                                )}
                                {errors.year && (
                                    <p className={style.ProfileEditForm_errorMessage}>
                                        <img src={alert} />
                                        {errors.year}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button type="submit" id={style.SubmitBtn}>
                            SAVE PROFILE
                        </button>
                        <button
                            id={style.CancelBtn}
                            onClick={() => handleSwitchContent('overview')}
                        >
                            CANCEL
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default ProfileEdit
