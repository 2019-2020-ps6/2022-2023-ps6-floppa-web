const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  name: Joi.string().required(),
  theme: Joi.string().required(),
  questions: Joi.array(),
  associations: Joi.array(),
  users: Joi.array().required(),
  coverImage: Joi.string().required(),
})
