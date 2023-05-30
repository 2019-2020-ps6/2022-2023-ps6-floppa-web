const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  questions: Joi.array().items(Joi.Question()),
  users: Joi.array().items(Joi.User()),
  coverImage: Joi.string(),
})
