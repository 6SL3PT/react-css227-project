import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createUser, generalStateReset, resetError } from '../../../redux/user/userSlice'

const useForm = (setIsActive, formValidateInfo) => {
    const [values, setValues] = useState({
        email: '',
        pwd: '',
        username: '',
        date: '',
        month: '',
        year: '',
        gender: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)

    const dispatch = useDispatch()

    const { isError, isSuccess, message } = useSelector((state) => state.user)

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
        setIsSubmitOnce(false)
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit && !isSubmitOnce) {
            setIsSubmitOnce(true)
            dispatch(createUser(values))
        }

        if (isSuccess && isSubmit) {
            setIsSubmit(false)
            dispatch(generalStateReset())
        }

        if (isError) {
            setErrors({ email: message })
            document.getElementsByName('email')[0].style.borderColor = 'red'
            dispatch(resetError())
        }

        if (isSubmitOnce && isSuccess) {
            setIsActive(false)
        }
    }, [errors, isSubmit, isError, isSuccess, message, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
