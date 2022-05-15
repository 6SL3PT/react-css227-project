import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../../../redux/auth/authSlice'

const useForm = (callback, formValidateInfo) => {
    const [values, setValues] = useState({
        email: '',
        conEmail: '',
        pwd: '',
        username: '',
        date: '',
        month: '',
        year: '',
        gender: '',
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
            delete values.conEmail
            dispatch(register(values))
        }

        if (isError) {
            errors.email = message
            document.getElementsByName('email')[0].style.borderColor = 'red'
        }

        if (isSuccess) {
            callback()
        }

        dispatch(reset())
    }, [errors, isSubmit, callback, user, isError, isSuccess, message, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
