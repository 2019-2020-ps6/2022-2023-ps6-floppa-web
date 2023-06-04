const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Association', {
    label: Joi.string().required(),
    connections: Joi.array().required(),
    isCorrect: Joi.boolean(),
})