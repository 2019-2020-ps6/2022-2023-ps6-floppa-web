const { Quiz, Association } = require('../../../models')
const NotFoundError = require('../../../utils/errors/not-found-error.js')

/**
 * Questions Manager.
 * This file contains all the logic needed to by the question routes.
 */

/**
 * filterQuestionsFromQuizz.
 * This function filters among the questions to return only the question linked with the given quizId.
 * @param quizId
 */
const filterAssociationsFromQuizz = (quizId) => {
  const associations = Association.get()
  const parsedId = parseInt(quizId, 10)
  return associations.filter((association) => association.quizId === parsedId)
}

/**
 * getQuestionFromQuiz.
 * This function retrieves a question from a quiz. It will throw a not found exception if the quizId in the question is different from the one provided in parameter.
 * @param quizId
 * @param questionId
 */
const getAssociationFromQuiz = (quizId, associationId) => {
  // Check if quizId exists, if not it will throw a NotFoundError
  const quiz = Quiz.getById(quizId)
  const quizIdInt = parseInt(quizId, 10)
  const association = Association.getById(associationId)
  if (association.quizId !== quizIdInt) throw new NotFoundError(`${association.name} id=${associationId} was not found for ${quiz.name} id=${quiz.id} : not found`)
  return association
}

module.exports = {
  filterAssociationsFromQuizz,
  getAssociationFromQuiz,
}
