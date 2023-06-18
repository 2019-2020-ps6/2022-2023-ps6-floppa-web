const { Quiz } = require('../../models')
const { filterQuestionsFromQuizz } = require('./questions/manager')
const { filterAnswersFromQuestion } = require('./questions/answers/manager')

/**
 * Function buildQuizz.
 * This function aggregates the questions and answers from the database to build a quizz with all the data needed by the clients.
 * @param quizId
 */
const buildQuizz = (quizId) => {
  const quiz = Quiz.getById(quizId)
  const questions = filterQuestionsFromQuizz(quiz.id)
  const questionWithAnswers = questions.map((question) => {
    const answers = filterAnswersFromQuestion(question.id)
    return { ...question, answers }
  })
  return { ...quiz, questions: questionWithAnswers }
}

/**
 * Function buildQuizzes.
 * This function aggregates the questions and answers from the database to build entire quizzes.
 */
const buildQuizzes = () => {
  const quizzes = Quiz.get()
  return quizzes.map((quiz) => buildQuizz(quiz.id))
}

/**
 * filterQuizzesFromTheme.
 * This function filters among the quizzes to return only the quiz linked with the given themeId.
 * @param themeId
 */
const filterQuizzesFromTheme = (themeId) => {
  const quizzes = Quiz.get()
  const parsedId = parseInt(themeId, 10)
  return quizzes.filter((quiz) => quiz.themeId === parsedId)
}

module.exports = {
  buildQuizz,
  buildQuizzes,
  filterQuizzesFromTheme,
}
