import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify'

const USER_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/user'
const TRACK_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/track'

const getUser = async (userToken) => {
    const decodeData = jwt_decode(userToken)
    const response = await axios.get(USER_ROUTES_API_URL + `/${decodeData._id}`, {
        headers: {
            'x-auth-token': userToken,
        },
    })

    return response.data.data
}

const updateFavTrack = async (trackId, userToken) => {
    const response = await axios.put(
        TRACK_ROUTES_API_URL + `/like/${trackId}`,
        {},
        {
            headers: {
                'x-auth-token': userToken,
            },
        },
    )
    if (response.data) {
        toast.success(response.data.message)
    }

    return trackId
}

const updateUser = async (bodyData, userToken) => {
    const decodeData = jwt_decode(userToken)
    const response = await axios.put(USER_ROUTES_API_URL + `/${decodeData._id}`, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })

    return response.data.data
}

const userService = {
    getUser,
    updateFavTrack,
    updateUser,
}

export default userService
