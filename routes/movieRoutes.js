
/**
 * @swagger
 * components:
 *  schemas :
 *    Movie:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        plot:
 *          type: string
 *        genres:
 *          type: array
 *          items:
 *            type: string
 *        runtime:
 *          type: integer
 *        rated:
 *           type: string
 *        cast:
 *           type: array
 *           items:
 *             type: string
 *        num_mflix_comments:
 *           type: integer
 *        poster:
 *          type: string
 *        title:
 *          type: string
 *        fullplot:
 *          type: string
 *        languages:
 *           type: array
 *           items:
 *             type: string
 *        released:
 *          type: string
 *        directors:
 *          type: array
 *          items:
 *            type: string
 *        writers:
 *          type: array
 *          items:
 *            type: string
 *        awards:
 *          $ref : '#/components/schemas/Award'
 *          
 *        lastupdated:
 *           type: string
 *        year:
 *          type: integer
 *        imdb:
 *          $ref : '#/components/schemas/Imdb'
 *        countries:
 *          type: array
 *          items:
 *            type: string
 *        type:
 *            $ref : '#/components/schemas/Tomatoes'
 *        comments : 
 *          type : object
 *          items : 
 *            $ref : '#/components/schemas/Comment'
 *    Comment:
 *      type: object
 *      properties : 
 *        rating:
 *          type: number
 *        votes:
 *          type: integer
 *        id:
 *          type: integer
 *    Imdb : 
 *      type: object
 *      properties:
 *        rating:
 *          type: number
 *        votes:
 *          type: integer
 *        id:
 *          type: integer
 *    Award:
 *      type: object
 *      properties:
 *        wins:
 *          type: integer
 *        nominations:
 *          type: integer
 *        text:
 *          type: string
 *        _id:
 *          type: string
 *    TomatoesViewer:
 *      type: object
 *      properties:
 *        rating:
 *          type: number
 *        numReviews:
 *          type: integer
 *        meter:
 *          type: integer
 *    TomatoesCritic:
 *      type: object
 *      properties:
 *        rating:
 *          type: number
 *        numReviews:
 *          type: integer
 *        meter:
 *          type: integer
 *    Tomatoes:
 *      type: object
 *      properties:
 *        viewer:
 *          $ref: '#/components/schemas/TomatoesViewer'
 *        dvd:
 *          type: string
 *        critic:
 *          $ref: '#/components/schemas/TomatoesCritic'
 *        lastUpdated:
 *          type: string
 *        consensus:
 *          type: string
 *        rotten:
 *          type: integer
 *        production:
 *          type: string
 *        fresh:
 *          type: integer
 */


/**
 * @swagger
 * tags:
 *   name: Movies
 */

/**
 * @swagger
 * /mflix/get_movie/{movieId}:
 *   get:
 *     summary: Returns the Movie
 *     tags: [Movies]
 *     parameters: 
 *       - in: path
 *         name: movieId
 *         schema: 
 *           type: string
 *         required: true
 *         description: The Movie Id
 *     responses:
 *       200:
 *         description: Movie with specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie Not Found
 */

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



