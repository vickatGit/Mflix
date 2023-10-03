const Movie = require("../ model/Movie");
const Comment = require("../ model/Comment");


const GetBanner = async(lang) => {
  return await Movie.aggregate([
    {$match:{'imdb.rating':{$ne:''}}},
    {$match:{
      poster:{$exists:true}
    }},
    {$sort:{'imdb.rating':-1}},
    {$match:{languages:lang}},
    {$limit:10},
    {$project:{
      title:1,
      poster:1,
      name:1,
      plot:1,
      runtime:1,
      rated:1,
      imdb:1,
    }}
  ])
}

const PostComment = async(email,name,movieId,comment) => {
  return await Comment.create({
    name:name,
    email:email,
    movieId:movieId,
    text:comment,
    date:new Date()
  })
}

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

const MoviesPageByLanguage = async(lang) => {
  const homePage = [
    { type:'Header' , text:'Top Rated Movies'},
    { type : 'movies' , movies : await GetTopRatedMovies(0,20,lang) },
    { type:'Header' , text:'New Releases' },
    { type : 'movies' , movies : await GetNewReleases(0,20,lang) },
    { type:'Header' , text:`${lang} Action Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Action") },
    { type:'Header' , text:`${lang} Adventure Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Adventure") },
    { type:'Header' , text:`${lang} Thriller Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Thriller") },
    { type:'Header' , text:`${lang} Romantic Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Romantic") },
    { type:'Header' , text:`${lang} Comedy Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Comedy") },
    { type:'Header' , text:`${lang} Horror Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Horror") },
    { type:'Header' , text:`${lang} Crime Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,lang,"Crime") },
    
  ]
  return homePage
}

const MoviesPageByGenre = async (genre) => {
  const homePage = [
    { type:'Header' , text:'Top Rated Movies'},
    { type : 'movies' , movies : await GetTopRatedMovies(0,20,null,genre) },
    { type:'Header' , text:'New Releases' },
    { type : 'movies' , movies : await GetNewReleases(0,20,null,genre) },
    { type:'Header' , text:`English ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"English",genre) },
    { type:'Header' , text:`Hindi ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"Hindi",genre) },
    { type:'Header' , text:`Telugu ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"Telugu",genre) },
    { type:'Header' , text:`Tamil ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"Tamil",genre) },
    { type:'Header' , text:`Marathi ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"Marathi",genre) },
    { type:'Header' , text:`German ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"German",genre) },
    { type:'Header' , text:`Spanish ${genre} Movies`},
    { type : 'movies' , movies : await GetMovies(0,15,"Spanish",genre) },
    
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
  GetHomePageData,
  MoviesPageByGenre,
  MoviesPageByLanguage,
  PostComment,
  GetBanner
};
