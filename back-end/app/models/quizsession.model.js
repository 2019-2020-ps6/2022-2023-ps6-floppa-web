const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizSession', {
  id: Joi.number().required(),
  date: Joi.number().required(),
  answers: Joi.array(),
  quizId: Joi.number().required(),
  timePerQuestion: Joi.array().required(),
  userId: Joi.number.required()
})