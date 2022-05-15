import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
    generalStateReset,
    resetError,
    updatePlaylist,
} from '../../../redux/playlist/playlistSlice'

const useForm = (setIsActive, playlistData, formValidateInfo) => {
    const { isError, isSuccess } = useSelector((state) => state.track)
    const [isSubmit, setIsSubmit] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        name: playlistData.name,
        img: playlistData.img,
        desc: playlistData.desc,
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
            values.name !== playlistData.name ||
            values.img !== playlistData.img ||
            values.desc !== playlistData.desc
        ) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit && !isSubmitOnce) {
            const body = { _id: playlistData._id, data: values }
            setIsSubmitOnce(true)
            dispatch(updatePlaylist(body))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
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
