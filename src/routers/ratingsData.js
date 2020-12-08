const express = require('express')
const RatingsData = require('../models/ratingsData')
const MoviesData = require('../models/moviesData')
const UserIdCount = require('../models/userIdCount')
const RecommendationList = require('../models/recommendationList')

const router = express.Router()

router.post('/ratings/:userId',async (req,res)=>{
    const userId = req.params.userId

    const ratingsData = new RatingsData({...req.body,userId})

    try{
        await ratingsData.save()
        res.status(201).send(ratingsData)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/ratings/:userId',async(req,res)=>{
    const userId = req.params.userId

    try {
        const ratings = await RatingsData.find({userId})

        const someFunction = (ratings) => {
            const promises = ratings.map(async (rating) => {

                await rating.populate('movie').execPopulate()
                return {
                    _id:rating._id,
                    userId:rating.userId,
                    movie: rating.movie[0].title,
                    rating:rating.rating
                }
            });
            return Promise.all(promises);
        }

        const ratings_new = await someFunction(ratings)

        if(!ratings_new){
            return res.status(404).send()
        }
        res.send({ratings_new})
    } catch (e) {
        res.status(500).send()
    }
})

// To fetch an ID for new user , which will be passed on in every other get/post request made by the user

router.get('/user/count',async(req,res)=>{
    try {
        const userIdCount = await UserIdCount.findOne({})

        let count = userIdCount.userIdCount
        //Update userIdCount

        await UserIdCount.findOneAndUpdate({},{userIdCount:++count})

        res.send({count: userIdCount.userIdCount})
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/recommendations/:userId',async(req,res)=>{
    const userId = req.params.userId

    try {
        const recommendation = await RecommendationList.findOne({userId})

        if(!recommendation){
            return res.status(404).send()
        }

        const {moviesReco} = recommendation

        const getMovies = ()=>{
            const promises = moviesReco.map(async(movieId)=>{
                const movie = await MoviesData.findOne({movieId})
                return movie
            })

            return Promise.all(promises)
        }

        const movies = await getMovies()

        res.send({movies})
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

