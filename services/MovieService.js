const Movie = require("../ model/Movie");

const GetTopRatedMovies = async (pageNo, limit,lang) => {
  return await Movie.aggregate([
    {$match:{'imdb.rating':{$ne:''}}},
    {$match  : {languages:lang}},
    {$sort:{'imdb.rating':-1}},
    {$skip:pageNo*limit},
    {$limit:Number(limit)},
    {$sort : { released : -1}}
  ])
};

const GetNewReleases = async (pageNo, limit,lang) => {
  return await Movie.aggregate([
    {$match  : {languages:lang}},
    {$sort : {released : -1}},
    {$skip:pageNo*limit},
    {$limit:Number(limit)},
  ])
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


module.exports = {
  GetTopRatedMovies,
  GetNewReleases,
  GetGenres,
  GetLanguages
};
