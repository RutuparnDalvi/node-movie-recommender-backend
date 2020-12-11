const express = require('express')
const mongoose = require('../db/mongoose')
const MoviesData = require('../models/moviesData')
const RatingsData = require('../models/ratingsData')
const router = express.Router()

router.get('/movie/:movieId',async(req,res)=>{
    const movieId = req.params.movieId

    try{
        const movie = await MoviesData.findOne({movieId})

        if(!movie){
           return res.status(404).send()
        }

        res.send(movie)
    }catch (e) {
        res.status(500).send(e)
    }
})

//Fetch list of movies that the user has not rated yet

//Pass 000000000000000000000000 if no last id exists; else pass the last id

router.get('/movies/:userId/:last_id',async (req,res)=>{

    const last_id = mongoose.Types.ObjectId(req.params.last_id)

    try{
        const movies = await MoviesData.find({_id:{$gt:last_id}},null,{limit:10})

        if(!movies){
            return res.status(404).send()
        }
        res.send(movies)
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router