const { Router } = require('express')
const QuizzesRouter = require('./quizzes')
const UserRouter = require('./users')
const QuestionRouter = require('./quizzes/questions')
const AnswerRouter = require('./quizzes/questions/answers')
const AssociationRouter = require('./quizzes/associations')
const ConnectionRouter = require('./quizzes/associations/connections')

const router = new Router()
router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/quizzes', QuizzesRouter)
router.use('/users', UserRouter)
router.use('/questions', QuestionRouter)
router.use('/answers', AnswerRouter)
router.use('/associations', AssociationRouter)
router.use('/connections', ConnectionRouter)

module.exports = router
