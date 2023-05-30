const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  theme: Joi.string().required(),
  questions: Joi.array().items(Joi.Question()),
  associations: Joi.array().items(Joi.Association()),
  users: Joi.array().items(Joi.User()),
  coverImage: Joi.string(),
})
