const Movie = require("../ model/Movie");
const Comment = require("../ model/Comment");

const GetTopRatedMovies = async (pageNo, limit,lang,genre) => {
  const pipeline = [{$match:{'imdb.rating':{$ne:''}}}]
  if(lang) pipeline.push({$match  : {languages:lang}})
  if(genre) pipeline.push({$match  : {genres:genre}})
  pipeline.push(
    {$sort:{'imdb.rating':-1}},
    {$skip:pageNo*limit},
    {$limit:Number(limit)},
    {$sort : { released : -1}}
  )
  
  return await Movie.aggregate(pipeline)
};

const GetNewReleases = async (pageNo, limit,lang,genre) => {
  const pipeline = []
  if(lang) pipeline.push({$match  : {languages:lang}})
  if(genre) pipeline.push({$match  : {genres:genre}})
  pipeline.push(
    {$sort : {released : -1}},
    {$skip:pageNo*limit},
    {$limit:Number(limit)}
  )
  return await Movie.aggregate(pipeline)
}

const GetMovies = async (pageNo, limit,lang,genre) => {
  const pipeline = []
  if(lang) pipeline.push({$match  : {languages:lang}})
  if(genre) pipeline.push({$match  : {genres:genre}})
  pipeline.push(
    {$sort : {released : -1}},
    {$skip:pageNo*limit},
    {$limit:Number(limit)}
  )
  return await Movie.aggregate(pipeline)
}

const GetGenres = async() => {
  let genres = []
  const data = await Movie.aggregate([
    {$unwind:"$genres"},
    {$group:{_id:"$genres"}}
  ])
  data.map((elem) => {
    genres.push(elem._id)
  })
  return genres
}
const GetLanguages = async() => {
  let languages = []
  const data = await Movie.aggregate([
    {$unwind:"$languages"},
    {$group:{_id:"$languages"}}
  ])
  data.map((elem) => {
    languages.push(elem._id)
  })
  return languages
}
const SearchMovie = async(query) => {
  return await Movie.find({title:{$regex:query}})
}


const GetMovie = async(movieId) => {
  let movie = await Movie.findOne({_id:movieId})
  movie=movie.toObject()
  if(movie.num_mflix_comments>0){
    const comments = await GetMovieComments(0,10,movie._id)
    movie.comments = comments
  }
  return movie

}

const GetMovieComments = async(pageNo,limit,movieId) => {
  return await Comment.find({ movie_id : movieId }).skip(pageNo*limit).limit(limit)
}

const GetHomePageData = async(lang,genre) => {
  
  const homePage = [
    { type:'Header' , text:'Top Rated Movies'},
    { type : 'movies' , movies : await GetTopRatedMovies(0,20,lang,genre) },
    { type:'Header' , text:'New Releases' },
    { type : 'movies' , movies : await GetNewReleases(0,20,lang,genre) },
    { type:'Header' , text:'Browse By Language' },
    { type : 'languages' , languages : await GetLanguages() },
    { type:'Header' , text:'Browse By Genre' },
    { type : 'genres' , genres : await GetGenres() },
    { type:'Header' , text:'Crime'},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Crime") },
    
  ]
  return homePage

}

module.exports = {
  GetTopRatedMovies,
  GetNewReleases,
  GetGenres,
  GetLanguages,
  GetMovies,
  SearchMovie,
  GetMovie,
  GetMovieComments,
  GetHomePageData
};
