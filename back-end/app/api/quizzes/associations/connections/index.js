const { Router } = require('express')
const { Connection } = require('../../../../models')

const { getAssociationFromQuiz } = require('../manager')
const { filterConnectionFromAssociation, getConnectionFromAssociation } = require('./manager')

const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const association = getAssociationFromQuiz(req.params.quizId, req.params.associationId)
    const connections = filterConnectionFromAssociation(association.id)
    res.status(200).json(connections)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.get('/:connectionId', (req, res) => {
  try {
    const connection = getConnectionFromAssociation(req.params.quizId, req.params.associationId, req.params.connectionId)
    res.status(200).json(connection)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

router.post('/', (req, res) => {
  try {
    const connection = Connection.create({ ...req.body })
    res.status(201).json(connection)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).json(err)
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.put('/:connectionId', (req, res) => {
  try {
    const connection = getConnectionFromAssociation(req.params.quizId, req.params.associationId, req.params.connectionId)
    const updatedConnection = Connection.update(req.params.connectionId, { ...req.body, associationId: connection.associationId })
    res.status(200).json(updatedConnection)
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.delete('/:connectionId', (req, res) => {
  try {
    getConnectionFromAssociation(req.params.quizId, req.params.associationId, req.params.connectionId)
    Connection.delete(req.params.connectionId)
    res.status(204).end()
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end()
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
