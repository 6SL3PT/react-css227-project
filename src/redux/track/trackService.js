import axios from 'axios'
import { toast } from 'react-toastify'

const TRACK_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/track'

const getAllTrack = async () => {
    const response = await axios.get(TRACK_ROUTES_API_URL)

    return response.data.data
}

const addTrack = async (bodyData, userToken) => {
    const response = await axios.post(TRACK_ROUTES_API_URL, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })
    if (response.data) {
        toast.success('Added Track to Database')
        return response.data.data
    }
}

const updateTrack = async (trackId, bodyData, userToken) => {
    const response = await axios.put(TRACK_ROUTES_API_URL + `/${trackId}`, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })

    return response.data.data
}

const deleteTrack = async (trackId, userToken) => {
    const response = await axios.delete(TRACK_ROUTES_API_URL + `/${trackId}`, {
        headers: {
            'x-auth-token': userToken,
        },
    })

    if (response.data) {
        toast.success('Removed Track to Database')
        return response.data.data
    }
}

const trackService = {
    getAllTrack,
    addTrack,
    updateTrack,
    deleteTrack,
}

export default trackService
