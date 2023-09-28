const {
    GetTopRatedMovies,
    GetNewReleases,
    GetGenres,
    GetLanguages,
    GetMovies,
    SearchMovie,
    GetMovie,
    GetMovieComments
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
const GetMovieController = async(req,res,next) => {
    const movieId = req.params.movieId
    const data = await GetMovie(movieId)
    res.status(200).send({
        movie:data
    })
}
const GetMovieCommentsController = async(req,res,next) => {
    const movieId = req.params.movieId
    const pageNo = req.params.page_no || 0
    const limit = req.params.limit || 10
    const data = await GetMovieComments(pageNo,limit,movieId)
    res.status(200).send({
        comments:data
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
    SearchMovieController,
    GetMovieController,
    GetMovieCommentsController
}