const { Router } = require('express')

const { User, QuizSession } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(User.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId', (req, res) => {
  try {
    res.status(200).json(User.getById(req.params.userId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const user = User.create({ ...req.body })
    res.status(201).json(user)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:userId', (req, res) => {
  try {
    res.status(200).json(User.update(req.params.userId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:userId', (req, res) => {
  try {
    User.delete(req.params.userId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:userId/quizSession', (req, res) => {
  try {
    const user = User.getById(req.params.userId)
    const quizSessions = user.quizSessions
    res.status(200).json(quizSessions)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/:userId/quizSession', (req, res) => {
  try {
    const quizSession = QuizSession.create({ ...req.body })
    res.status(201).json(quizSession)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
