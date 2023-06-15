const { Router } = require('express')

const { Login } = require('../../models')
const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.get('/', (req, res) => {
  try {
    res.status(200).json(Login.get())
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.post('/', (req, res) => {
  try {
    const login = Login.create({ ...req.body })
    res.status(201).json(login)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.put('/:loginId', (req, res) => {
  try {
    res.status(200).json(Login.update(req.params.loginId, req.body))
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.delete('/:loginId', (req, res) => {
  try {
    Login.delete(req.params.loginId)
    res.status(204).end()
  } catch (err) {
    manageAllErrors(res, err)
  }
})

router.get('/:loginId', (req, res) => {
  try {
    const login = Login.getById(req.params.loginId)
    res.status(200).json(login)
  } catch (err) {
    manageAllErrors(res, err)
  }
})

module.exports = router
