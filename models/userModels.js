const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
// const pwdComplexity = require('joi-password-complexity')

// Create new schema for user
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    pwd: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    gender: { type: String, required: true },
    favList: { type: [String], default: [] },
    playlist: { type: [String], default: [] },
    isPremium: { type: Boolean, default: false },
    adminRights: { type: Boolean, default: false },
})

// Use JSON Web Token to authentication
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            adminRights: this.adminRights,
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '7d' },
    )
    return token
}

// Validate Data
const userSchemaValidate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        pwd: joi.string().min(8).required(),
        username: joi.string().max(20).required(),
        date: joi.string().required(),
        month: joi.string().required(),
        year: joi.string().required(),
        gender: joi.string().valid('male', 'female', 'non-bi').required(),
    })
    return schema.validate(data)
}

const userModel = mongoose.model('user', userSchema)

module.exports = { userModel, userSchemaValidate }
