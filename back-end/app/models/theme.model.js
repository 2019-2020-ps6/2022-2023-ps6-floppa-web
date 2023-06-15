const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Theme', {
    title: Joi.string().required(),
    description: Joi.string(),
    coverImage: Joi.string(),
})