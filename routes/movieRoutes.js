const router = require('express').Router()
const {
    GetTopRatedMoviesController,
    GetNewReleasesController,
    GetGenresController,
    GetLanguagesController,
    GetMoviesController,
    SearchMovieController,
    GetMovieController,
    GetMovieCommentsController,
    GetHomePageDataController
} = require('../controller/MovieController')

router.route("/banners")
router.route("/home_page").get(GetHomePageDataController)
router.route("/movies_page")
router.route("/top_rated_movies/:page_no/:limit").get(GetTopRatedMoviesController)
router.route("/new_releases/:page_no/:limit").get(GetNewReleasesController)
router.route("/get_movies/:page_no/:limit").get(GetMoviesController)
router.route("/genres").get(GetGenresController)
router.route("/languages").get(GetLanguagesController)
router.route("/search/:page_no/:limit").get(SearchMovieController)
router.route("/get_movie/:movieId").get(GetMovieController)
router.route("/comments/:page_no/:limit/:movieId").get(GetMovieCommentsController)
module.exports = router