const { Connection } = require('../../../../models')
const connectionModel = require('../../../../models/connection.model')
const NotFoundError = require('../../../../utils/errors/not-found-error.js')
const { getAssociationFromQuiz } = require('../manager')

/**
 * filterConnectionFromAssociation.
 * This function filters among the associations to return only the association linked with the given quizId.
 * @param associationId
 */
const filterConnectionFromAssociation = (associationId) => connectionModel.get().filter((connection) => (connection.associationId === associationId))

/**
 * getConnectionFromAssociation.
 * This function retrieves an connection from a association. It will throw a not found exception if the associationId in the connection is different from the one provided in parameter.
 * @param quizId
 * @param associationId
 * @param connectionId
 */
const getConnectionFromAssociation = (quizId, associationId, connectionId) => {
  const association = getAssociationFromQuiz(quizId, associationId)
  const connection = connectionModel.getById(connectionId)
  if (connection.associationId !== association.id) throw new NotFoundError(`${connection.name} id=${connectionId} was not found for ${association.label} id=${association.id} : not found`)
  return connection
}

module.exports = {
  getConnectionFromAssociation,
  filterConnectionFromAssociation,
}
