const router = require('express').Router()
const {
    GetMoviesController
} = require('../controller/MovieController')

router.route("/banners")
router.route("/top_rated_movies/:page_no/:limit")
router.route("/new_releases/:page_no/:limit").get(GetMoviesController)
router.route("/genres")
router.route("/languages")
router.route("/by_genre/:genre/:page_no/:limit")
router.route("/by_language/:language/:page_no/:limit")
router.route("/search/:query/:page_no/:limit")
router.route("/get_movie/:movieId")
router.route("/get_comments/:movieId/:page_no/:limit")
router.route("/by_languages_genre/:language/:genre/:page_no/:limit")
module.exports = router