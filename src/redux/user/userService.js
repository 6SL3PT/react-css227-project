import axios from 'axios'
import { toast } from 'react-toastify'

const USER_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/user'

const createUser = async (bodyData) => {
    const response = await axios.post(USER_ROUTES_API_URL, bodyData)

    if (response.data) {
        toast.success('Added User to Database')
        return response.data.data
    }
}

const getAllUser = async (userToken) => {
    const response = await axios.get(USER_ROUTES_API_URL, {
        headers: {
            'x-auth-token': userToken,
        },
    })

    return response.data.data
}

const updateUser = async (userId, bodyData, userToken) => {
    const response = await axios.put(USER_ROUTES_API_URL + `/${userId}`, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })

    return response.data.data
}

const deleteUser = async (userId, userToken) => {
    const response = await axios.delete(USER_ROUTES_API_URL + `/${userId}`, {
        headers: {
            'x-auth-token': userToken,
        },
    })

    if (response.data) {
        toast.success('Removed User to Database')
        return response.data.data
    }
}

const userService = {
    createUser,
    getAllUser,
    updateUser,
    deleteUser,
}

export default userService
