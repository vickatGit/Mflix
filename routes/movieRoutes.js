/**
 * @swagger
 * components:
 *  schemas :
 *    MovieThumb:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        plot:
 *          type: string
 *        runtime:
 *          type: integer
 *        rated:
 *           type: string
 *        poster:
 *          type: string
 *        title:
 *          type: string
 *        imdb:
 *          $ref : '#/components/schemas/Imdb'
 * 
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
 * 
 *    PostComment:
 *      type: object
 *      properties: 
 *        email:
 *          type: string
 *        name:
 *          type: string
 *        comment:
 *          type: string   
 * 
 *    Header:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *        text:
 *          type: string
 * 
 *    Movies:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *        movies:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Movie'
 *    Languages:
 *      type: array
 *      items:
 *        type: string  
 * 
 *    Genres:
 *      type: array
 *      items:
 *        type: string  
 *        
 */

/**
 * @swagger
 * tags:
 *   - name: Movie
 *   - name: Comment
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
    PostCommentController,
    GetBannersController
} = require('../controller/MovieController')


/**
* @swagger
*   /mflix/banners:
*     get:
*       summary: Returns the Banners
*       tags: [Movie]
*       parameters:
*         - in: query
*           name: lang
*           schema: 
*             type: string
*           required: false
*           description: Movie Language
*       responses:
*        200:
*          description: Banners
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/MovieThumb'
* 
*/
router.route("/banners").get(GetBannersController)

/**
 * @swagger
 *   /mflix/home_page:
 *     get:
 *       summary: Returns the list of component data to show on page
 *       tags: [Movie]
 *       parameters:
 *         - in: query
 *           name: lang
 *           schema:
 *             type: string
 *           required: true
 *           description: Movies Language
 *         - in: query
 *           name: genre
 *           schema:
 *             type: string
 *           required: true
 *           description: Movies Genre
 *       responses:
 *         200:
 *           description: Movies page on the Basis of specified langauage
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   anyOf:
 *                     - $ref: '#/components/schemas/Header'
 *                     - $ref: '#/components/schemas/Movies'
 *                     - $ref: '#/components/schemas/Languages'
 *                     - $ref: '#/components/schemas/Genres'
 */
router.route("/home_page").get(GetHomePageDataController)

/**
 * @swagger
 *   /mflix/movies_page_lang/{lang}:
 *     get:
 *       summary: Returns the list of component data to show on page
 *       tags: [Movie]
 *       parameters:
 *         - in: path
 *           name: lang
 *           schema:
 *             type: string
 *           required: true
 *           description: Movies Language
 *       responses:
 *         200:
 *           description: Movies page on the Basis of specified langauage
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   anyOf:
 *                     - $ref: '#/components/schemas/Header'
 *                     - $ref: '#/components/schemas/Movies'
 */
router.route("/movies_page_lang/:lang").get(GetMoviesPageByLanguageController)

/**
 * @swagger
 *   /mflix/movies_page_genre/{genre}:
 *     get:
 *       summary: Returns the list of component data to show on page
 *       tags: [Movie]
 *       parameters:
 *         - in: path
 *           name: genre
 *           schema:
 *             type: string
 *           required: true
 *           description: Movie Genre
 *       responses:
 *         200:
 *           description: Movies page on the Basis of specified langauage
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   anyOf:
 *                     - $ref: '#/components/schemas/Header'
 *                     - $ref: '#/components/schemas/Movies'
 */
router.route("/movies_page_genre/:genre").get(GetMoviesPageByGenreController)

/**
* @swagger
*   /mflix/top_rated_movies/{pageNo}/{limit}:
*     get:
*       summary: Returns the Top Rated Movies According to Imdb
*       tags: [Movie]
*       parameters:
*         - in: path
*           name: pageNo
*           schema:
*             type: string
*           required: true
*           description: Data Page No (For Pagination)
*         - in: path
*           name: limit
*           schema:
*             type: string
*           required: true
*           description: Movie Limit per page
*         - in: query
*           name: lang
*           schema: 
*             type: string
*           required: false
*           description: Movie Language
*         - in: query
*           name: genre
*           schema: 
*             type: string
*           required: false
*           description: Movie Genre
*       responses:
*        200:
*          description: Top Rated Movies According to Imdb
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Movie'
* 
*/
router.route("/top_rated_movies/:page_no/:limit").get(GetTopRatedMoviesController)

/**
* @swagger
*   /mflix/new_releases/{pageNo}/{limit}:
*     get:
*       summary: Returns the New Releases
*       tags: [Movie]
*       parameters:
*         - in: path
*           name: pageNo
*           schema:
*             type: string
*           required: true
*           description: Data Page No (For Pagination)
*         - in: path
*           name: limit
*           schema:
*             type: string
*           required: true
*           description: Movie Limit per page
*         - in: query
*           name: lang
*           schema: 
*             type: string
*           required: false
*           description: Movie Language
*         - in: query
*           name: genre
*           schema: 
*             type: string
*           required: false
*           description: Movie Genre
*       responses:
*        200:
*          description: New Released Movies
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Movie'
* 
*/
router.route("/new_releases/:page_no/:limit").get(GetNewReleasesController)

/**
* @swagger
*   /mflix/get_movies/{pageNo}/{limit}:
*     get:
*       summary: Returns the Movies According specified Language and Genre
*       tags: [Movie]
*       parameters:
*         - in: path
*           name: pageNo
*           schema:
*             type: string
*           required: true
*           description: Data Page No (For Pagination)
*         - in: path
*           name: limit
*           schema:
*             type: string
*           required: true
*           description: Movie Limit per page
*         - in: query
*           name: lang
*           schema: 
*             type: string
*           required: false
*           description: Movie Language
*         - in: query
*           name: genre
*           schema: 
*             type: string
*           required: false
*           description: Movie Genre
*       responses:
*        200:
*          description: New Released Movies
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Movie'
* 
*/
router.route("/get_movies/:page_no/:limit").get(GetMoviesController)

/**
* @swagger
*   /mflix/genres:
*     get:
*       summary: Returns the Available Genres
*       tags: [Movie]
*       responses:
*        200:
*          description: Available Genres
*          content:
*            application/json:
*              schema:
*                type: object
*                $ref: '#/components/schemas/Genres'
* 
*/
router.route("/genres").get(GetGenresController)

/**
* @swagger
*   /mflix/languages:
*     get:
*       summary: Returns the Available Languages
*       tags: [Movie]
*       responses:
*        200:
*          description: Available Languages
*          content:
*            application/json:
*              schema:
*                type: object
*                $ref: '#/components/schemas/Languages' 
* 
*/
router.route("/languages").get(GetLanguagesController)

/**
* @swagger
*   /mflix/search/{pageNo}/{limit}:
*     get:
*       summary: Returns the Movies According specified Query
*       tags: [Movie]
*       parameters:
*         - in: path
*           name: pageNo
*           schema:
*             type: string
*           required: true
*           description: Data Page No (For Pagination)
*         - in: path
*           name: limit
*           schema:
*             type: string
*           required: true
*           description: Movie Limit per page
*         - in: query
*           name: query
*           schema: 
*             type: string
*           required: true
*           description: Movie Name
*       responses:
*        200:
*          description: Movies According to Specified Query
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Movie'
* 
*/
router.route("/search/:page_no/:limit").get(SearchMovieController)

/**
 * @swagger
 * /mflix/get_movie/{movieId}:
 *   get:
 *     summary: Returns the Movie
 *     tags: [Movie]
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
router.route("/get_movie/:movieId").get(GetMovieController)

/**
* @swagger
*   /mflix/comments/{pageNo}/{limit}/{movieId}:
*     get:
*       summary: Returns the Movies According specified Query
*       tags: [Comment]
*       parameters:
*         - in: path
*           name: pageNo
*           schema:
*             type: string
*           required: true
*           description: Data Page No (For Pagination)
*         - in: path
*           name: limit
*           schema:
*             type: string
*           required: true
*           description: Movie Limit per page
*         - in: path
*           name: movieId
*           schema: 
*             type: string
*           required: true
*           description: Movie Id
*       responses:
*        200:
*          description: Comments According to Specified Movie Id
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Comment'
* 
*/
router.route("/comments/:page_no/:limit/:movieId").get(GetMovieCommentsController)

/**
 * @swagger
 * /mflix/post_comment/{movieId}:
 *   post:
 *     summary: Post Comment to a Movie
 *     tags: [Comment]
 *     requestBody:
 *       description: Post Comment
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostComment'
 *       required: true
 *     parameters:
 *        - in: path
 *          name: movieId
 *          schema:
 *            type: string
 *          required: string 
 *     responses:
 *       200:
 *         description: Comment Posted
 *         
 *       
 */
router.route("/post_comment/:movieId").post(PostCommentController)
module.exports = router



