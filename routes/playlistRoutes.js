const router = require('express').Router()
const joi = require('joi')
const { playlistModel, playlistSchemaValidate } = require('../models/playlistModels')
const { trackModel } = require('../models/trackModels')
const { userModel } = require('../models/userModels')
const generalAuth = require('../middleware/generalAuth')
const validateObjectId = require('../middleware/validObjectId')

// Create playlist
router.post('/', generalAuth, async (req, res) => {
    const { error } = playlistSchemaValidate(req.body)
    if (error) {
        return res.status(400).send({ success: false, message: error.details[0].message })
    }

    const user = await userModel.findById(req.user._id)
    const playlist = await playlistModel({ ...req.body, user: user._id }).save()
    user.playlist.push(playlist._id)
    await user.save()

    const newPlaylist = await playlistModel
        .findById(playlist._id)
        .populate('user', '_id username adminRights')
    res.status(201).send({ success: true, data: newPlaylist })
})

// Get all playlists
router.get('/', generalAuth, async (req, res) => {
    const allPlaylists = await playlistModel.find().populate('user', '_id username adminRights')
    res.status(200).send({ success: true, data: allPlaylists })
})

// Get user's playlists
router.get('/user-playlists', generalAuth, async (req, res) => {
    const user = await userModel.findById(req.user._id)
    const allUserPlaylists = await playlistModel.find({ _id: user.playlist })

    res.status(200).send({ success: true, data: allUserPlaylists })
})

// Get playlist by ID
router.get('/get/:id', [validateObjectId], async (req, res) => {
    const playlist = await playlistModel
        .findById(req.params.id)
        .populate('user', '_id username adminRights')

    const tracks = await trackModel.find({ _id: playlist.tracks })
    res.status(200).send({ success: true, data: { playlist, tracks } })
})

// Get random playlists
router.get('/random', async (req, res) => {
    const randPlaylists = await playlistModel.aggregate([{ $sample: { size: 12 } }])
    res.status(200).send({ success: true, data: randPlaylists })
})

// Edit playlist by ID
router.put('/edit/:id', [validateObjectId, generalAuth], async (req, res) => {
    const playlist = await playlistModel.findById(req.params.id)

    const user = await userModel.findById(req.user._id)
    if (!user._id.equals(playlist.user)) {
        return res.status(403).send({ success: false, message: 'Access denied.' })
    }

    const schema = joi.object({
        name: joi.string().required(),
        desc: joi.string().allow(''),
        img: joi.string().allow(''),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({ success: false, message: error.details[0].message })
    }

    const newPlaylist = await playlistModel
        .findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        .populate('user', '_id username adminRights')

    res.status(200).send({ success: true, data: newPlaylist })
})

// Add track to playlist
router.put('/add-track', generalAuth, async (req, res) => {
    const schema = joi.object({
        playlist_id: joi.string().required(),
        track_id: joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({ success: false, message: error.details[0].message })
    }

    const user = await userModel.findById(req.user._id)
    const playlist = await playlistModel.findById(req.body.playlist_id)
    if (!user._id.equals(playlist.user)) {
        return res.status(403).send({ success: false, message: 'Access denied.' })
    }

    if (playlist.tracks.indexOf(req.body.track_id) === -1) {
        playlist.tracks.push(req.body.track_id)
    } else {
        return res.status(400).send({
            success: false,
            message: `This track is already in your '${playlist.name}' playlist`,
        })
    }
    await playlist.save()

    const updatedPlaylist = await playlistModel
        .findById(playlist._id)
        .populate('user', '_id username adminRights')
    res.status(200).send({ success: true, data: updatedPlaylist })
})

// Remove track from playlist
router.put('/remove-track', generalAuth, async (req, res) => {
    const schema = joi.object({
        playlist_id: joi.string().required(),
        track_id: joi.string().required(),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).send({ success: false, message: error.details[0].message })
    }

    const user = await userModel.findById(req.user._id)
    const playlist = await playlistModel.findById(req.body.playlist_id)
    if (!user._id.equals(playlist.user)) {
        return res.status(403).send({ success: false, message: 'Access denied.' })
    }

    const trackIndex = playlist.tracks.indexOf(req.body.track_id)
    playlist.tracks.splice(trackIndex, 1)
    await playlist.save()

    const updatedPlaylist = await playlistModel
        .findById(playlist._id)
        .populate('user', '_id username adminRights')
    res.status(200).send({ success: true, data: updatedPlaylist })
})

// Delete playlist by ID
router.delete('/:id', [validateObjectId, generalAuth], async (req, res) => {
    const user = await userModel.findById(req.user._id)
    const playlist = await playlistModel.findById(req.params.id)
    if (!user._id.equals(playlist.user)) {
        return res.status(403).send({ success: false, message: 'Access denied.' })
    }

    const playlistIndex = user.playlist.indexOf(req.params.id)
    user.playlist.splice(playlistIndex, 1)
    await user.save()
    await playlist.remove()

    const allUserPlaylists = await playlistModel.find({ _id: user.playlist })
    res.status(200).send({ success: true, data: allUserPlaylists })
})

module.exports = router
