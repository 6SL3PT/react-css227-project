import { useCallback, useState } from 'react'
import Form from './form/RegisterForm/RegisterForm'
import FormSuccess from './form/FormSuccess/FormSuccess'

const Register = () => {
    const [isSubmit, setIsSubmit] = useState(false)

    const submitForm = useCallback(() => {
        setIsSubmit(true)
    }, [setIsSubmit])

    document.title = 'Create Account - Vein'
    window.scrollTo(0, 0)

    return <div>{!isSubmit ? <Form submitForm={submitForm} /> : <FormSuccess />}</div>
}

export default Register
