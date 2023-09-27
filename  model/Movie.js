const mongoose = require("mongoose");

const Movie = mongoose.Schema({
  plot: { type: String },
  genres: { type: [String] },
  runtime: { type: Number },
  cast: { type: [String] },
  poster: { type: String },
  fullPlot: { type: String },
  languages: { type: [String] },
  released: { type: Date },
  directors: { type: [String] },
  rated: { type: String },
  awards : { type : {
    wins : Number,
    nominations : Number,
    text : String
  }},
  lastupdated : String,
  year : Number,
  imdb : { type : {
    rating : Number,
    votes : Number,
    id : Number
  }},
  countries: { type: [String] },
  type : { type : String },
  num_mflix_comments : { type : Number }

});
module.exports = mongoose.model("Movie",Movie)
