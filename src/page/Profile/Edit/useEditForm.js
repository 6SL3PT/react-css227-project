import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateUser, generalStateReset } from '../../../redux/user/userSlice'

const useForm = (formValidateInfo) => {
    const { userData, isError, isSuccess, message } = useSelector((state) => state.user)
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        email: userData.email,
        username: userData.username,
        gender: userData.gender,
        date: userData.date,
        month: userData.month,
        year: userData.year,
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
        if (
            values.email !== userData.email ||
            values.username !== userData.username ||
            values.gender !== userData.gender ||
            values.date !== userData.date ||
            values.month !== userData.month ||
            values.year !== userData.year
        ) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            setIsSubmitOnce(false)
            dispatch(updateUser(values))
        }

        if (isSuccess) {
            setIsSubmit(false)
            setIsSubmitOnce(true)
        }

        if (isError && !isSubmitOnce) {
            errors.email = message
            document.getElementsByName('email')[0].style.borderColor = 'red'
        }
    }, [errors, isSubmit, isError, isSuccess, isSubmitOnce, message, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
