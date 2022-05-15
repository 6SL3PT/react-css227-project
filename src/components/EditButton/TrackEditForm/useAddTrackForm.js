import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { generalStateReset, resetError, updateTrack } from '../../../redux/track/trackSlice'

const useForm = (setIsActive, trackData, formValidateInfo) => {
    const { isError, isSuccess } = useSelector((state) => state.track)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isFetchDuration, setIsFetchDuration] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        name: trackData.name,
        artist: trackData.artist,
        genre: trackData.genre,
        img: trackData.img,
        track: trackData.track,
        lyric: trackData.img,
        duration: trackData.duration,
    })
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
        dispatch(generalStateReset())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(formValidateInfo(values))
        setIsSubmitOnce(false)
        if (
            values.name !== trackData.name ||
            values.artist !== trackData.artist ||
            values.genre !== trackData.genre ||
            values.img !== trackData.img ||
            values.track !== trackData.track ||
            values.lyric !== trackData.img ||
            values.duration !== trackData.duration
        ) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        if (values.track !== trackData.track) {
            setIsFetchDuration(true)
            const audio = new Audio(values.track)
            audio.onerror = () => {
                values.duration = 0
            }
            audio.oncanplay = () => {
                const duration = Math.floor(audio.duration)
                values.duration = duration
            }
            setIsFetchDuration(false)
        } else {
            values.duration = trackData.duration
        }
    })

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit && !isFetchDuration && !isSubmitOnce) {
            setIsSubmitOnce(true)
            const body = { _id: trackData._id, data: values }
            dispatch(updateTrack(body))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
            toast.success('Added Track to Database')
        }

        if (isError && !isSubmitOnce) {
            toast.error('Something went wrong!')
            dispatch(resetError())
        }

        if (isSubmitOnce) {
            setIsActive(false)
        }
    }, [isSubmit, isError, isSuccess, isSubmitOnce, errors, values, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
