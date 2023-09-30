const Joi = require("joi")
const CommentValidation = Joi.object({
    comment:Joi.string().required(),
    name:Joi.string().required(),
    email:Joi.string().required()
})
module.exports = CommentValidation