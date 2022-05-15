import { useCallback, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Form from './form/SignInForm/SignInForm'

const SignIn = () => {
    const [isSubmit, setIsSubmit] = useState(false)

    const submitForm = useCallback(() => {
        setIsSubmit(true)
    }, [setIsSubmit])

    window.scrollTo(0, 0)

    document.title = 'Sign in - Vein'

    return <div>{!isSubmit ? <Form submitForm={submitForm} /> : <Navigate to="/discovery" />}</div>
}

export default SignIn
