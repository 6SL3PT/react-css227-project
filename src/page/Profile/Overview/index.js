import { useSelector, useDispatch } from 'react-redux'

import { updateUser } from '../../../redux/user/userSlice'
import style from './style.module.css'

const Overview = ({ handleSwitchContent }) => {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleChangePlan = (premiumStatus) => {
        const body = { isPremium: premiumStatus }
        dispatch(updateUser(body))
    }

    return (
        <>
            {userData && (
                <div className={style.MainContent_elementWrapper}>
                    <h1>Account Overview</h1>
                    <div className={style.MainContent_profile}>
                        <p className={style.MainContent_typeHeader}>Profile</p>
                        <table className={style.ProfileContent}>
                            <tbody>
                                <tr className={style.ProfileContent_row}>
                                    <td className={style.ProfileContent_colFields}>Username:</td>
                                    <td className={style.ProfileContent_colValue}>
                                        {userData.username}
                                    </td>
                                </tr>
                                <tr className={style.ProfileContent_row}>
                                    <td className={style.ProfileContent_colFields}>Email:</td>
                                    <td className={style.ProfileContent_colValue}>
                                        {userData.email}
                                    </td>
                                </tr>
                                <tr className={style.ProfileContent_row}>
                                    <td className={style.ProfileContent_colFields}>
                                        Date of Birth:
                                    </td>
                                    <td className={style.ProfileContent_colValue}>
                                        {userData.date}/{userData.month}/{userData.year}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick={() => handleSwitchContent('edit')}>Edit Profile</button>
                    </div>
                    <div className={style.MainContent_package}>
                        <p className={style.MainContent_typeHeader}>Package</p>
                        {userData.isPremium ? (
                            <div className={style.MainContent_packageWrapper}>
                                <div className={style.PackageContent}>
                                    <div className={style.PackageContent_textWrapper}>
                                        <p>Your current package is:</p>
                                        <h1>Vein Premium</h1>
                                    </div>
                                    <p id={style.PackageDetail}>
                                        No limitation in any services and features.
                                    </p>
                                </div>
                                <button onClick={() => handleChangePlan(false)}>
                                    Cancel Subscription
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className={style.PackageContent}>
                                    <div className={style.PackageContent_textWrapperFree}>
                                        <p>Your current package is:</p>
                                        <h1>Vein Free</h1>
                                    </div>
                                    <p id={style.PackageDetail}>
                                        Unable to use some of feature such as skip &amp; backward
                                        tracks, and progress bar interaction.
                                    </p>
                                </div>
                                <button onClick={() => handleChangePlan(true)}>
                                    Upgrade to Premium
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default Overview
