const Movie = require("../ model/Movie");

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


module.exports = {
  GetTopRatedMovies,
  GetNewReleases,
  GetGenres,
  GetLanguages,
  GetMovies,
  SearchMovie
};
