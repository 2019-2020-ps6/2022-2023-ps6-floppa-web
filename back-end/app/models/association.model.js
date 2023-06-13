const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Association', {
    label: Joi.string().required(),
    connections: Joi.array(),
    isCorrect: Joi.boolean(),
    quizId: Joi.number().required()
})