const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

class ConnectionModel {
  constructor() {
    this.baseModel = new BaseModel('Connection', {
      valueToConnect: Joi.string(),
      coverImageToConnect: Joi.string().allow(''),
      valueToBeConnected: Joi.string(),
      coverImageToBeConnected: Joi.string().allow(''),
      associationId: Joi.number().required()
    });
  }

  create(obj) {
    return this.baseModel.create(obj);
  }

  get() {
    return this.baseModel.get();
  }
}

module.exports = new ConnectionModel();
