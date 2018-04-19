var express = require('express')
var router = express.Router()
var elasticQuery = require('../models/elasticQuery')
var queries = require('../models/queries')

function onError (res, e) {
  res.status(500)
  res.json({ error: e, stack: e.stack })
}

// home pagejust some test
router.get('/legacy', function (req, res, next) {
  queries.getAll()
    .then(function (data) {
      res.render('index', { title: 'Express', files: data })
    })
    .catch(function (e) { onError(res, e) })
})

// home pagejust some test
router.get('/', function (req, res, next) {
  res.sendFile('./client/index.html')
})


// Queries
router.get('/api/queries/', function (req, res, next) {
  queries.getAll()
    .then(function (data) {
      res.json(data)
    })
    .catch(function (e) { onError(res, e) })
})

// result
router.post('/api/queries/exec', function (req, res) {
  console.log('query:: ', req.body)

  elasticQuery.query(req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (e) { onError(res, e) })
})

// TODO: Remove
router.post('/ajax/run-query', function (req, res, next) {
  console.log('query:: ', req.body)

  elasticQuery.query(req.body)
    .then(function (data) {
      res.json(data)
    })
    .catch(function (e) { onError(res, e) })
})

module.exports = router
