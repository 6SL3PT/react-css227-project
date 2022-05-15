import style from './style.module.css'
import useForm from '../useAddTrackForm'
import alert from '../../../../images/alert.svg'
import formValidateInfo from '../formAddTrackValidateInfo'
import null_img from '../../../../images/null_img.png'
import error_img from '../../../../images/error_img.png'

const PlaylistEdit = ({ setIsActive, playlistData }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(
        setIsActive,
        playlistData,
        formValidateInfo,
    )

    const handleImageError = (e) => {
        e.target.src = error_img
    }

    return (
        <div className={style.MainContent_elementWrapper}>
            <h3>Add Playlist</h3>

            <form className={style.MainContent_addPlaylist} onSubmit={handleSubmit}>
                <div className={style.MainContent_inputWrapper}>
                    <div className={style.AddPlaylist_formGroup}>
                        <label className={style.AddPlaylist_formLabelGroup} htmlFor="name">
                            Playlist Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter playlist name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className={style.AddPlaylistForm_errorMessage}>
                                <img src={alert} />
                                {errors.name}
                            </p>
                        )}

                        <div className={style.AddPlaylist_trackImage}>
                            <img
                                src={values.img ? values.img : null_img}
                                onError={handleImageError}
                            />
                            <div className={style.AddPlaylist_inputWrapper}>
                                <label className={style.AddPlaylist_formLabelGroup} htmlFor="img">
                                    Playlist Image URL
                                </label>
                                <textarea
                                    type="text"
                                    name="img"
                                    placeholder="Enter track image URL"
                                    value={values.img}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <label className={style.AddPlaylist_formLabelGroup} htmlFor="desc">
                            Playlist Description
                        </label>
                        <textarea
                            type="text"
                            name="desc"
                            placeholder="Enter playlist description"
                            value={values.desc}
                            onChange={handleChange}
                            style={{ height: '120px' }}
                        />
                    </div>
                </div>

                <button type="submit" id={style.SubmitBtn}>
                    SAVE DATA
                </button>
                <button id={style.CancelBtn} onClick={() => setIsActive(false)}>
                    CANCEL
                </button>
            </form>
        </div>
    )
}

export default PlaylistEdit
