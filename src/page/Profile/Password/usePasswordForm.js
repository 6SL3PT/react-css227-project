import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { generalStateReset, updateUser } from '../../../redux/user/userSlice'

const useForm = (formValidateInfo) => {
    const { isError, isSuccess, message } = useSelector((state) => state.user)
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isSubmitOnce, setIsSubmitOnce] = useState(false)
    const [values, setValues] = useState({
        currentPwd: '',
        newPwd: '',
        conNewPwd: '',
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
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            const body = { pwd: values.currentPwd, newPwd: values.newPwd }
            setIsSubmitOnce(false)
            dispatch(updateUser(body))
        }

        if (isSuccess) {
            setIsSubmit(false)
            setIsSubmitOnce(true)
            setValues({
                currentPwd: '',
                newPwd: '',
                conNewPwd: '',
            })
            document.getElementsByName('currentPwd')[0].style.borderColor = 'grey'
        }

        if (isError && !isSubmitOnce) {
            errors.currentPwd = message
            document.getElementsByName('currentPwd')[0].style.borderColor = 'red'
        }
    }, [errors, isSubmit, isError, isSuccess, message, dispatch])

    return { handleChange, values, handleSubmit, errors }
}

export default useForm
