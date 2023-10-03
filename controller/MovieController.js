const {
    GetTopRatedMovies,
    GetNewReleases,
    GetGenres,
    GetLanguages,
    GetMovies,
    SearchMovie,
    GetMovie,
    GetMovieComments,
    GetHomePageData,
    MoviesPageByGenre,
    MoviesPageByLanguage,
    PostComment,
    GetBanner,
    AddMovie,
    UpdateMovie,
    DeleteMovie
} = require('../services/MovieService')

const CommentValidation = require('../ model/validation/CommentValidation')
const MovieValidation = require('../ model/validation/MovieValidation')
const GetBannersController = async(req,res,next) => {
    const lang = req.query.lang 
    const data = await GetBanner(lang)
    res.status(200).send({
        movies:data
    })
}

const PostCommentController = async(req,res,next) => {
    const {error,value} = await CommentValidation.validate(req.body,{
        abortEarly:false
    })
    if(error){
        res.status(422).send({
            errors:error
        })
    }


    try {
        const data = await PostComment(req.body.email,req.body.name, req.params.movieId,req.body.comment)
        console.log("post comment data",data)
        res.status(200).send({
            msg:"Comment Posted"
        }) 
    } catch (error) {
        
    }
    
}

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
const GetHomePageDataController = async(req,res,next) => {
    const lang = req.query.lang 
    const genre = req.query.genre
    const data = await GetHomePageData(lang,genre)
    res.status(200).send({
        data:data
    })

}

const GetMoviesPageByLanguageController = async(req,res,next) => {
    const lang = req.params.lang 
    const data = await MoviesPageByLanguage(lang)
    res.status(200).send({
        data:data
    })
}

const GetMoviesPageByGenreController = async(req,res,next) => {
    const genre = req.params.genre
    const data = await MoviesPageByGenre(genre)
    res.status(200).send({
        data:data
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

const AddMovieController = async(req,res,next) => {
    const {error,value} = await MovieValidation.validate(req.body,{
        abortEarly:false
    })
    if(error){
        res.status(422).send({
            errors:error
        })
    }
    try {
        const data = await AddMovie(req.body)
        res.status(200).send(data)
    } catch (error) {
        
    }
}
const DeleteMovieController = async(req,res,next) => {
    try {
        const data = await DeleteMovie(req.params.movieId)
        res.status(200).send(data)
    } catch (error) {
        
    }
}
const UpdateMovieController = async(req,res,next) => {
    try {
        const data = await UpdateMovie(req.params.movieId,req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({
            error:error
        })
    }
}

module.exports = {
    GetTopRatedMoviesController,
    GetNewReleasesController,
    GetGenresController,
    GetLanguagesController ,
    GetMoviesController,
    SearchMovieController,
    GetMovieController,
    GetMovieCommentsController,
    GetHomePageDataController,
    GetMoviesPageByGenreController,
    GetMoviesPageByLanguageController,
    PostCommentController,
    GetBannersController,
    AddMovieController,
    UpdateMovieController,
    DeleteMovieController
}