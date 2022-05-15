import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import {
    updatePlaylist,
    resetError,
    generalStateReset,
} from '../../../redux/playlist/playlistSlice'

const useForm = (formValidateInfo, handleEditPopUp, handleSetPlaylist, playlist) => {
    const { isError, isSuccess, message } = useSelector((state) => state.playlist)
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        name: playlist.name,
        img: playlist.img,
        desc: playlist.desc,
    })

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(formValidateInfo(values))
        if (
            values.name !== playlist.name ||
            values.img !== playlist.img ||
            values.desc !== playlist.desc
        ) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            const body = { _id: playlist._id, body: values }
            setIsSubmitOnce(false)
            dispatch(updatePlaylist(body))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
            setIsSubmitOnce(true)
            handleSetPlaylist(values)
            dispatch(generalStateReset())
        }

        if (isSubmitOnce) {
            handleEditPopUp(false)
        }

        if (isError && !isSubmitOnce) {
            toast.warn(message)
            dispatch(resetError())
        }
    }, [isSubmit, isSubmitOnce, isError, isSuccess, message, values, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
