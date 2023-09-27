const {
    GetTopRatedMovies,
    GetNewReleases,
    GetGenres,
    GetLanguages,
    GetMovies,
    SearchMovie
} = require('../services/MovieService')

const GetTopRatedMoviesController = async(req,res,next) => {
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const lang = req.query.lang 
    const genre = req.query.genre
    const data = await GetTopRatedMovies(pageNo,limit,lang,genre)
    res.status(200).send({
        movies:data
    })
}
const GetNewReleasesController = async(req,res,next) => {
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const lang = req.query.lang 
    const genre = req.query.genre
    const data = await GetNewReleases(pageNo,limit,lang,genre)
    res.status(200).send({
        movies:data
    })
}
const GetMoviesController = async(req,res,next) => {
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const lang = req.query.lang 
    const genre = req.query.genre
    const data = await GetMovies(pageNo,limit,lang,genre)
    res.status(200).send({
        movies:data
    })
}
const SearchMovieController = async(req,res,next) => {
    const query = req.query.query
    const data = await SearchMovie(query)
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
const GetLanguagesController = async(req,res,next) => {
    const data = await GetLanguages()
    res.status(200).send({
        languages:data
    })
}

module.exports = {
    GetTopRatedMoviesController,
    GetNewReleasesController,
    GetGenresController,
    GetLanguagesController ,
    GetMoviesController,
    SearchMovieController   
}