const express = require('express')
const MoviesData = require('../models/moviesData')
const router = express.Router()

router.get('/movies/:movieId',async(req,res)=>{
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

module.exports = router