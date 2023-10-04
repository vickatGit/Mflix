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
    try {
        const lang = req.query.lang 
        const data = await GetBanner(lang)
        res.status(200).send({
            movies:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
   
}

const PostCommentController = async(req,res,next) => {
    const {error,value} = await CommentValidation.validate(req.body,{
        abortEarly:false
    })
    if(error){
        res.status(422)
        next(error)
    }


    try {
        const data = await PostComment(req.body.email,req.body.name, req.params.movieId,req.body.comment)
        console.log("post comment data",data)
        res.status(200).send({
            msg:"Comment Posted"
        }) 
    } catch (error) {
        res.status(500)
        next(error)
    }
    
}

const GetTopRatedMoviesController = async(req,res,next) => {
    try {
        const pageNo = req.params.page_no || 0
        const limit = req.params.limit || 10
        const lang = req.query.lang 
        const genre = req.query.genre
        const data = await GetTopRatedMovies(pageNo,limit,lang,genre)
        res.status(200).send({
            movies:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
    
}
const GetNewReleasesController = async(req,res,next) => {
    try {
        const pageNo = req.params.page_no || 0
        const limit = req.params.limit || 10
        const lang = req.query.lang 
        const genre = req.query.genre
        const data = await GetNewReleases(pageNo,limit,lang,genre)
        res.status(200).send({
            movies:data
        })
    } catch (error) {
        res.status(500)
        next(error) 
    }
    
}
const GetMoviesController = async(req,res,next) => {
    try {
        const pageNo = req.params.page_no || 0
        const limit = req.params.limit || 10
        const lang = req.query.lang 
        const genre = req.query.genre
        const data = await GetMovies(pageNo,limit,lang,genre)
        res.status(200).send({
            movies:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
    
}
const SearchMovieController = async(req,res,next) => {
    try {
        const query = req.query.query
        const data = await SearchMovie(query)
        res.status(200).send({
            movies:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
    
}
const GetMovieController = async(req,res,next) => {
    try {
        const movieId = req.params.movieId
        const data = await GetMovie(movieId)
        res.status(200).send({
            movie:data
        })
    } catch (error) {
        res.status(500)
        next(error) 
    }
    
}
const GetMovieCommentsController = async(req,res,next) => {
    try {
        const movieId = req.params.movieId
        const pageNo = req.params.page_no || 0
        const limit = req.params.limit || 10
        const data = await GetMovieComments(pageNo,limit,movieId)
        res.status(200).send({
            comments:data
        }) 
    } catch (error) {
        res.status(500)
        next(error)
    }

}
const GetHomePageDataController = async(req,res,next) => {
    try {
        const lang = req.query.lang 
        const genre = req.query.genre
        const data = await GetHomePageData(lang,genre)
        res.status(200).send({
            data:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }
   

}

const GetMoviesPageByLanguageController = async(req,res,next) => {
    try {
        const lang = req.params.lang 
        const data = await MoviesPageByLanguage(lang)
        res.status(200).send({
            data:data
        }) 
    } catch (error) {
        res.status(500)
        next(error) 
    }

}

const GetMoviesPageByGenreController = async(req,res,next) => {
    try {
        const genre = req.params.genre
        const data = await MoviesPageByGenre(genre)
        res.status(200).send({
            data:data
        })
    } catch (error) {
        res.status(500)
        next(error)
    }


}
const GetGenresController = async(req,res,next) => {
    try {
        const data = await GetGenres()
        res.status(200).send({
            genres:data
        }) 
    } catch (error) {
        res.status(500)
        next(error)
    }

}
const GetLanguagesController = async(req,res,next) => {
    try {
        const data = await GetLanguages()
        res.status(200).send({
            languages:data
        }) 
    } catch (error) {
        res.status(500)
        next(error)
    }

}

const AddMovieController = async(req,res,next) => {
    const {error,value} = await MovieValidation.validate(req.body,{
        abortEarly:false
    })
    if(error){
        res.status(422)
        next(error)
    }
    try {
        const data = await AddMovie(req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500)
        next(error)
    }
}
const DeleteMovieController = async(req,res,next) => {
    try {
        const data = await DeleteMovie(req.params.movieId)
        res.status(200).send(data)
    } catch (error) {
        res.status(500)
        next(error)
    }
}
const UpdateMovieController = async(req,res,next) => {
    try {
        const data = await UpdateMovie(req.params.movieId,req.body)
        res.status(200).send(data)
    } catch (error) {
        res.status(500)
        next(error)
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