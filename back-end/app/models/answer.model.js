const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Answer', {
  value: Joi.string().required(),
  isCorrect: Joi.boolean().required(),
  img: Joi.string(),
  questionId: Joi.number().required()
})