const {
    GetTopRatedMovies,
    GetNewReleases,
    GetGenres
} = require('../services/MovieService')

const GetTopRatedMoviesController = async(req,res,next) => {
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const lang = req.params.lang || "English"
    const data = await GetTopRatedMovies(pageNo,limit,lang)
    res.status(200).send({
        movies:data
    })
}
const GetNewReleasesController = async(req,res,next) => {
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const lang = req.params.lang || "English"
    const data = await GetNewReleases(pageNo,limit,lang)
    res.status(200).send({
        movies:data
    })
}
const GetGenresController = async(req,res,next) => {
    const data = await GetGenres()
    res.status(200).send({
        genres:data
    })
}

module.exports = {
    GetTopRatedMoviesController,
    GetNewReleasesController,
    GetGenresController
    
}