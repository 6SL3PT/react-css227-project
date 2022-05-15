const router = require('express').Router()
const { userModel } = require('../models/userModels')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ success: false, message: 'Invalid email or password.' })
    }

    const pwd = await bcrypt.compare(req.body.pwd, user.pwd)
    if (!pwd) {
        return res.status(400).send({ success: false, message: 'Invalid email or password.' })
    }

    const token = user.generateAuthToken()
    res.status(200).send({ success: true, token: token })
})

router.post('/admin', async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ success: false, message: 'Invalid email or password.' })
    }
    if (!user.adminRights) {
        return res.status(400).send({ success: false, message: 'Invalid email or password.' })
    }

    const pwd = await bcrypt.compare(req.body.pwd, user.pwd)
    if (!pwd) {
        return res.status(400).send({ success: false, message: 'Invalid email or password.' })
    }

    const token = user.generateAuthToken()
    res.status(200).send({ success: true, token: token })
})

module.exports = router
