const express = require('express')
const router = express.Router()
const validate = require('../middlewares/registration')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Expressss' })
})

router.post('/', validate(), function (req, res, next) {
  res.json({ result: true, message: 'Cliente cadastrado com sucesso' })
})

module.exports = router
