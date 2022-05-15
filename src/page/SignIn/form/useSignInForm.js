import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../../../redux/auth/authSlice'

const useForm = (callback, formValidateInfo) => {
    const [values, setValues] = useState({
        email: '',
        pwd: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector((state) => state.auth)

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
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            dispatch(login(values))
        }

        if (user || isSuccess) {
            callback()
        }

        if (isError) {
            errors.email = message
        }

        dispatch(reset())
    }, [errors, isSubmit, callback, user, isError, isSuccess, message, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
