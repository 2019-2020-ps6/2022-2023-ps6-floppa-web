const { Router } = require('express')

const { Answer, Quiz, Question } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')
const QuestionsRouter = require('./questions')
const AssociationRouter = require('./associations')
const { buildQuizz, buildQuizzes } = require('./manager')

const router = new Router()

router.use('/:quizId/questions', QuestionsRouter)
router.use('/:quizId/associations', AssociationRouter)

router.get('/', (req, res) => {
  try {
    const quizzes = buildQuizzes()
    res.status(200).json(quizzes)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:quizId', (req, res) => {
  try {
    const quizz = buildQuizz(req.params.quizId)
    res.status(200).json(quizz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const quiz = Quiz.create({name: req.body.name, theme: req.body.theme, coverImage: req.body.coverImage, users: req.body.users})
    
    if (req.body.questions && req.body.questions.length > 0) {
      const questions = req.body.questions.map((question) => Question.create({ ...question, quizId: quiz.id }))
      quiz = { ...quiz, questions }
    }
    res.status(201).json(quiz)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:quizId', (req, res) => {
  try {
    res.status(200).json(Quiz.update(req.params.quizId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:quizId', (req, res) => {
  try {
    Quiz.delete(req.params.quizId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
