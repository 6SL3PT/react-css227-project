import { useSelector } from 'react-redux'

import style from './style.module.css'
import useForm from '../useAddTrackForm'
import alert from '../../../../images/alert.svg'
import formValidateInfo from '../formAddTrackValidateInfo'
import null_img from '../../../../images/null_img.png'
import error_img from '../../../../images/error_img.png'

const TrackEdit = ({ setIsActive, trackData }) => {
    const { handleChange, values, handleSubmit, errors } = useForm(
        setIsActive,
        trackData,
        formValidateInfo,
    )
    const { tracksData } = useSelector((state) => state.track)

    const handleImageError = (e) => {
        e.target.src = error_img
    }

    const uniqueArtist = [...new Set(tracksData.map((track) => track.artist))]
    const uniqueGenre = [...new Set(tracksData.map((track) => track.genre))]

    return (
        <div className={style.MainContent_elementWrapper}>
            <h3>Edit Track</h3>

            <form className={style.MainContent_addTrack} onSubmit={handleSubmit}>
                <div className={style.MainContent_inputWrapper}>
                    <div className={style.AddTrack_formGroup}>
                        <label className={style.AddTrack_formLabelGroup} htmlFor="name">
                            Track Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter track name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && (
                            <p className={style.AddTrackForm_errorMessage}>
                                <img src={alert} />
                                {errors.name}
                            </p>
                        )}

                        <div className={style.AddTrack_comboBoxWrapper}>
                            <div className={style.AddTrack_comboBox}>
                                <label className={style.AddTrack_formLabelGroup} htmlFor="artist">
                                    Track Artist
                                </label>
                                <input
                                    type="text"
                                    name="artist"
                                    placeholder="Enter track artist"
                                    value={values.artist}
                                    onChange={handleChange}
                                    list="artist"
                                />
                                <datalist id="artist">
                                    {uniqueArtist.map((artist) => (
                                        <option key={artist}>{artist}</option>
                                    ))}
                                </datalist>
                                {errors.artist && (
                                    <p className={style.AddTrackForm_errorMessage}>
                                        <img src={alert} />
                                        {errors.artist}
                                    </p>
                                )}
                            </div>
                            <div className={style.AddTrack_comboBox}>
                                <label className={style.AddTrack_formLabelGroup} htmlFor="genre">
                                    Track Genre
                                </label>
                                <input
                                    type="text"
                                    name="genre"
                                    placeholder="Enter track genre"
                                    value={values.genre}
                                    onChange={handleChange}
                                    list="genre"
                                />
                                <datalist id="genre">
                                    {uniqueGenre.map((genre) => (
                                        <option key={genre}>{genre}</option>
                                    ))}
                                </datalist>
                                {errors.genre && (
                                    <p className={style.AddTrackForm_errorMessage}>
                                        <img src={alert} />
                                        {errors.genre}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={style.AddTrack_trackImage}>
                            <img
                                src={values.img ? values.img : null_img}
                                onError={handleImageError}
                            />
                            <div className={style.AddTrack_inputWrapper}>
                                <label className={style.AddTrack_formLabelGroup} htmlFor="img">
                                    Track Image URL
                                </label>
                                <textarea
                                    type="text"
                                    name="img"
                                    placeholder="Enter track image URL"
                                    value={values.img}
                                    onChange={handleChange}
                                />
                                {errors.img && (
                                    <p className={style.AddTrackForm_errorMessage}>
                                        <img src={alert} />
                                        {errors.img}
                                    </p>
                                )}
                            </div>
                        </div>

                        <label className={style.AddTrack_formLabelGroup} htmlFor="track">
                            Track Audio URL
                        </label>
                        <textarea
                            type="text"
                            name="track"
                            placeholder="Enter track audio URL"
                            value={values.track}
                            onChange={handleChange}
                        />
                        {errors.track && (
                            <p className={style.AddTrackForm_errorMessage}>
                                <img src={alert} />
                                {errors.track}
                            </p>
                        )}

                        <label className={style.AddTrack_formLabelGroup} htmlFor="lyric">
                            Track Lyric
                        </label>
                        <textarea
                            type="text"
                            name="lyric"
                            placeholder="Enter track lyric"
                            value={values.lyric}
                            onChange={handleChange}
                            style={{ height: '200px' }}
                        />
                        {errors.lyric && (
                            <p className={style.AddTrackForm_errorMessage}>
                                <img src={alert} />
                                {errors.lyric}
                            </p>
                        )}
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

export default TrackEdit
