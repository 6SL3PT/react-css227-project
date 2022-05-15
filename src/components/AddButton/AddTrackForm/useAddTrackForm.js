import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { generalStateReset, resetError, addTrack } from '../../../redux/track/trackSlice'

const useForm = (setIsActive, formValidateInfo) => {
    const { isError, isSuccess } = useSelector((state) => state.track)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isFetchDuration, setIsFetchDuration] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        name: '',
        artist: '',
        genre: '',
        img: '',
        track: '',
        lyric: '',
        duration: 0,
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
        setIsSubmit(true)
    }

    useEffect(() => {
        if (values.track) {
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
        }
    })

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit && !isFetchDuration && !isSubmitOnce) {
            setIsSubmitOnce(true)
            dispatch(addTrack(values))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
        }

        if (isError) {
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
