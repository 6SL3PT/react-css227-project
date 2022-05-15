import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

import {
    generalStateReset,
    resetError,
    createPlaylist,
} from '../../../redux/playlist/playlistSlice'

const useForm = (setIsActive, formValidateInfo) => {
    const { user } = useSelector((state) => state.auth)
    const { isError, isSuccess } = useSelector((state) => state.track)
    const [isSubmit, setIsSubmit] = useState(false)
    const [errors, setErrors] = useState({})
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        name: '',
        img: '',
        desc: '',
    })
    const dispatch = useDispatch()
    const userId = jwt_decode(user)._id

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
        if (Object.keys(errors).length === 0 && isSubmit && !isSubmitOnce) {
            const body = { ...values, user: userId, tracks: [] }
            setIsSubmitOnce(true)
            dispatch(createPlaylist(body))
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
    }, [isSubmit, isError, isSuccess, isSubmitOnce, errors, values, user, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
