import style from './style.module.css'
import useForm from '../useEditForm'

const UserEdit = ({ setIsActive, userData }) => {
    const { handleChange, values, handleSubmit } = useForm(setIsActive, userData)

    return (
        <>
            {userData && (
                <div className={style.MainContent_elementWrapper}>
                    <h3>User Rights Management</h3>
                    <form className={style.MainContent_editUser} onSubmit={handleSubmit}>
                        <div className={style.EditUser_formGroup}>
                            <label className={style.EditUser_formLabelGroup} htmlFor="isPremium">
                                Package Status
                            </label>
                            <select
                                name="isPremium"
                                value={values.isPremium}
                                onChange={handleChange}
                            >
                                <option value={true}>Premium</option>
                                <option value={false}>Free</option>
                            </select>

                            <label className={style.EditUser_formLabelGroup} htmlFor="adminRights">
                                Admin Rights
                            </label>
                            <select
                                name="adminRights"
                                value={values.adminRights}
                                onChange={handleChange}
                            >
                                <option value={true}>Admin</option>
                                <option value={false}>User</option>
                            </select>
                        </div>

                        <button type="submit" id={style.SubmitBtn}>
                            SAVE DATA
                        </button>
                        <button id={style.CancelBtn} onClick={() => setIsActive(false)}>
                            CANCEL
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}

export default UserEdit
