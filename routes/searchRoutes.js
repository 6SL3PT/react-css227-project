const router = require('express').Router()
const { trackModel } = require('../models/trackModels')
const { playlistModel } = require('../models/playlistModels')

router.get('/', async (req, res) => {
    const search = req.query.search
    if (search !== '') {
        const tracks = await trackModel.find({
            name: { $regex: search, $options: 'i' },
        })
        const artists = await trackModel.find({
            artist: { $regex: search, $options: 'i' },
        })
        const playlists = await playlistModel.find({
            name: { $regex: search, $options: 'i' },
        })
        const result = { tracks, artists, playlists }
        res.status(200).send(result)
    } else {
        res.status(200).send({})
    }
})

module.exports = router
