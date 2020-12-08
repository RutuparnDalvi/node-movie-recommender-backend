const express = require('express')
const moviesDataRouter = require('./routers/moviesData')
const ratingsDataRouter = require('./routers/ratingsData')

const app = express()

app.use(express.json())
app.use(moviesDataRouter)
app.use(ratingsDataRouter)

module.exports = app