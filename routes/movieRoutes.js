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
    GetHomePageDataController,
    GetMoviesPageByGenreController,
    GetMoviesPageByLanguageController,
    PostCommentController
} = require('../controller/MovieController')

router.route("/banners")
router.route("/home_page").get(GetHomePageDataController)
router.route("/movies_page_lang/:lang").get(GetMoviesPageByLanguageController)
router.route("/movies_page_genre/:genre").get(GetMoviesPageByGenreController)
router.route("/top_rated_movies/:page_no/:limit").get(GetTopRatedMoviesController)
router.route("/new_releases/:page_no/:limit").get(GetNewReleasesController)
router.route("/get_movies/:page_no/:limit").get(GetMoviesController)
router.route("/genres").get(GetGenresController)
router.route("/languages").get(GetLanguagesController)
router.route("/search/:page_no/:limit").get(SearchMovieController)
router.route("/get_movie/:movieId").get(GetMovieController)
router.route("/comments/:page_no/:limit/:movieId").get(GetMovieCommentsController)

router.route("/post_comment/:movieId").post(PostCommentController)
module.exports = router