const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology: true
    })

module.exports = mongoose