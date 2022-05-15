const router = require('express').Router()
const { userModel } = require('../models/userModels')
const { trackModel, trackSchemaValidate } = require('../models/trackModels')
const generalAuth = require('../middleware/generalAuth')
const adminAuth = require('../middleware/adminAuth')
const validateObjectId = require('../middleware/validObjectId')

// Create track
router.post('/', adminAuth, async (req, res) => {
    const { error } = trackSchemaValidate(req.body)
    if (error) {
        res.status(400).send({ message: error.details[0].message })
    }

    const track = await trackModel(req.body).save()
    res.status(201).send({ success: true, data: track })
})

// Get all tracks
router.get('/', async (req, res) => {
    const allTracks = await trackModel.find()
    res.status(200).send({ success: true, data: allTracks })
})

// Get track by ID
router.get('/get/:id', [validateObjectId], async (req, res) => {
    const data = await trackModel.findById(req.params.id)
    res.send({ success: true, data: data })
})

// Get user's favorite tracks list
router.get('/like', generalAuth, async (req, res) => {
    const user = await userModel.findById(req.user._id)
    const favTracks = await trackModel.find({ _id: user.favList })

    res.status(200).send({ success: true, data: favTracks })
})

// Get random tracks
router.get('/random', async (req, res) => {
    const randTracks = await trackModel.aggregate([{ $sample: { size: 20 } }])
    res.status(200).send({ success: true, data: randTracks })
})

// Get top 10 favorite tracks
router.get('/top', async (req, res) => {
    const topTracks = await trackModel.find().sort({ favAmount: -1 }).limit(10)
    res.status(200).send({ success: true, data: topTracks })
})

// Update track by ID
router.put('/:id', [validateObjectId, adminAuth], async (req, res) => {
    const newData = await trackModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send({ success: true, data: newData })
})

// Update favorite tracks
router.put('/like/:id', [validateObjectId, generalAuth], async (req, res) => {
    const track = await trackModel.findById(req.params.id)
    const user = await userModel.findById(req.user._id)
    const trackIndex = user.favList.indexOf(track._id)

    let respondMessage = ''
    if (trackIndex === -1) {
        user.favList.push(track._id)
        await trackModel.findByIdAndUpdate(req.params.id, { $inc: { favAmount: 1 } })
        respondMessage = 'Added to your Favorite Tracks'
    } else {
        user.favList.splice(trackIndex, 1)
        await trackModel.findByIdAndUpdate(req.params.id, { $inc: { favAmount: -1 } })
        respondMessage = 'Removed from your Favorite Tracks'
    }

    await user.save()
    res.status(200).send({ success: true, message: respondMessage })
})

// Delete track by ID
router.delete('/:id', [validateObjectId, adminAuth], async (req, res) => {
    await trackModel.findByIdAndDelete(req.params.id)
    const newData = await trackModel.find()

    res.status(200).send({ success: true, data: newData })
})

module.exports = router
