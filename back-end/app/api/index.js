const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const QuestionRouter = require('./quizzes/questions')
const AnswerRouter = require('./quizzes/questions/answers')
const AssociationRouter = require('./quizzes/associations')
const ConnectionRouter = require('./quizzes/associations/connections')
const ThemeRouter = require('./themes')
const LoginRouter  = require('./login')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)
router.use('/associations', AssociationRouter)
router.use('/connections', ConnectionRouter)
router.use('/themes', ThemeRouter)
router.use('/login', LoginRouter)

module.exports = router
