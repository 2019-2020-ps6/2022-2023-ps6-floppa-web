const { Router } = require('express')

const { Quiz, Association, Connection } = require('../../../models')
const manageAllErrors = require('../../../utils/routes/error-management')
const ConnectionsRouter = require('./connections')
const { filterAssociationsFromQuizz, getAssociationFromQuiz } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    // Check if quizId exists, if not it will throw a NotFoundError
    Quiz.getById(req.params.quizId)
    res.status(200).json(filterAssociationsFromQuizz(req.params.quizId))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:associationId', (req, res) => {
  try {
    const association = getAssociationFromQuiz(req.params.quizId)
    res.status(200).json(association)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  console.log(req);
  try {
    Quiz.getById(req.params.quizId)
    const quizId = parseInt(req.params.quizId, 10)
    
    const association = Association.create({ label: req.body.label, connections: req.body.connections})

    if (req.body.connections && req.body.connections.length > 0) {
      const connections = req.body.connections.map((connection) => Connection.create({ ...connection, associationId: association.id }))
      association = { ...association, connections }
    }
    res.status(201).json(association)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:associationId', (req, res) => {
  try {
    const association = getAssociationFromQuiz(req.params.quizId, req.params.associationId)
    const updatedAssociation = Association.update(req.params.associationId, { label: req.body.label, connections: req.body.connections})
    res.status(200).json(updatedAssociation)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:associationId', (req, res) => {
  try {
    // Check if the question id exists & if the question has the same quizId as the one provided in the url.
    getAssociationFromQuiz(req.params.quizId, req.params.associationId)
    Association.delete(req.params.associationId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.use('/:associationId/connections', ConnectionsRouter)

module.exports = router
