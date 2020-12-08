const mongoose = require('mongoose')

const recommendationListSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    moviesReco: [Number]
})


const RecommendationList = mongoose.model('Recommendation',recommendationListSchema)
module.exports = RecommendationList