import axios from 'axios'
import { toast } from 'react-toastify'

const AUTH_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/login'
const USER_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/user'

const register = async (userData) => {
    await axios.post(USER_ROUTES_API_URL, userData)
}

const login = async (userData) => {
    const response = await axios.post(AUTH_ROUTES_API_URL, userData)

    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.token))
        toast.success('Login success.')
    }
    return response.data.token
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService
