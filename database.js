const mongoose = require('mongoose')

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        await mongoose.connect(process.env.MONGOOSE_DB, connectionParams)
        console.log('Connected to database successfully.')
    } catch (e) {
        console.log('Could not connect to database.', e)
    }
}
