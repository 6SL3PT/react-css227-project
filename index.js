require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const playlistRoutes = require('./routes/playlistRoutes')
const searchRoutes = require('./routes/searchRoutes')
const trackRoutes = require('./routes/trackRoutes')
const userRoutes = require('./routes/userRoutes')

const dbConnect = require('./database')
const app = express()
dbConnect()
app.use(cors())
app.use(express.json())

app.use('/api/login', authRoutes)
app.use('/api/playlist', playlistRoutes)
app.use('/api/', searchRoutes)
app.use('/api/track', trackRoutes)
app.use('/api/user', userRoutes)

const port = process.env.PORT || 8080
app.listen(port, console.log(`Server running on port : ${port}`))
