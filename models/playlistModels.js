const mongoose = require('mongoose')
const joi = require('joi')

const ObjectId = mongoose.Schema.Types.ObjectId

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user: { type: ObjectId, ref: 'user', required: true },
    desc: { type: String },
    tracks: { type: Array, default: [] },
    img: { type: String },
})

const playlistSchemaValidate = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        user: joi.string().required(),
        desc: joi.string().allow(''),
        tracks: joi.array().items(joi.string()),
        img: joi.string().allow(''),
    })
    return schema.validate(data)
}

const playlistModel = mongoose.model('playlist', playlistSchema)

module.exports = { playlistModel, playlistSchemaValidate }
