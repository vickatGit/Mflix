const router = require('express').Router()
const {
    GetTopRatedMoviesController,
    GetNewReleasesController,
    GetGenresController,
    GetLanguagesController,
    GetMoviesController,
    SearchMovieController,
    GetMovieController,
    GetMovieCommentsController
} = require('../controller/MovieController')

router.route("/banners")
router.route("/top_rated_movies/:page_no/:limit").get(GetTopRatedMoviesController)
router.route("/new_releases/:page_no/:limit").get(GetNewReleasesController)
router.route("/get_movies/:page_no/:limit").get(GetMoviesController)
router.route("/genres").get(GetGenresController)
router.route("/languages").get(GetLanguagesController)
router.route("/search/:page_no/:limit").get(SearchMovieController)
router.route("/get_movie/:movieId").get(GetMovieController)
router.route("/comments/:page_no/:limit/:movieId").get(GetMovieCommentsController)
router.route("/by_genre/:genre/:page_no/:limit")
router.route("/by_language/:language/:page_no/:limit")
router.route("/by_languages_genre/:language/:genre/:page_no/:limit")
module.exports = router