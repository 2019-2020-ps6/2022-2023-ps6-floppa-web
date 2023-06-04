const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  alzheimerStade: Joi.string(),
  assistance: Joi.string().required(),
  photo: Joi.string(),
  quizSessions: Joi.array(),
  timer: Joi.number(),
})