const mongoose = require('../db/mongoose')

const moviesDataSchema = new mongoose.Schema({
        movieId: {
            type: Number,
            ref: 'Rating'
        },
        title: {
            type: String
        },
        genres: {
            type: String
        }
    },{versionKey:false})

const MoviesData = mongoose.model('Movie',moviesDataSchema)

module.exports = MoviesData