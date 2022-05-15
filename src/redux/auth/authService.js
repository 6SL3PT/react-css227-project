import axios from 'axios'
import { toast } from 'react-toastify'

const ADMIN_AUTH_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/login/admin'

const login = async (userData) => {
    const response = await axios.post(ADMIN_AUTH_ROUTES_API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.token))
        toast.success('Login success.')
    }
    return response.data.token
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout,
}

export default authService
