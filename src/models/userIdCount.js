const mongoose = require('mongoose')

const userIdCountSchema = new mongoose.Schema({
    userIdCount: {
        type: Number
    },
    movieIdCount: {
        type: Number
    }
},{versionKey:false})

const UserIdCount = mongoose.model('Count',userIdCountSchema)
module.exports = UserIdCount
