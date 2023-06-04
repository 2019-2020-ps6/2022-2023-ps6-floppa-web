const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Association', {
    label: Joi.string().required(),
    connections: Joi.array().required(),
    isCorrect: Joi.boolean(),
})

module.exports = new BaseModel('Connection', {
    valueToConnect: Joi.string(),
    imageCoverToConnect: Joi.string(),
    valueToBeConnected: Joi.string(),
    imageCoverToBeConnected: Joi.string(),
    associationId: Joi.number().required()
})