const router = require('express').Router()
const { userModel, userSchemaValidate } = require('../models/userModels')
const { playlistModel } = require('../models/playlistModels')
const bcrypt = require('bcrypt')
const adminAuth = require('../middleware/adminAuth')
const generalAuth = require('../middleware/generalAuth')
const validateObjectId = require('../middleware/validObjectId')

// Post request (Create user)
router.post('/', async (req, res) => {
    const { error } = userSchemaValidate(req.body)
    if (error) {
        return res.status(400).send({ success: false, message: error.details[0].message })
    }

    const userEmail = await userModel.findOne({ email: req.body.email })
    if (userEmail) {
        return res
            .status(403)
            .send({ success: false, message: 'User with given email is already existed.' })
    }

    // Password salting and hashing with bcrypt
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND))
    const hashPassword = await bcrypt.hash(req.body.pwd, salt)
    let newUser = await new userModel({
        ...req.body,
        pwd: hashPassword,
    }).save()

    newUser.pwd = undefined
    newUser.__v = undefined
    res.status(200).send({ success: true, data: newUser })
})

// Get all user
router.get('/', adminAuth, async (req, res) => {
    const allUsers = await userModel.find().select('-pwd -__v') // Deselect pwd, __v
    if (!allUsers) {
        return res.status(404).send({ success: false, message: 'No user exist in the database.' })
    }
    res.status(200).send({ success: true, data: allUsers })
})

// Get user by ID
router.get('/:id', [validateObjectId, generalAuth], async (req, res) => {
    const user = await userModel.findById(req.params.id).select('-pwd -__v')
    res.status(200).send({ success: true, data: user })
})

// Update user by ID
router.put('/:id', [validateObjectId, generalAuth], async (req, res) => {
    if (req.body.adminRights != null && !req.user.adminRights) {
        return res.status(401).send({ success: false, message: 'Authorization denied.' })
    }
    if (req.body.email !== req.user.email) {
        const userEmail = await userModel.findOne({ email: req.body.email })
        if (userEmail) {
            return res
                .status(403)
                .send({ success: false, message: 'User with given email is already existed.' })
        }
    }
    if (req.body.newPwd) {
        const user = await userModel.findOne({ _id: req.user._id })
        const pwd = await bcrypt.compare(req.body.pwd, user.pwd)
        if (!pwd) {
            return res
                .status(400)
                .send({ success: false, message: 'The given password is incorrect.' })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND))
        const hashPassword = await bcrypt.hash(req.body.newPwd, salt)
        req.body = { pwd: hashPassword }
    }
    const newData = await userModel
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .select('-pwd -__v')
    res.status(200).send({ success: true, data: newData })
})

// Delete user by ID
router.delete('/:id', [validateObjectId, adminAuth], async (req, res) => {
    const user = await userModel.findById(req.params.id)
    if (user.playlist.length !== 0) {
        user.playlist.map(async (playlist) => await playlistModel.findByIdAndDelete(playlist))
    }

    await userModel.findByIdAndDelete(req.params.id)
    const newData = await userModel.find().select('-pwd -__v')
    res.status(200).send({ success: true, data: newData })
})

module.exports = router
