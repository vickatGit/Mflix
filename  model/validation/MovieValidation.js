const Joi = require("joi")
const MovieValidation = Joi.object({
    plot: Joi.string().required(),
    genres: Joi.array().items(Joi.string()).required(),
    runtime: Joi.number().required(),
    cast: Joi.array().items(Joi.string()).required(),
    poster: Joi.string().required(),
    fullPlot: Joi.string().required(),
    languages: Joi.array().items(Joi.string()).required(),
    released: Joi.date().required(),
    directors: Joi.array().items(Joi.string()).required(),
    rated: Joi.string().optional(),
    awards: Joi.object({
      wins: Joi.number().optional(),
      nominations: Joi.number().optional(),
      text: Joi.string().required()
    }).optional(),
    lastupdated: Joi.string().optional(),
    year: Joi.number().required(),
    imdb: Joi.object({
      rating: Joi.number().required(),
      votes: Joi.number().required(),
      id: Joi.number().required()
    }).required(),
    countries: Joi.array().items(Joi.string()).required(),
    type: Joi.string().optional(),
    num_mflix_comments: Joi.number().optional()
  });
module.exports = MovieValidation