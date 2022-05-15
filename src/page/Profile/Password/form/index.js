import { useSelector } from 'react-redux'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

import style from './style.module.css'
import formValidateInfo from '../formPwdChangeValidateInfo'
import useForm from '../usePasswordForm'
import alert from '../../../../images/alert.svg'

const PasswordChange = ({ handleSwitchContent }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(formValidateInfo)
    const { userData, isSuccess } = useSelector((state) => state.user)

    return (
        <>
            {userData && (
                <div className={style.MainContent_elementWrapper}>
                    <h1>Change Your Password</h1>
                    {isSuccess && (
                        <p id={style.SubmitSuccessStatus}>
                            <CheckCircleRoundedIcon /> Password saved
                        </p>
                    )}
                    <form className={style.MainContent_pwdChange} onSubmit={handleSubmit}>
                        <div className={style.PwdChange_formGroup}>
                            <label className={style.PwdChange_formLabelGroup} htmlFor="currentPwd">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPwd"
                                value={values.currentPwd}
                                onChange={handleChange}
                            />
                            {errors.currentPwd && (
                                <p className={style.PwdChangeForm_errorMessage}>
                                    <img src={alert} />
                                    {errors.currentPwd}
                                </p>
                            )}
                        </div>

                        <div className={style.PwdChange_formGroup}>
                            <label className={style.PwdChange_formLabelGroup} htmlFor="newPwd">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPwd"
                                value={values.newPwd}
                                onChange={handleChange}
                            />
                            {errors.newPwd && (
                                <p className={style.PwdChangeForm_errorMessage}>
                                    <img src={alert} />
                                    {errors.newPwd}
                                </p>
                            )}
                        </div>

                        <div className={style.PwdChange_formGroup}>
                            <label className={style.PwdChange_formLabelGroup} htmlFor="conNewPwd">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="conNewPwd"
                                value={values.conNewPwd}
                                onChange={handleChange}
                            />
                            {errors.conNewPwd && (
                                <p className={style.PwdChangeForm_errorMessage}>
                                    <img src={alert} />
                                    {errors.conNewPwd}
                                </p>
                            )}
                        </div>

                        <button type="submit" id={style.SubmitBtn}>
                            SET NEW PASSWORD
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

export default PasswordChange
