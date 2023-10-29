const Joi = require("joi")
const MovieValidation = Joi.object({
    plot: Joi.string().required(),
    title: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    runtime: Joi.number().required(),
    cast: Joi.array().items(Joi.string()).required(),
    poster: Joi.string().required(),
    fullplot: Joi.string().required(),
    languages: Joi.array().items(Joi.string()).required(),
    writers: Joi.array().items(Joi.string()).required(),
    released: Joi.date().required(),
    directors: Joi.array().items(Joi.string()).required(),
    rated: Joi.string(),
    awards: Joi.object({
      wins: Joi.number(),
      nominations: Joi.number(),
      text: Joi.string(),
      _id: Joi.string(),

    }),
    year: Joi.number().required(),
    imdb: Joi.object({
      rating: Joi.number(),
      votes: Joi.number(),
      id: Joi.number(),
    }),
    countries: Joi.array().items(Joi.string()).required(),
    type: Joi.object()
  });

  module.exports = MovieValidation