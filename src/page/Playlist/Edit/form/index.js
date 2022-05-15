import style from './style.module.css'
import formValidateInfo from '../formPlaylistEditValidateInfo'
import useForm from '../useEditForm'
import alert from '../../../../images/alert.svg'

const PlaylistEdit = ({ handleEditPopUp, handleSetPlaylist, playlist }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(
        formValidateInfo,
        handleEditPopUp,
        handleSetPlaylist,
        playlist,
    )

    return (
        <form className={style.MainContent_editPlaylist} onSubmit={handleSubmit}>
            <div className={style.EditPlaylist_formGroup}>
                <label className={style.EditPlaylist_formLabelGroup} htmlFor="name">
                    Name
                </label>
                <input type="text" name="name" value={values.name} onChange={handleChange} />
                {errors.name && (
                    <p className={style.PlaylistEditForm_errorMessage}>
                        <img src={alert} />
                        {errors.name}
                    </p>
                )}
            </div>

            <div className={style.EditPlaylist_formGroup}>
                <label className={style.EditPlaylist_formLabelGroup} htmlFor="img">
                    Image URL
                </label>
                <input type="text" name="img" value={values.img} onChange={handleChange} />
            </div>

            <div className={style.EditPlaylist_formGroup}>
                <label className={style.EditPlaylist_formLabelGroup} htmlFor="desc">
                    Description
                </label>
                <textarea type="text" name="desc" value={values.desc} onChange={handleChange} />
            </div>

            <button type="submit" id={style.SubmitBtn}>
                SAVE
            </button>
            <button id={style.CancelBtn} onClick={() => handleEditPopUp(false)}>
                CANCEL
            </button>
        </form>
    )
}

export default PlaylistEdit
