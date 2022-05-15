import axios from 'axios'
import { toast } from 'react-toastify'

const PLAYLIST_ROUTES_API_URL = process.env.REACT_APP_API_URL + '/playlist'

const getUserPlaylist = async (userToken) => {
    const response = await axios.get(PLAYLIST_ROUTES_API_URL + '/user-playlists', {
        headers: {
            'x-auth-token': userToken,
        },
    })

    return response.data.data
}

const addTrack = async (bodyData, userToken) => {
    const response = await axios.put(PLAYLIST_ROUTES_API_URL + '/add-track', bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })
    if (response.data) {
        toast.success('Added to Playlist')
        return response.data.data
    }
}

const removeTrack = async (bodyData, userToken) => {
    const response = await axios.put(PLAYLIST_ROUTES_API_URL + '/remove-track', bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })
    if (response.data) {
        return response.data.data
    }
}

const updatePlaylist = async (playlistId, bodyData, userToken) => {
    const response = await axios.put(PLAYLIST_ROUTES_API_URL + `/edit/${playlistId}`, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })
    if (response.data) {
        return response.data.data
    }
}

const createPlaylist = async (bodyData, userToken) => {
    const response = await axios.post(PLAYLIST_ROUTES_API_URL, bodyData, {
        headers: {
            'x-auth-token': userToken,
            'Content-Type': 'application/json',
        },
    })
    if (response.data) {
        if (response.data.data.tracks) {
            toast.success('Added to Playlist')
        }
        return response.data.data
    }
}

const deletePlaylist = async (playlistId, userToken) => {
    const response = await axios.delete(PLAYLIST_ROUTES_API_URL + `/${playlistId}`, {
        headers: {
            'x-auth-token': userToken,
        },
    })
    if (response.data) {
        toast.success('Removed from Library')
        return response.data.data
    }
}

const playlistService = {
    getUserPlaylist,
    addTrack,
    removeTrack,
    updatePlaylist,
    createPlaylist,
    deletePlaylist,
}

export default playlistService
