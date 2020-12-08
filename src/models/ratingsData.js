const mongoose = require('mongoose')

const ratingsDataSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        validate(value) {
            if(value<0 || value>5){
                throw new Error('Please enter a valid rating from 0-5')
            }
        }
    }
},{versionKey:false})

//Virtual properties
ratingsDataSchema.virtual('movie',{
    ref:'Movie',
    localField: 'movieId',
    foreignField: 'movieId'
})

const RatingsData = mongoose.model('Rating',ratingsDataSchema)

module.exports = RatingsData