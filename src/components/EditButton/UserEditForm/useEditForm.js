import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { generalStateReset, resetError, updateUser } from '../../../redux/user/userSlice'

const useForm = (setIsActive, userData) => {
    const { isError, isSuccess } = useSelector((state) => state.user)
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        isPremium: userData.isPremium,
        adminRights: userData.adminRights,
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
        if (
            values.isPremium !== userData.isPremium ||
            values.adminRights !== userData.adminRights
        ) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        if (isSubmit) {
            const body = { _id: userData._id, data: values }
            setIsSubmitOnce(false)
            dispatch(updateUser(body))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
            setIsSubmitOnce(true)
            dispatch(generalStateReset())
        }

        if (isError) {
            toast.error('Something went wrong!')
            dispatch(resetError())
        }

        if (isSubmitOnce) {
            setIsActive(false)
        }
    }, [isSubmit, isError, isSuccess, isSubmitOnce, dispatch])

    return { handleChange, values, handleSubmit }
}

export default useForm
